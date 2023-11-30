import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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

const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");

const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
});

// Login Form Submit
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.querySelector("input[type='email']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        wrapper.classList.remove("active-popup");
        //window.location.href = "../profile/profile.html";
        // Add any additional actions after successful login
    } catch (error) {
        console.error("Login error:", error.message);
    }
});

// Register Form Submit
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = registerForm.querySelector("input[type='text']").value;
    const email = registerForm.querySelector("input[type='email']").value;
    const password = registerForm.querySelector("input[type='password']").value;
    const address = registerForm.querySelector("#address").value;

    try {
        // Create user in Firebase authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user data to Firestore
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            username: username,
            email: email,
            address: address
            // Add additional user data if needed
        });

        console.log("Registration successful");
        // Add any additional actions after successful registration
    } catch (error) {
        console.error("Registration error:", error.message);
    }
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User is signed in");
        // Add any additional actions after user is signed in
        //window.location.href = "../profile/profile.html";
    } else {
        // User is signed out
        console.log("User is signed out");
        // Add any additional actions after user is signed out
    }
});