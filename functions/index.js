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
exports.filmUpdate=functions.firestore.document('/films/{filmsId}').onUpdate( async(change,context)=>{
    const {filmsId}=context.params
    let freePlacesCounter=0;
    let before=change.before.data();
    let after=change.after.data()
    if(JSON.stringify(before.description.allPlaces)!==JSON.stringify(after.description.allPlaces)){
        let changedPlaces=after.description.allPlaces
        for(let i=0; i<changedPlaces.length;i++){
            if(changedPlaces[i].status!=='locked'){
                freePlacesCounter++
            }
        }
        await db.collection('films').doc(filmsId).get().then((snap)=>{
            if (snap.exists) {
                return snap.data()
            }
        }).then(key=>{
            db.collection('films').doc(filmsId).update({
                description:{
                    ...key.description,
                    freePlaces:freePlacesCounter
                }
            })
        })
        return true

    }
    if(before.description.comments.length!==after.description.comments.length){
        await db.collection('films').doc(filmsId).get().then((snap)=>{
            if (snap.exists) {
                return snap.data()
            }
        }).then(key=>{
            db.collection('films').doc(filmsId).update({
                description:{
                    ...key.description,
                    commentsCounter:key.description.commentsCounter+1
                }
            })
        })
        return true
    }
    if(before.description.category===after.description.category){
        return null
    }else{
        await db.collection('categories').doc(before.description.category).set({increment:admin.firestore.FieldValue.increment(-1)},{merge:true})
        await db.collection('categories').doc(after.description.category).set({increment:admin.firestore.FieldValue.increment(1)},{merge:true})
        return true
    }
})
exports.filmCreate=functions.firestore.document('/films/{filmsId}').onCreate(async (snap,context)=>{
    const {filmsId}=context.params
        let masWithPlaces=[]
        let placesCounter=27;
        for(let i=0;i<placesCounter; i++){
            masWithPlaces.push({status:'unlocked'})
        }
         if(snap.data().description.category && snap.data().description &&!snap.data().description.allPlaces) {
             await db.collection('films').doc(filmsId).set({
                 description: {
                     time: admin.firestore.FieldValue.serverTimestamp(),
                     allPlaces:masWithPlaces,
                     places:placesCounter,
                     freePlaces:placesCounter,
                     commentsCounter:0,
                     comments:[]
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