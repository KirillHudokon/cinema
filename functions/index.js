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
exports.CategoriesCounter=functions.firestore.document('/films/{filmsId}').onUpdate( async(change,context)=>{

    if(change.before.data().description.category===change.after.data().description.category){
        return null
    }else{
        await db.collection('categories').doc(change.before.data().description.category).set({increment:admin.firestore.FieldValue.increment(-1)},{merge:true})
        await db.collection('categories').doc(change.after.data().description.category).set({increment:admin.firestore.FieldValue.increment(1)},{merge:true})
        return true
    }
})
exports.filmCreate=functions.firestore.document('/films/{filmsId}').onCreate(async (snap,context)=>{
    const {filmsId}=context.params
         if(snap.data().description.category && snap.data().description) {
             await db.collection('films').doc(filmsId).set({
                 description: {
                     time: admin.firestore.FieldValue.serverTimestamp()
                 }
             }, {merge: true});
             await db.collection('categories').doc(snap.data().description.category).set({increment: admin.firestore.FieldValue.increment(1)}, {merge: true})
             return true
         }else{
             return null
         }
})

exports.filmDelete=functions.firestore.document('/films/{filmsId}').onDelete(snap=>{
       if(snap.data().description.category && snap.data().description) {
           return db.collection('categories').doc(snap.data().description.category).set({increment: admin.firestore.FieldValue.increment(-1)}, {merge: true})
       }else{
           return null
       }
})