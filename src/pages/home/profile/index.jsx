import React from 'react'
import { useUserContext } from '../../../components/body/UserContext'
import { getAuthUid } from '../../../config/firebase'
import { updateUser } from '../../../services'
import { nivelsVector, nivelJLPTvector, nivelShirai } from '../../../constants/constants'

const UserContainer = () => {

  const { user, setUser } = useUserContext()

  if (!user || !getAuthUid()) return null

  function populateSelect(values, userField) {
    return [
      ...(userField.slice(0,5) === "empty" ? [<option key={userField} value={" "}>{" "}</option>] : []), 
      ...values.map((item) => {return <option key={item} value={item}>{item}</option>})
    ]
  }

  function handleChangeNickname(e) {
    setUser({...user, nickname: e.target.value})
  }

  function handleChangeCEFR(e) {
    setUser({...user, nivelCEFR: e.target.value})
  }

  function handleChangeJLPT(e) {
    setUser({...user, nivelJLPT: e.target.value})
  }

  function handleChangeJLPTProgresso(e) {
    setUser({...user, nivelJLPTProgresso: e.target.value})
  }

  function handleChangeShirai(e) {
    setUser({...user, nivelShirai: e.target.value})
  }

  function handleUpdateUser(e) {
    async function sendUser () {
      const updatedUser = await updateUser(user)
      alert('Perfil atualizado.')
    }

    sendUser()
    e.preventDefault();
  }
  
  return (
    <>
      <form onSubmit={handleUpdateUser}>
        <div className="input-grid">
          <label>Nickname:</label>
          <input type="text" value={user.nickname} onChange={handleChangeNickname}/>
          <label>Nivel JLPT: </label>
          <select className="input-min-width" defaultValue={user.nivelJLPT} onChange={handleChangeJLPT}>{ populateSelect(nivelJLPTvector, user.nivelJLPT) }</select>
          <label>Progresso no JLPT:</label>
          <select className="input-min-width" defaultValue={user.nivelJLPTProgresso} onChange={handleChangeJLPTProgresso}>{ populateSelect(nivelsVector, user.nivelJLPTProgresso) }</select>
          <label>Nivel Shirai:</label>
          <select className="input-min-width" defaultValue={user.nivelShirai} onChange={handleChangeShirai}>{ populateSelect(nivelShirai, user.nivelShirai) }</select>
        </div>
        <div>
          <input type="submit" value="Salvar alterações" className="btn"/>
        </div>
      </form>
    </>
  )
}

export default UserContainer

/*

Consultar os dados de cadastro do BD
Preencher o Form
Botao de SALVAR
  

*/