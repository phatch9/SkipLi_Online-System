import { initializeApp } from "firebase/app";
const firebase = require("firebase/app");
    require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAwIijK9IvXQ4cpMnrjaWsvfUtGLbDuErM",
  authDomain: "skipli-system.firebaseapp.com",
  projectId: "skipli-system",
  storageBucket: "skipli-system.firebasestorage.app",
  messagingSenderId: "228928454132",
  appId: "1:228928454132:web:24e0b8166521aa1d5e4da1",
  measurementId: "G-JD600VS0TH"
};


// -- Initialize Firebase 

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

exports.storeAccessCode = async (PhoneNumberContext, accessCode) => {
    const accessCodeRef = firestore.doc('AccessCode/${phoneNumber}');
    try  {
        await accessCodeRef.set()
        phoneNumber,
        accessCode,
        verifyAt: null,
        createAt: new Date(),
        });
    } catch (err) {
        throw new Error(err.message);
        }
    return accessCodeRef;
};

exports.validateCode = async (phoneNumber, accessCode) => {
    const accessCodeRef = firestore.doc(`AccessCode/${phoneNumber}`);
    const dataRef = await accessCodeRef.get();
    if (!dataRef.exists) {
        throw new Error("Phone number not found");
    } else {
        let data = dataRef.data();
        if (accessCode == data.accessCode) {
        await accessCodeRef.update({
            accessCode: "",
            verifyAt: new Date()
        });
        return 0; //validate successfully
        } else throw new Error("Wrong Access Code");
    }
    };

    exports.firestore = firestore;

    //module.exports = firebase;
