// Emotion Detector Web App Logic (cleaned up for web, no duplicates)
const video = document.getElementById('video');
const emotionDiv = document.getElementById('emotion');
const musicDiv = document.getElementById('music-recommendation');
const musicPlayer = document.getElementById('music-player');

const musicByEmotion = {
  happy: [
    { title: 'Happy - Pharrell Williams', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Can’t Stop the Feeling! - Justin Timberlake', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
  ],
  sad: [
    { title: 'Someone Like You - Adele', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
  ],
  angry: [
    { title: 'Stronger - Kanye West', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
  ],
  surprised: [
    { title: 'Surprise Yourself - Jack Garratt', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
  ],
  fearful: [
    { title: 'Fearless - Taylor Swift', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
  ],
  disgusted: [
    { title: 'Bad Guy - Billie Eilish', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
  ],
  neutral: [
    { title: 'Let It Be - The Beatles', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
  ]
};
let detecting = true;
let lastEmotion = null;
let detectionIntervalId = null;
async function setupCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });
  } catch (err) {
    emotionDiv.textContent = 'Camera access denied or not available.';
    throw err;
  }
}
async function loadModels() {
  const MODEL_URL = 'assets/models';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tiny_face_detector_model');
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL + '/face_expression_model');
}

function recommendMusic(emotion) {
  const options = musicByEmotion[emotion] || musicByEmotion['neutral'];
  const pick = options[Math.floor(Math.random() * options.length)];
  musicDiv.innerHTML = `<b>Recommended for your mood:</b><br>${pick.title}`;
  musicPlayer.src = pick.url;
  musicPlayer.style.display = 'block';
  musicPlayer.play().catch(() => {});
  detecting = false;
  lastEmotion = emotion;
  // Stop detection interval while music is playing
  if (detectionIntervalId) {
    clearInterval(detectionIntervalId);
    detectionIntervalId = null;
  }
}
musicPlayer.onended = () => {
  musicPlayer.style.display = 'none';
  musicDiv.innerHTML = '';
  detecting = true;
  lastEmotion = null;
  // Resume detection interval after music ends
  if (!detectionIntervalId) {
    detectionIntervalId = setInterval(detectEmotion, 1000);
  }
};
async function detectEmotion() {
  if (!detecting) return;
  const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
  if (detections && detections.expressions) {
    const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
    const [topEmotion, confidence] = sorted[0];
    emotionDiv.textContent = `Detected emotion: ${topEmotion} (${(confidence * 100).toFixed(1)}%)`;
    if (confidence > 0.7 && lastEmotion !== topEmotion) {
      recommendMusic(topEmotion);
    }
  } else {
    emotionDiv.textContent = 'No face detected.';
  }
}

async function main() {
  await setupCamera();
  await loadModels();
  emotionDiv.textContent = 'Point your face at the camera!';
  detectionIntervalId = setInterval(detectEmotion, 1000);
}
main();
