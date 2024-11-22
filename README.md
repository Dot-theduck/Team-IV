### 1. Clone repository:
   ##### Begin by cloning the Team-IV repository to your local machine. Open your terminal and run the following command:
     https://github.com/Dot-theduck/Team-IV
   ##### Once the repository is cloned, navigate into the project directory:
     cd Team-IV
### 2 Finish setting up your firebase acording to 
   ##### Before you proceed, you need to finish setting up your Firebase project. Follow the detailed instructions in the Firebase setup guide:
     https://github.com/Dot-theduck/firebasePrime/blob/main/README.md
   ##### This guide covers the creation of a Firebase project, enabling necessary services, and obtaining the configuration details required for integration.  
### 3 Update Firebase Configuration
 ##### After setting up Firebase, you need to update your Firebase configuration in the codebase.
  * Navigate to the js directory within the cloned repository.
  * Open the file firebase-config.js in a code editor.
##### In the firebase-config.js file, you will see a placeholder for Firebase configuration like the example below:

   
     const firebaseConfig = {
       apiKey: "AIzaSyD60F57GATPtMmZdN4TTxJXfksv_81UdpU", //your API
       authDomain: "team-iv.firebaseapp.com", //YOUR_PROJECT_ID.firebaseapp.com
       projectId: "team-iv", //YOUR_PROJECT_ID
       storageBucket: "team-iv.firebasestorage.app", //YOUR_PROJECT_ID.appspot.com
       messagingSenderId: "935418184152", //YOUR_SENDER_ID
       appId: "1:935418184152:web:1698ba4517f1168af7b2ad", //YOUR_APP_ID
        measurementId: "G-BDX2YQFGY5" //MeasurmentID
     };
##### Replace the placeholder values with the Firebase configuration details you obtained during setup.

##### Here’s how the configuration should look with your personal Firebase credentials:

      const firebaseConfig = {
         apiKey: "YOUR_API_KEY", // Replace with your actual API key
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your Firebase auth domain
         projectId: "YOUR_PROJECT_ID", // Replace with your Firebase project ID
         storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your Firebase storage bucket URL
         messagingSenderId: "YOUR_SENDER_ID", // Replace with your Firebase messaging sender ID
         appId: "YOUR_APP_ID", // Replace with your Firebase app ID
         measurementId: "YOUR_MEASUREMENT_ID" // Replace with your Firebase measurement ID
     };
### 4. Save Changes and Continue
   ##### Once you’ve updated the Firebase configuration, save the file. You should now be able to connect your app to Firebase services, such as authentication, real-time database, and cloud storage.

### 5. Run Your Application
##### With the Firebase configuration in place, you are ready to start the application. Follow any additional setup instructions specific to the project (e.g., installing dependencies with npm install or running a local development server).
