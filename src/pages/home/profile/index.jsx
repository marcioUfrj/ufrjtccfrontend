import React from 'react'
import { useUserContext } from '../../../components/body/UserContext'
import { getAuthUid } from '../../../config/firebase'
import { updateUser } from '../../../services'
import { nivelsVector, nivelJLPTvector, nivelShirai, agreeTermsVector } from '../../../constants/constants'

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

  function handleChangeAdult(e) {
    setUser({...user, adult: e.target.value === "Sim" ? true : false})
  }

  function handleChangeAgreeTermsOfUse(e) {
    setUser({...user, agreeTermsOfUse: e.target.value === "Sim" ? true : false})
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

  function getObjectProperty(obj, property_name, default_value) {
    if (obj.hasOwnProperty(property_name) === false) {
      return default_value
    }

    return obj[property_name] === true ? 'Sim' : 'Não'
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
          <label>Maior de idade?</label>
          <select className="input-min-width" defaultValue={getObjectProperty(user, 'adult', "Não")} onChange={handleChangeAdult}>{ populateSelect(agreeTermsVector, getObjectProperty(user, 'adult', "Não")) }</select>
          <label>Concordo com os termos de uso?</label>
          <select className="input-min-width" defaultValue={getObjectProperty(user, 'agreeTermsOfUse', "Não")} onChange={handleChangeAgreeTermsOfUse}>{ populateSelect(agreeTermsVector, getObjectProperty(user, 'agreeTermsOfUse', "Não")) }</select>
          <label>Qual seu nível JLPT? </label>
          <select className="input-min-width" defaultValue={user.nivelJLPT} onChange={handleChangeJLPT}>{ populateSelect(nivelJLPTvector, user.nivelJLPT) }</select>
          <label>Qual seu progresso dentro do nível JLPT?</label>
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