// Your Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const emailForm = document.getElementById('emailForm');
const questionsForm = document.getElementById('questionsForm');
const questionsContainer = document.getElementById('questionsContainer');

let currentUserId = null;

// Handle email form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
        // Query Firestore to find user by email
        const querySnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            currentUserId = userDoc.id;
            const userData = userDoc.data();

            // Display security questions
            showSecurityQuestions(userData.securityQuestions);
        } else {
            alert('Email not found. Please check and try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.code === 'permission-denied') {
            alert('Access denied. Please make sure you are using a registered email.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    }
});

function showSecurityQuestions(questions) {
    // Switch to questions step
    document.getElementById('emailStep').classList.remove('active');
    document.getElementById('questionsStep').classList.add('active');

    // Display questions
    questionsContainer.innerHTML = questions
        .map((q, index) => `
            <div class="question-container">
                <label>${q.question}</label>
                <input type="text" id="answer${index}" required>
            </div>
        `).join('');
}

// Handle security questions form submission
questionsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const userDoc = await db.collection('users').doc(currentUserId).get();
        if (!userDoc.exists) {
            throw new Error('User document not found');
        }

        const userData = userDoc.data();
        const storedQuestions = userData.securityQuestions;

        // Gather and verify answers
        const userAnswers = storedQuestions.map((_, index) => 
            document.getElementById(`answer${index}`).value.toLowerCase().trim()
        );

        const allCorrect = storedQuestions.every((q, index) => 
            hashAnswer(userAnswers[index]) === q.answer
        );

        if (allCorrect) {
            // Send password reset email
            await auth.sendPasswordResetEmail(userData.email);
            
            // Show success message
            document.getElementById('questionsStep').classList.remove('active');
            document.getElementById('resetStep').classList.add('active');
        } else {
            alert('One or more answers are incorrect. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while verifying your answers. Please try again.');
    }
});

// Simple hash function (replace with more secure version in production)
function hashAnswer(answer) {
    return btoa(answer);
} 