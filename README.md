# Emotion Detector Web App

A web application that detects your emotion in real-time using your webcam and recommends music based on your mood.

<p align="center">
  <img src="assets/icons/icon128.png" width="80" alt="Emotion Detector Icon" />
</p>

## Features
- 🎥 Real-time face and emotion detection using [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- 🎵 Music recommendation and playback based on detected emotion
- 🧩 Simple, modern web UI
- ⏸️ Camera and detection pause while music is playing

## Project Structure
```text
emotion-extension/
├── assets/
│   ├── icons/                  # App icons (16x16, 48x48, 128x128)
│   └── models/                 # face-api.js model files
│       ├── face_expression_model/
│       └── tiny_face_detector_model/
├── src/
│   ├── emotion.js              # Main logic for emotion detection and music
│   └── face-api.min.js         # face-api.js library
├── index.html                  # Main web app UI
├── README.web.md               # This file
```

## Getting Started

### 1. Download face-api.js Models
- Download the `face_expression_model` and `tiny_face_detector_model` folders from [face-api.js-models](https://github.com/justadudewhohacks/face-api.js-models).
- Place them inside the `assets/models/` directory as shown above.

### 2. Run the App Locally
- You can open `index.html` directly in your browser, or use a simple local server for best results:
  - Python 3: `python3 -m http.server`
  - Node.js: `npx serve .`
- Visit `http://localhost:8000` (or the port shown) in your browser.

### 3. Usage
- Grant camera access if prompted.
- The app will detect your emotion and recommend/play music accordingly.
- While music is playing, the camera and detection are paused. When the music ends, detection resumes.

## Customization & Notes
- You can customize the music URLs and logic in `src/emotion.js`.
- For best results, use in a well-lit environment.
- All code is commented for clarity and maintainability.

---

## License

This project is licensed under the MIT License.
