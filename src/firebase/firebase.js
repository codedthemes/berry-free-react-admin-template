// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYJGZH9IGwRjOdlm13ZVlLP-k1waTZfDs",
    authDomain: "covid-app-5fc4f.firebaseapp.com",
    projectId: "covid-app-5fc4f",
    storageBucket: "covid-app-5fc4f.appspot.com",
    messagingSenderId: "506845253830",
    appId: "1:506845253830:web:c932dd81914459c0ee87c7",
    measurementId: "G-D3NBTDPDC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// init services

const db = getFirestore()
const auth = getAuth();
auth.languageCode = 'en';

// collection ref
const colRef = collection(db, "Users")
const loginRef = collection(db, "login")
const dataRef = collection(db, "userData")
const injectionRef = collection(db, "injectionData")
const requestRef = collection(db, "requestData")
const injectionRequestRef = collection(db, "injectionRequestData")
const selfDeclareRef = collection(db, "selfDeclareData");

// get collection data
const queryGetUserInfoByEmail = (email) => query(dataRef, where("email", "==", email))

const queryGetUserInfoByPhone = (collection, phone) => query(collection, where("phone", "==", phone))

const queryGetUserInfoById = (collection, id) => query(collection, where("idNumber", "==", id))

export { app, db, colRef, loginRef, dataRef, injectionRef, auth, requestRef, injectionRequestRef, selfDeclareRef, queryGetUserInfoByEmail, queryGetUserInfoByPhone, queryGetUserInfoById };