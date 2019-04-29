import firebase from 'firebase/app'
import 'firebase/storage'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDJk1_QMFqd_lCjTVTsYtI1S4OaoDXPkyw",
    authDomain: "open-sketch.firebaseapp.com",
    databaseURL: "https://open-sketch.firebaseio.com",
    projectId: "open-sketch",
    storageBucket: "open-sketch.appspot.com",
    messagingSenderId: "706596603337"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage()

  export default {
      firebase, storage
  }