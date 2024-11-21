// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore();

// Make signInWithGoogle available globally
window.signInWithGoogle = function() {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            await handleSuccessfulLogin(user);
        })
        .catch((error) => {
            console.error("Error during sign-in: ", error);
        });
};

async function handleSuccessfulLogin(user) {
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists() || !userDoc.data().hasSetupSecurity) {
            window.location.href = 'security-setup.html';
        } else {
            window.location.href = 'home.html';
        }
    } catch (error) {
        console.error('Error checking security setup:', error);
        alert('Error checking security setup. Please try again.');
    }
}

export { app, analytics, auth };