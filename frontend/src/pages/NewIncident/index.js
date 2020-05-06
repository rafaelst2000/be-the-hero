import React, { useState } from 'react'
import { FiArrowLeft  } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleNewIncident(event){
    event.preventDefault()
    
    const data = { title, description, value }

    try{
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('../perfil')  
    }catch(err){
      alert("Erro ao cadastrar novo caso, tente novamente.")
    }
  }

  return(
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="logo" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói :)</p>
          
          <Link className="back-link" to="/perfil">
              <FiArrowLeft size={16} color="#E02041"/>
              Voltar para homepage
            </Link>
        </section>
        
        <form onSubmit={handleNewIncident}>
          <input type="text" placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
            />
          <textarea placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input type="text" placeholder="Valor em Reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
} 