"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = exports.storageRef = void 0;
// Import the functions you need from the SDKs you need
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
require("firebase/storage");
// import firebaseAdmin from "firebase-admin";
// import serviceAccount from './flutter-push-6b9f4-firebase-adminsdk-ok61y-e40e381168.json';
// Import and configure dotenv
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const admin = firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(JSON.stringify(serviceAccount))
// })
const firebaseConfig = {
    apiKey: process.env.APIKEYDB,
    authDomain: process.env.AUTHDOMAINDB,
    projectId: process.env.PROJECTIDDB,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERIDDB,
    appId: process.env.APPIDDB,
    measurementId: process.env.MEASUREMENTIDDB
};
// Initialize Firebase
app_1.default.initializeApp(firebaseConfig);
console.log('Firabase is ready');
// export const storageRef = admin.storage().bucket(`gs://flutter-push-6b9f4.appspot.com`);
exports.storageRef = app_1.default.storage().ref();
exports.firestore = app_1.default.firestore();
//# sourceMappingURL=config.js.map