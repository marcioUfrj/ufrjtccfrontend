import React from 'react'
import UserContainer from './profile'
const HomeContainer = () => {

  return (
    <div className="container">
      <p>Bem-vindo!</p>
      <UserContainer />
      <div className="btn-grid"></div>
    </div>
  )
}

export default HomeContainer

/*

Consultar os dados de cadastro do BD
Preencher o Form
Botao de SALVAR
  

*/