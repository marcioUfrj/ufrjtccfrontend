import React, { useState, createContext, useContext } from 'react'
import { Header, UserProvider } from "../"
import { HomeContainer, LessonContainer} from "../../pages"
import { pages } from '../../constants/constants'

export const PageContext = createContext()
export function usePageContext() {
  return useContext(PageContext)
}

export default function Body() {

  const [page, setPage] = useState(pages.HOME)
  
  return (
    <div className="container-body">
      <PageContext.Provider value={{ page, setPage }}>
        <UserProvider>
          <Header />
          {page === pages.HOME ? <HomeContainer /> : <></>}
          {page === pages.LESSONS ? <LessonContainer /> : <></>}
          <div></div>
        </UserProvider>
      </PageContext.Provider>
    </div>
  )
}