// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD60F57GATPtMmZdN4TTxJXfksv_81UdpU",
    authDomain: "team-iv.firebaseapp.com",
    projectId: "team-iv",
    storageBucket: "team-iv.firebasestorage.app",
    messagingSenderId: "935418184152",
    appId: "1:935418184152:web:1698ba4517f1168af7b2ad",
    measurementId: "G-BDX2YQFGY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Make signInWithGoogle available globally
window.signInWithGoogle = function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in: ", user);
            // Redirect to home page after successful sign-in
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error);
        });
};

export { app, analytics, auth };