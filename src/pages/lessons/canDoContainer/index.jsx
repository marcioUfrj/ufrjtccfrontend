import React, { useState } from 'react'
import CanDo from './canDo'
import { useCanDoContext } from '../../' // pages/index.js
import { getCanDosByLevel } from '../../../services/cando'

function CanDoContainer() {
  
  const { canDo } = useCanDoContext()
  const [canDos, setCanDos] = useState(null)

  React.useLayoutEffect(() => {
    async function getCanDos() {
      const response = await getCanDosByLevel({ level: canDo.level })
      setCanDos(response)
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