import { getAuthUser, getAuthUid, signInWithGoogle, signOutFromGoogle } from '../config/firebase'
import { getUserByLoginId, createUser } from '../services'
import { roles } from '../constants/constants'

export const usuario = getAuthUser()

export function isAuthenticated() {
  if (getAuthUser() === null) return false
  return true
}

function printError(error) {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(`Error code: ${errorCode}. ${errorMessage}`)
}

export function execSignIn(setUser) {
  signInWithGoogle()
  .then((result) => {

    async function checkUser() {
      const tempUser = await getUserByLoginId(getAuthUid())
      if (tempUser.length === 0) {
        const newUser = {
          nickname: " ",
          nivelCEFR: "emptyCEFR",
          nivelJLPT: "emptyJLPT",
          nivelShirai: "emptyShirai",
          role: roles.USER,
          loginId: getAuthUid()
        }
        const createdUser = await createUser(newUser)
        setUser(createdUser)
        return
      }

      setUser(tempUser[0])      
    }
    checkUser()
  })
  .catch((error) => {
    printError(error)
  })
}

export function execSignOut(setUser) {
  signOutFromGoogle()
  .then((result) => {
    setUser(null)
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