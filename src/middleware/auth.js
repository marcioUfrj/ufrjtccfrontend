import { auth, signInWithGoogle, signOutFromGoogle } from '../config/firebase'

export const usuario = auth.currentUser

export function isAuthenticated() {
  if (auth.currentUser == null) return false
  return true
}

function printError(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(`Error code: ${errorCode}. ${errorMessage}`)
}

export function execSignIn(setText) {
  signInWithGoogle()
  .then((result) => {
    setText('Sign Out')
    console.log(result)
  })
  .catch((error) => {
    printError(error)
  })
}

export function execSignOut(setText) {
  signOutFromGoogle()
  .then((result) => {
    setText('Sign In')
  })
  .catch((error) => {
    printError(error)
  })
}

/*
*
*

Depois de autenticar:
  verificar se usuario jah existe no BD:
    Sim: 
    Nao: Cadastrar usuario no BD com nickname, uid, niveis

*/