import React, { useEffect, useState } from 'react'
import { usePageContext, useUserContext } from '../'
import { pages } from '../../constants/constants'
import { isAuthenticated, execSignIn, execSignOut } from '../../middleware/auth'

const Header = () => {
  
  const { setPage } = usePageContext()
  const { user, setUser } = useUserContext()
  
  function checkUserToSetText() {
    return user ?  'Sign Out' : 'Sign In'
  }
  
  const [text, setText] = useState(checkUserToSetText())

  function updateLogin() {
    if (isAuthenticated()) {
      execSignOut(setUser)
      return
    }
    execSignIn(setUser)
  }

  useEffect(() => {
    setText(checkUserToSetText())
  }, [user])
  
  //<div className="home-link" onClick={() => (setPage(pages.LESSONS))}>{pages.LESSONS}</div>
  //<div className="home-link" onClick={() => (setPage(pages.ABOUT))}>{pages.ABOUT}</div>

  return (
    <header>
      <nav className="nav-container">
        <div className="home-link" onClick={() => (setPage(pages.HOME))}>{pages.HOME}</div>
        <div className="home-link" onClick={() => (setPage(pages.EXAM))}>{pages.EXAM}</div>
        <button className="btn btn-danger" onClick={updateLogin}>{text}</button>
      </nav>
    </header>
  )
}

export default Header