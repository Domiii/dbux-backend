import firebase from 'firebase';

// import 'firebase/auth';
// import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-d0HDLJ8Gd9UZ175z7dg6J98ZrOIK0Mc",
  authDomain: "learn-learn-b8e5a.firebaseapp.com",
  databaseURL: "https://learn-learn-b8e5a.firebaseio.com",
  projectId: "learn-learn-b8e5a",
  storageBucket: "learn-learn-b8e5a.appspot.com",
  messagingSenderId: "249308200308",
  appId: "1:249308200308:web:07556e84184b4546ef8021"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;


/**
 * PROBLEM: Cannot persist the result of email-based login.
 */
export async function loginWithEmailLink(email) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:3000/loggedin',
    // This must be true.
    handleCodeInApp: true
  };
  
  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);

  // TODO: start local server and grab link automatically
  const emailLink = await input('Email sent! Please provide the email link here.\n >');

  // firebase.auth().signInWithPopup(provider).then(function (result) {
  const result = await firebase.auth().signInWithEmailLink(email, emailLink);

  // This gives you a Google Access Token. You can use it to access the Google API.
  // var token = .accessToken;
  // The signed-in user info.
  var user = result.user;

  console.log(`Login SUCCESSFUL. User: ${user.email}, ${result.credential}`);
  console.log('  Result', JSON.stringify(result));

  // fs.writeFileSync('cred.json', JSON.stringify(result.credential));
  // ...
  return user;
}

export {
  firebase
};