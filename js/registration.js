// Example of storing user data during registration
async function registerUser(email, password, securityQuestions) {
    try {
        // Create user in Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Store user data in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            securityQuestions: securityQuestions.map(q => ({
                question: q.question,
                answer: hashAnswer(q.answer.toLowerCase().trim())
            }))
        });
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Example usage:
const securityQuestions = [
    { question: "What was your first pet's name?", answer: "Rex" },
    { question: "In what city were you born?", answer: "Paris" },
    { question: "What was your favorite subject in school?", answer: "Math" }
]; 