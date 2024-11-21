// Get Firebase instances
const db = firebase.firestore();
const auth = firebase.auth();

let userEmail = '';
let userQuestions = [];
let attemptCount = 0;
const MAX_ATTEMPTS = 3;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Handle email form submission
    document.getElementById('emailForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        userEmail = document.getElementById('resetEmail').value;
        attemptCount = 0;
        
        try {
            const querySnapshot = await db.collection('users')
                .where('email', '==', userEmail)
                .limit(1)
                .get();

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                
                if (!userData.securityQuestions) {
                    alert('No security questions found for this account.');
                    return;
                }

                userQuestions = userData.securityQuestions;
                
                // Display security questions
                document.getElementById('securityQuestions').innerHTML = userQuestions
                    .map((q, i) => `
                        <div class="form-group">
                            <label>${q.question}</label>
                            <input type="text" id="answer${i}" required>
                        </div>
                    `).join('');

                // Switch to questions step
                document.getElementById('emailStep').classList.remove('active');
                document.getElementById('questionsStep').classList.add('active');
            } else {
                alert('No account found with this email address.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle security questions form submission
    document.getElementById('questionsForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const userAnswers = userQuestions.map((_, i) => 
                document.getElementById(`answer${i}`).value.toLowerCase().trim()
            );

            const allCorrect = userQuestions.every((q, i) => 
                hashAnswer(userAnswers[i]) === q.answer
            );

            if (allCorrect) {
                await auth.sendPasswordResetEmail(userEmail);
                
                document.getElementById('questionsStep').classList.remove('active');
                document.getElementById('successStep').classList.add('active');
            } else {
                attemptCount++;
                const remainingAttempts = MAX_ATTEMPTS - attemptCount;

                if (attemptCount >= MAX_ATTEMPTS) {
                    alert('Maximum attempts reached. Redirecting to login page for security reasons.');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    if (remainingAttempts === 1) {
                        showWarningMessage();
                    }
                    
                    alert(`Incorrect answers. You have ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`);
                    
                    userQuestions.forEach((_, i) => {
                        document.getElementById(`answer${i}`).value = '';
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while verifying your answers. Please try again.');
        }
    });
});

function showWarningMessage() {
    const existingWarning = document.querySelector('.warning-message');
    if (existingWarning) {
        existingWarning.remove();
    }

    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning-message warning';
    warningDiv.textContent = 'Warning: This is your last attempt. If incorrect, you will be redirected to the login page.';
    
    const form = document.getElementById('questionsForm');
    form.insertBefore(warningDiv, form.firstChild);
}

function hashAnswer(answer) {
    return btoa(answer);
} 