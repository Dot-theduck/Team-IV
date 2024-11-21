import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');

onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user);
    
    if (user) {
        const userName = user.displayName || user.email || 'User';
        welcomeMessage.textContent = `Hello, ${userName}!`;
    } else {
        window.location.href = 'login.html';
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}); 