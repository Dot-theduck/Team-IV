// Get Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            // If not logged in, redirect to login
            window.location.href = 'login.html';
            return;
        }

        try {
            // Check if user has already set up security questions
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (userDoc.exists() && userDoc.data().hasSetupSecurity) {
                // If already set up, redirect to home
                window.location.href = 'home.html';
            }
        } catch (error) {
            console.error('Error checking user document:', error);
        }
    });

    document.getElementById('securitySetupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = auth.currentUser;
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const securityQuestions = [
            {
                question: "What was your first pet's name?",
                answer: hashAnswer(document.getElementById('q1').value.toLowerCase().trim())
            },
            {
                question: "In what city were you born?",
                answer: hashAnswer(document.getElementById('q2').value.toLowerCase().trim())
            },
            {
                question: "What was your favorite subject in school?",
                answer: hashAnswer(document.getElementById('q3').value.toLowerCase().trim())
            }
        ];

        try {
            // Show loading state
            const submitButton = e.target.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Saving...';

            // Update user document with security questions
            await db.collection('users').doc(user.uid).set({
                email: user.email,
                displayName: user.displayName || '',
                securityQuestions,
                hasSetupSecurity: true,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            // Redirect to home page
            window.location.href = 'home.html';
        } catch (error) {
            console.error('Error saving security questions:', error);
            alert('Error saving security questions. Please try again.');
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Save Security Questions';
        }
    });
});

function hashAnswer(answer) {
    return btoa(answer);
}

// Add some basic styling if not already present
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('style')) {
        const style = document.createElement('style');
        style.textContent = `
            .container {
                max-width: 400px;
                margin: 50px auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                border-radius: 8px;
            }
            .question-group {
                margin-bottom: 20px;
            }
            input {
                width: 100%;
                padding: 8px;
                margin-top: 5px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            button {
                width: 100%;
                padding: 10px;
                background: #4285f4;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    }
}); 