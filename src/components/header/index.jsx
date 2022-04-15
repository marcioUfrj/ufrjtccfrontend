import React, { useState } from 'react'
import { usePageContext } from '../body'
import { pages } from '../../constants/constants'
import { isAuthenticated, execSignIn, execSignOut } from '../../middleware/auth'

const Header = () => {
  const { setPage } = usePageContext()
  const [text, setText] = useState('Sign In')

  function updateLogin() {
    if (isAuthenticated()) {
      execSignOut(setText)
      return
    }
    execSignIn(setText)
  }

  return (
    <header>
      <nav className="nav-container">
        <div className="home-link" onClick={() => (setPage(pages.HOME))}>{pages.HOME}</div>
        <div className="home-link" onClick={() => (setPage(pages.LESSONS))}>{pages.LESSONS}</div>
        <button className="btn btn-danger" onClick={updateLogin}>{text}</button>
      </nav>
    </header>
  )
}

export default Header