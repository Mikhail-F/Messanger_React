import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyB53f5UoOaGqE1dJt4Uo-47mN1EQqzqEg8",
    authDomain: "messanger-fa52c.firebaseapp.com",
    projectId: "messanger-fa52c",
    storageBucket: "messanger-fa52c.appspot.com",
    messagingSenderId: "215683392213",
    appId: "1:215683392213:web:20ea04c9875197c2ebb85c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const userAuth = {
    registrationUser (email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(response => response.user)
    },

    loginUser (email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    out(){
        return firebase.auth().signOut()
    },

    findUser(myId, talkUserId){
        return firebase.database().ref(`${myId}/messages/${talkUserId}`).orderByKey().once('value')
    },

    forgetPassword(email){
        return firebase.auth().sendPasswordResetEmail(email)
    },
}