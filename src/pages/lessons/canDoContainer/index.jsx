import React, { useState } from 'react'
import CanDo from './canDo'
import { useCanDoContext } from '../../' // pages/index.js
import axios from 'axios'

const baseURL = "http://localhost:4000/candos/ByLevel"

function CanDoContainer() {
  
  const { canDo } = useCanDoContext()
  const [canDos, setCanDos] = useState(null)

  React.useLayoutEffect(() => {
    async function getCanDos() {
      const response = await axios.get(`${baseURL}/${canDo.level}`)
      setCanDos(response.data)
    }
    getCanDos()
  }, [])

  //console.log(canDos)
  if (!canDos) return null

  return (
    <div className="container">
    <div>Lista de Níveis</div>
    <div className="btn-grid">
      {canDos.map((item, index) => (
          <CanDo key={index} item={item} />
      ))}
    </div>
  </div>
  )
}

export default CanDoContainer