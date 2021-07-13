//import { seedDatabase } from "../seed";

const config = {
    apiKey: "AIzaSyBj1QpocxVkeogg7qkK_htoIea9ElRHieg",
    authDomain: "instagram-clone-aa0d7.firebaseapp.com",
    projectId: "instagram-clone-aa0d7",
    storageBucket: "instagram-clone-aa0d7.appspot.com",
    messagingSenderId: "233489566922",
    appId: "1:233489566922:web:a939bafd0b78b951447833",
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

//seedDatabase(firebase);

export { firebase, FieldValue };
