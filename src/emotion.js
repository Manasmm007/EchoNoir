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
// Spotify embed lists (2 placeholders per emotion). Leave title and trackId empty for now.
const spotifyByEmotion = {
  happy: [
    { title: 'Koi mil gaya', trackId: '5L9fLNHSj5SuGvJRljdWJb' },
    { title: 'Jhak Maar Ke', trackId: '7pTYN6Gxy3MOibdXmkzc5V' },
    {title: 'Mai Koi Aisa Geet Gaon', trackId: '0WBClBemYPJR44H6uIn0kp'},
    {title: 'Dil Kya Kare', trackId: '648GXyKI62FhbeBq0levWr'},
    {title: 'Kashmir Mai Tu Kanyakumari',trackId: '5orNEFkFG4RP24goF02AuD'},
    {title: 'Unstopable', trackId: '2J2Z1SkXYghSajLibnQHOa'}
  ],
  sad: [
    { title: 'Hamari Adhuri Kahani', trackId: '3HiobOOpSpMsi95WBKPBYk' },
    { title: 'I\'m Done.-I-Popstar: Vol. 1 ', trackId: '0YRpv07J0y7J73X87efpia' },
    {title: 'Tum Hi Ho', trackId: '56zZ48jdyY2oDXHVnwg5Di'},
    {title: 'Agar Tum Saath Ho', trackId: '2FCXQHugkoHE1K3tiDu8pu'},
    {title: 'Ae Dil Hai Mushkil', trackId: '1UWacd8x8tPPwmrPB1MoBI'},
    {title: 'Someone Like You', trackId: '3bNv3VuUOKgrf5hu3YcuRo?' }
  ],
  angry: [
    { title: 'Aarambh', trackId: '1PZZtXR7nsNIyRcqd7UeiF' },
    { title: 'Ravan', trackId: '3hrW1jobQYQJTaLdcs4m6L' },
    {title: 'Bharat ka Bacha Bacha', trackId: '3pdQSa3JBrYIuqJOJmFrxl'},
    {title: 'Jai Shree Ram', trackId: '5knELFswMvdznw7ubbrveA'},
    {title: 'Ghamand Kar (Tanhaji: The Unsung Warrior)',trackId:'4FcZBCb6dANhvsEnFlgJwG'},
    {title: 'Believer', trackId: '0pqnGHJpmpxLKifKRmU6WP'}
  ],
  surprised: [
    { title: 'Genda Phool', trackId: '0gzu5mm36VJH2Zqu8sQPTf' },
    { title: 'Dholna', trackId: '6O8ZM3IKYcSBzpnuxpCAQr' },
    { title: 'Wo Ajnabi', trackId: '0ZNg3I2kga2XnqKp1Y9PeZ' },
    { title: 'Ankahee', trackId: '08P8lJZE9PvvTiUHlIRbiv' },
    {title: 'Dil Chahta hai', trackId: '2r1CHpKRDdzHGJScn5UqjX'},
    {title: 'Bones ', trackId: '0HqZX76SFLDz2aW8aiqi7G'}
  ],
  fearful: [
    { title: 'Enemy', trackId: '1r9xUipOqoNwggBpENDsvJ' },
    { title: 'Demons', trackId: '5qaEfEh1AtSdrdrByCP7qR' },
    { title: 'Alone', trackId: '3LlmKSHR3Rs0Y3KHQLAYDk' },
    { title: 'Monster', trackId: '4uyDe8SeM0Nsgzp9KMtXWn' },
    { title: 'Let Her Go', trackId: '2jyjhRf6DVbMPU5zxagN2h' },
    { title: 'Let Me Down Slowly', trackId: '2qxmye6gAegTMjLKEBoR3d' }
  ],
  disgusted: [
    { title: 'I\'m a mess', trackId: '04ZTP5KsCypmtCmQg5tH9R' },
    { title: 'Guzarish', trackId: '2MvCNH9ua0CeOgUQfZf56z' },
    { title: 'Ye Ishq Hai Gunah', trackId: '0hWHc84Vdb48EGL88j0Uxc' },
    { title: 'Dil Tod ke', trackId: '71OoohX1NBG4ez6eijgaWE' },
  ],
  neutral: [
    { title: 'Duniyaa (From "Luka Chuppi")', trackId: '2tjWCe2W7sgvS3C8NHcdtI?' },
    { title: 'Maan Meri Jaan', trackId: '1418IuVKQPTYqt7QNJ9RXN' },
    { title: 'Zinda', trackId: '7vZz8oJ5qAqB9MghufRK5k' },
    { title: 'Naacho Naacho', trackId: '208sMwgVcaFt2mT79Df1KG' },
    { title: 'Chak Chak (Atrangi Re)', trackId: '5pbOpE6CfRgGnPPZJSDfME' },
    {title: 'End of Time', trackId: '67O8CWXxPsfz8orZVGMQwf'}
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
  const spotifyOptions = spotifyByEmotion[emotion] || spotifyByEmotion['neutral'];
  const spotifyPick = spotifyOptions[Math.floor(Math.random() * spotifyOptions.length)];

  musicDiv.innerHTML = '';
  const label = document.createElement('div');
  label.innerHTML = `<b>Recommended for your mood:</b>`;
  musicDiv.appendChild(label);

  if (spotifyPick && spotifyPick.trackId) {
    const titleEl = document.createElement('div');
    titleEl.textContent = spotifyPick.title || '';
    musicDiv.appendChild(titleEl);

    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/track/${spotifyPick.trackId}`;
    iframe.width = '300';
    iframe.height = '80';
    iframe.frameBorder = '0';
    iframe.allowTransparency = 'true';
    iframe.allow = 'encrypted-media';
    musicDiv.appendChild(iframe);

    musicPlayer.style.display = 'none';
    try { musicPlayer.pause(); musicPlayer.src = ''; } catch (e) {}
  } else {
    const options = musicByEmotion[emotion] || musicByEmotion['neutral'];
    const pick = options[Math.floor(Math.random() * options.length)];
    const titleEl = document.createElement('div');
    titleEl.textContent = pick.title || '';
    musicDiv.appendChild(titleEl);

    musicPlayer.src = pick.url;
    musicPlayer.style.display = 'block';
    musicPlayer.play().catch(() => {});
  }

  detecting = false;
  lastEmotion = emotion;
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
