// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSXPju25wmaZVWwLX28UWI1f_S37pistw",
  authDomain: "cjdrop-48d14.firebaseapp.com",
  projectId: "cjdrop-48d14",
  storageBucket: "cjdrop-48d14.appspot.com",
  messagingSenderId: "962836479151",
  appId: "1:962836479151:web:4b3571322eca8cb253685a",
  measurementId: "G-REVET6PX88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);

let userState = false
onAuthStateChanged(auth, (user) => {
    if (user) {
        userState = true
    } else {
        userState = false
    }
})
const logState = () =>{
    return userState
}




export default {
    auth,
    logState
};