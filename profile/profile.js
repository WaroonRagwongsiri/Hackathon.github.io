// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDAN-T3Dy2aZcvwJCg35n75m3N36s58n0o",
    authDomain: "tobeit67hackathon.firebaseapp.com",
    projectId: "tobeit67hackathon",
    storageBucket: "tobeit67hackathon.appspot.com",
    messagingSenderId: "195365048954",
    appId: "1:195365048954:web:0f4de9abdf5fd68af8e1c3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const profileWrapper = document.querySelector(".profile-wrapper");

// Function to fetch and display user profile information
const displayUserProfile = async () => {
    const user = auth.currentUser;

    if (user) {
        // Fetch user data from Firestore
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            
            // Display user profile information (modify this based on your data structure)
            profileWrapper.innerHTML = `
                <h3>Welcome, ${userData.username}!</h3>
                <p>Email: ${userData.email}</p>
                <p>Address: ${userData.address}</p>
                <!-- Add additional profile information as needed -->
            `;
        } else {
            profileWrapper.innerHTML = `<h3>No profile data found.</h3>`;
        }
    }
};

// Check user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, display profile information
        displayUserProfile();
    } else {
        // User is signed out, redirect to login page
        window.location.href = "index.html";
    }
});
