// Get Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();

// Sign Up
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            // Create user account
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Update profile with full name
            await userCredential.user.updateProfile({
                displayName: fullName
            });

            // Store initial user data in Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                fullName,
                email,
                hasSetupSecurity: false,
                createdAt: new Date().toISOString()
            });

            // Redirect to security questions setup
            window.location.href = 'security-setup.html';
        } catch (error) {
            console.error("Error during signup:", error);
            let errorMessage = "An error occurred during signup.";
            
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email is already registered.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password should be at least 6 characters.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please provide a valid email address.";
                    break;
            }
            
            alert(errorMessage);
        }
    });

    // Google Sign-in
    window.signInWithGoogle = function() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(async (result) => {
                const user = result.user;
                
                // Check if user document exists
                const userDoc = await db.collection('users').doc(user.uid).get();
                
                if (!userDoc.exists || !userDoc.data().hasSetupSecurity) {
                    // Redirect to security setup if needed
                    window.location.href = 'security-setup.html';
                } else {
                    // Redirect to home page
                    window.location.href = 'home.html';
                }
            })
            .catch((error) => {
                console.error("Error during Google sign-in:", error);
                alert("Error signing in with Google. Please try again.");
            });
    };

    // Login
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const userDoc = await db.collection('users').doc(userCredential.user.uid).get();

            if (!userDoc.exists || !userDoc.data().hasSetupSecurity) {
                window.location.href = 'security-setup.html';
            } else {
                window.location.href = 'home.html';
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Invalid email or password. Please try again.");
        }
    });
}); 