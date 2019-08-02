const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.createUser = functions.auth.user().onCreate((userRecord) => {
    const { email, displayName, uid} = userRecord;

    return db.collection('users').doc(uid).set({
        email,
        displayName,
        llalalal:50
    });
});

