import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase Configurations
const firebaseConfig = {
    apiKey: "AIzaSyDL7yj6EFd6YIMq9DNnIfGmaoFy0be93m0",
    authDomain: "transshift-f0bae.firebaseapp.com",
    databaseURL: "https://transshift-f0bae-default-rtdb.firebaseio.com",
    projectId: "transshift-f0bae",
    storageBucket: "transshift-f0bae.appspot.com",
    messagingSenderId: "671693881284",
    appId: "1:671693881284:web:f36bfd0111a6cd14b3ee91",
    measurementId: "G-VNV52BK82R",
};

let singletonInstance = null;

class Singleton {
    constructor() {
        if (!singletonInstance) {
            singletonInstance = this;
            firebase.initializeApp(firebaseConfig);
            singletonInstance = firebase;
        }
        return singletonInstance;
    }
}

const singletonObject = new Singleton();

export default singletonObject;