global.self = global;

import fs from 'fs';
import '@dbux/common/src/util/prettyLogs';
import db, { firebase } from './db';
const readline = require('readline');

const cmd = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function input(q) {
  return new Promise(r => {
    cmd.question(q, r);
  });
}

async function main() {
  firebase.auth().onAuthStateChanged(function (user) {
    console.debug(`Authentication initialized: ${user && `${user.displayName} (${user.email})`}`);

    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

  setTimeout(async () => {
    try {

      // NOTE: Node.js does not support LOCAL auth persistence
      //        see: https://firebase.google.com/docs/auth/web/auth-state-persistence#supported_types_of_auth_state_persistence
      // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


      if (fs.existsSync('cred.json')) {
        // const cred = fs.readFileSync('cred.json').toString();
        // firebase.auth().signInWithCredential(firebase.auth.EmailAuthProvider());
        // const cred = firebase.auth.GithubAuthProvider.credential(githubAccessToken);
        // firebase.auth().signInWithCredential(cred);
      }


    }
    catch (err) {
      console.error('Login failed :(\n\n', err);
    }
  }, 500);
}

main();