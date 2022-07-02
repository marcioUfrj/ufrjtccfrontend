import React, { useState, useEffect, createContext, useContext } from 'react'
import { Header, UserProvider } from "../"
import { HomeContainer, LessonContainer, ExamContainer, AboutContainer} from "../../pages"
import { pages } from '../../constants/constants'

export const PageContext = createContext()
export function usePageContext() {
  return useContext(PageContext)
}

function Body() {

  const [page, setPage] = useState(pages.HOME)

  return (
    <div className="container-body">
      <PageContext.Provider value={{ page, setPage }}>
        <UserProvider>
          <Header />
          {page === pages.HOME ? <HomeContainer /> : <></>}
          {page === pages.LESSONS ? <LessonContainer /> : <></>}
          {page === pages.EXAM ? <ExamContainer /> : <></>}
          {page === pages.ABOUT ? <AboutContainer /> : <></>}
          <div></div>
        </UserProvider>
      </PageContext.Provider>
    </div>
  )
}

export default Body