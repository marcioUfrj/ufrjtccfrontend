// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // firebase 9: from "firebase"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1amJyGvzPnd0qWOTGuwScIWdOUHsvMgU",
  authDomain: "auth-229c1.firebaseapp.com",
  projectId: "auth-229c1",
  storageBucket: "auth-229c1.appspot.com",
  messagingSenderId: "559632113781",
  appId: "1:559632113781:web:da4b7b689f76464649d83c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//console.log(auth)

const provider = new GoogleAuthProvider()

// se for uma funcao que sera usada varias vezes, entao retornar a promise
//    fazer .then.catch separado no local onde for usada

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

export const signOutFromGoogle = () => {
  return signOut(auth)
}

export const getAuthUid = () => {
  if (auth.currentUser === null) return null
  return auth.currentUser.uid
}

export const getAuthUser = () => {
  return auth.currentUser
}

/* Function para fazer login com Gmail */
export const signInWithGoogle2 = () => {
  // returns a Promise
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL

      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("profilePic", profilePic)

    }).catch((error) => {
      console.log(error)
    })
}

export const signOutFromGoogle2 = () => {
  signOut(auth)
    .then(() => {
      console.log('sign out successful.')
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Rrror code: ${errorCode}. ${errorMessage}`)
    })
}
