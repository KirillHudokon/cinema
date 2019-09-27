import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
var firebaseConfig = {
    apiKey: "AIzaSyDRt7Id35t2bH_KmWBGVkbfz9LqtL6oklY",
    authDomain: "cinema-f66f3.firebaseapp.com",
    databaseURL: "https://cinema-f66f3.firebaseio.com",
    projectId: "cinema-f66f3",
    storageBucket: "",
    messagingSenderId: "474613302760",
    appId: "1:474613302760:web:0d84933763279a08"
};
// Initialize Firebase
 const fire=firebase.initializeApp(firebaseConfig);

 export default fire