import { useState } from 'react'
import './formulario.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Formulario = ({ onBackHome }) => {

  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('')
  const [telefone, setTelefone] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!nome || !idade) {
      setErrorMessage("Nome e idade são obrigatórios")
      setTimeout(() => setErrorMessage(''), 4000)
      return
    }

    const pessoa = {
      nome,
      idade: Number(idade),
      ultimaLocalizacao,
      telefone
    }

    try {
      const response = await fetch(`${BACKEND_URL}/pessoa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pessoa)
      })

      if (!response.ok) {
        throw new Error("Erro ao cadastrar pessoa")
      }

      await response.json()

      setSuccessMessage("Pessoa cadastrada com sucesso!")
      setErrorMessage('')

      setNome('')
      setIdade('')
      setUltimaLocalizacao('')
      setTelefone('')

      setTimeout(() => setSuccessMessage(''), 3000)

    } catch (error) {
      console.error("Erro:", error)
      setErrorMessage("Erro ao cadastrar pessoa. Tente novamente.")
      setTimeout(() => setErrorMessage(''), 4000)
    }
  }

  return (
    <div className="container">

      <button className="btn-back" onClick={onBackHome}>
        ← Voltar
      </button>

      <div className="formulario">
        <h2>Cadastrar Pessoa</h2>

        {successMessage && (
          <div className="message success-message">
            ✓ {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="message error-message">
            ✗ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div>
            <label>Nome:</label>
            <input value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <div>
            <label>Idade:</label>
            <input type="number" value={idade} onChange={e => setIdade(e.target.value)} />
          </div>

          <div>
            <label>Ultima Localização:</label>
            <input type="text" value={ultimaLocalizacao} onChange={e => setUltimaLocalizacao(e.target.value)} />
          </div>

          <div>
            <label>Telefone:</label>
            <input value={telefone} onChange={e => setTelefone(e.target.value)} />
          </div>

          <button type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  )
}

export default Formulario