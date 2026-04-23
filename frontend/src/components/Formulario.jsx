import { useState, useEffect } from 'react'
import './formulario.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Formulario = ({ onBackHome, editingPessoa }) => {

    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [ultimaLocalizacao, setUltimaLocalizacao] = useState('')
    const [telefone, setTelefone] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // Preencher campos quando estiver editando
    useEffect(() => {
        if (editingPessoa) {
            setNome(editingPessoa.nome || '')
            setIdade(editingPessoa.idade || '')
            setUltimaLocalizacao(editingPessoa.ultimaLocalizacao || '')
            setTelefone(editingPessoa.telefone || '')
        } else {
            // Limpar campos quando não estiver editando
            setNome('')
            setIdade('')
            setUltimaLocalizacao('')
            setTelefone('')
        }
    }, [editingPessoa])

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

        // Adicionar ID se estiver editando
        if (editingPessoa) {
            pessoa.id = editingPessoa.id
        }

        try {
            const method = editingPessoa ? 'PUT' : 'POST'
            const successMessage = editingPessoa
                ? "Pessoa atualizada com sucesso!"
                : "Pessoa cadastrada com sucesso!"

            const response = await fetch(`${BACKEND_URL}/pessoa`, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pessoa)
            })

            if (!response.ok) {
                throw new Error(editingPessoa ? "Erro ao atualizar pessoa" : "Erro ao cadastrar pessoa")
            }

            await response.json()

            setSuccessMessage(successMessage)
            setErrorMessage('')

            // Limpar campos apenas se não estiver editando
            if (!editingPessoa) {
                setNome('')
                setIdade('')
                setUltimaLocalizacao('')
                setTelefone('')
            }

            setTimeout(() => setSuccessMessage(''), 3000)

        } catch (error) {
            console.error("Erro:", error)
            setErrorMessage(editingPessoa ? "Erro ao atualizar pessoa. Tente novamente." : "Erro ao cadastrar pessoa. Tente novamente.")
            setTimeout(() => setErrorMessage(''), 4000)
        }
    }

    return (
        <div className="container">

            <button className="btn-back" onClick={onBackHome}>
                ← Voltar
            </button>

            <div className="formulario">
                <h2>{editingPessoa ? 'Editar Pessoa' : 'Cadastrar Pessoa'}</h2>

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
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Digite o nome completo"
                        />
                    </div>

                    <div>
                        <label>Idade:</label>
                        <input
                            type="number"
                            value={idade}
                            onChange={e => setIdade(e.target.value)}
                            placeholder="Digite a idade"
                        />
                    </div>

                    <div>
                        <label>Última Localização:</label>
                        <input
                            type="text"
                            value={ultimaLocalizacao}
                            onChange={e => setUltimaLocalizacao(e.target.value)}
                            placeholder="Digite a última localização conhecida"
                        />
                    </div>

                    <div>
                        <label>Telefone:</label>
                        <input
                            type="tel"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            placeholder="Digite o telefone de contato"
                        />
                    </div>

                    <button type="submit">
                        {editingPessoa ? 'Atualizar Pessoa' : 'Cadastrar Pessoa'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Formulario