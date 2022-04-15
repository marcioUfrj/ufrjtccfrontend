import React, { useState, createContext, useContext } from 'react'
import { Header } from "../"
import { HomeContainer, LessonContainer} from "../../pages"
import { pages } from '../../constants/constants'

export const PageContext = createContext()

export function usePageContext() {
 return useContext(PageContext)
}

export function Body() {

  const [page, setPage] = useState(pages.HOME)

  return (
    <div className="container-body">
      <PageContext.Provider value={{ page, setPage }}>
        <Header />
        {page === pages.HOME ? <HomeContainer /> : <></>}
        {page === pages.LESSONS ? <LessonContainer /> : <></>}
        <div></div>
      </PageContext.Provider>
    </div>
  )
}