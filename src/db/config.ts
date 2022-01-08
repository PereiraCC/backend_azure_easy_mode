// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
// import firebaseAdmin from "firebase-admin";
// import serviceAccount from './flutter-push-6b9f4-firebase-adminsdk-ok61y-e40e381168.json';

// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

// const admin = firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(JSON.stringify(serviceAccount))
// })

const firebaseConfig = {
    apiKey            : process.env.APIKEYDB,
    authDomain        : process.env.AUTHDOMAINDB,
    projectId         : process.env.PROJECTIDDB,
    storageBucket     : process.env.STORAGEBUCKET,
    messagingSenderId : process.env.MESSAGINGSENDERIDDB,
    appId             : process.env.APPIDDB,
    measurementId     : process.env.MEASUREMENTIDDB
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('Firabase is ready');

// export const storageRef = admin.storage().bucket(`gs://flutter-push-6b9f4.appspot.com`);
export const storageRef = firebase.storage().ref();
export const firestore = firebase.firestore();