// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA39kWUxFSPW4nw7kjBGPf8Xx3TQ2KAlH4",
    authDomain: "sentinelpole.firebaseapp.com",
    databaseURL: "https://sentinelpole-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sentinelpole",
    storageBucket: "sentinelpole.firebasestorage.app",
    messagingSenderId: "574026711422",
    appId: "1:574026711422:web:ee8b37b2adb7ec96aa332f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database Reference
const database = firebase.database();
// Test Data


console.log("✅ Firebase Connected!");