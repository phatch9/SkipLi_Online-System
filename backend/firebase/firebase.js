const firebase = require("firebase/app");
    require("firebase/firestore");

var firebaseConfig = { 
    apiKey: "",
    authoDomain: "",
    databaseURL: " ",
    projectID: " ",
    storageBucket: " ",
    essagingSenderId: "263674965539",
    appId: "1:263674965539:web:e2c62a8059e19ea4a28b96",
}

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
