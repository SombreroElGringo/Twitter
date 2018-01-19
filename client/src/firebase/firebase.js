import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCjRikjl3XwKe7cYSRywTG-LUJhUzVACyc",
    authDomain: "twitter-like-e9c46.firebaseapp.com",
    databaseURL: "https://twitter-like-e9c46.firebaseio.com",
    projectId: "twitter-like-e9c46",
    storageBucket: "twitter-like-e9c46.appspot.com",
    messagingSenderId: "200246249695"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };