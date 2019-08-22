const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate((userRecord) => {
    const { uid} = userRecord;

    return db.collection('users').doc(uid).set({
        booked:[]
    });
});

