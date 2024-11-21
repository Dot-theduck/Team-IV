import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth();

// Sign Up
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const Name = document.getElementById('name').value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: Name
        });
        console.log("User signed up:", userCredential.user);
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Error signing up:", error);
        alert(error.message);
    }
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        window.location.href = 'home.html';
    } catch (error) {
        console.error("Error logging in:", error);
        alert(error.message);
    }
});

// Forgot Password
document.getElementById('forgotPassword')?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter your email first");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        console.error("Error sending reset email:", error);
        alert(error.message);
    }
}); 