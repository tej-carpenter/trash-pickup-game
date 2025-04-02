// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCizVGXRRK4hIvTzHklwCOfayP19nu2pa8",
  authDomain: "trash-pickup-game.firebaseapp.com",
  projectId: "trash-pickup-game",
  storageBucket: "trash-pickup-game.firebasestorage.app",
  messagingSenderId: "120479998013",
  appId: "1:120479998013:web:8561cbcf33b84a605cca54",
  measurementId: "G-4X46Q9YLV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Google Login
document.getElementById('google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            alert(`Welcome, ${result.user.displayName}`);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

// Email Login (placeholder for now)
document.getElementById('email-login').addEventListener('click', () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert(`Welcome, ${userCredential.user.email}`);
        })
        .catch((error) => {
            console.error(error.message);
        });
});
