import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

// Your web app's Firebase configuration
const fbConfig = {
  apiKey: 'AIzaSyAf_DxPcKhmI1A_OzSjjvDpB9ImAHaziZM',
  authDomain: 'ableton-project-analyzer.firebaseapp.com',
  projectId: 'ableton-project-analyzer',
  storageBucket: 'ableton-project-analyzer.appspot.com',
  messagingSenderId: '1032328624026',
  appId: '1:1032328624026:web:891a34fc98b18303f02c23',
};

// Initialize Firebase
try {
  firebase.initializeApp(fbConfig);
  firebase.auth();
  firebase.functions();
  firebase.firestore();
  firebase.storage();
  if (window && window.location.hostname === 'localhost') {
    console.debug(
      'testing locally -- hitting local functions and firestore emulators',
    );
    firebase.functions().useEmulator('localhost', 5001);
    firebase
      .auth()
      .useEmulator('http://localhost:9099');
    firebase.storage().useEmulator('localhost', 9199);
    firebase.firestore().settings({
      host: 'localhost:8080',
      ssl: false,
    });
  }
  console.debug('Firebase Initialized');
} catch (err) {
  console.debug('err', err);
  console.debug('Error Initializing Firebase');
}

export default firebase;
// export const firestore = firebase.firestore()

/** `
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

/** `
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
