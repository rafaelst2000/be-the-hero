import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Login() {
  const history = useHistory()
  const [id, setId] = useState('')

 async function handleLogin(event){
    event.preventDefault()

    try{
      const res = await api.post('sessions', { id })
      
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', res.data.name)

      history.push('/perfil')

    }catch (err){
      alert("Falha no login, tente novamente")
    }
  }
  return(
    <div className="login-container">
      <section className="form">
          <img src={logoImg} alt="logo" />
          
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>

            <input type="text" placeholder="Seu ID"
              value={id}
              onChange={event => setId(event.target.value)}
              />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/registro">
              <FiLogIn size={16} color="#E02041"/>
              Não tenho cadastro
            </Link>
          </form>
      </section>

      <img src={heroesImg} alt="heroes" />
    </div>
  )

}