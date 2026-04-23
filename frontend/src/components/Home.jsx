import { useState, useEffect } from 'react'
import './home.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Home = ({ onNavigateToForm }) => {
    const [pessoas, setPessoas] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingPessoa, setEditingPessoa] = useState(null)

    // Buscar pessoas do backend
    const fetchPessoas = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/pessoas`)
            if (response.ok) {
                const data = await response.json()
                setPessoas(data)
            }
        } catch (error) {
            console.error('Erro ao buscar pessoas:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPessoas()
    }, [])

    // Função para excluir pessoa
    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta pessoa?')) {
            return
        }

        try {
            const response = await fetch(`${BACKEND_URL}/pessoa`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if (response.ok) {
                setPessoas(pessoas.filter(pessoa => pessoa.id !== id))
                alert('Pessoa excluída com sucesso!')
            } else {
                alert('Erro ao excluir pessoa')
            }
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error)
            alert('Erro ao excluir pessoa')
        }
    }

    // Função para editar pessoa
    const handleEdit = (pessoa) => {
        setEditingPessoa(pessoa)
        onNavigateToForm(pessoa)
    }

    return (
        <div className="home">
            {/* Header */}
            <header className="home-header">
                <div className="header-content">
                    <h1 className="home-title">Registro de Pessoas Desaparecidas</h1>
                    <p className="home-subtitle">Plataforma de cadastro e gerenciamento</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="home-main">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h2>Bem-vindo ao Sistema</h2>
                        <p>
                            Uma plataforma simples e eficiente para o registro e gerenciamento
                            de informações de pessoas. Organize seus dados com facilidade e segurança.
                        </p>
                        <button className="btn-primary" onClick={() => {
                            setEditingPessoa(null)
                            onNavigateToForm()
                        }}>
                            Iniciar Cadastro
                        </button>
                    </div>
                </section>

                {/* Lista de Pessoas Cadastradas */}
                <section className="pessoas-section">
                    <div className="pessoas-container">
                        <h2 className="section-title">Pessoas Cadastradas</h2>

                        {loading ? (
                            <div className="loading">
                                <p>Carregando pessoas...</p>
                            </div>
                        ) : pessoas.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📋</div>
                                <h3>Nenhuma pessoa cadastrada</h3>
                                <p>Comece cadastrando a primeira pessoa no sistema.</p>
                                <button className="btn-primary" onClick={() => {
                                    setEditingPessoa(null)
                                    onNavigateToForm()
                                }}>
                                    Cadastrar Primeira Pessoa
                                </button>
                            </div>
                        ) : (
                            <div className="pessoas-grid">
                                {pessoas.map((pessoa) => (
                                    <article key={pessoa.id} className="pessoa-card">
                                        <div className="pessoa-header">
                                            <h3 className="pessoa-nome">{pessoa.nome}</h3>
                                            <div className="pessoa-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(pessoa)}
                                                    title="Editar pessoa"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(pessoa.id)}
                                                    title="Excluir pessoa"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pessoa-info">
                                            <div className="info-item">
                                                <span className="info-label">Idade:</span>
                                                <span className="info-value">{pessoa.idade} anos</span>
                                            </div>

                                            {pessoa.ultimaLocalizacao && (
                                                <div className="info-item">
                                                    <span className="info-label">Última localização:</span>
                                                    <span className="info-value">{pessoa.ultimaLocalizacao}</span>
                                                </div>
                                            )}

                                            {pessoa.telefone && (
                                                <div className="info-item">
                                                    <span className="info-label">Telefone:</span>
                                                    <span className="info-value">{pessoa.telefone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pessoa-id">
                                            ID: #{pessoa.id}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="features">
                    <h2 className="section-title">Funcionalidades</h2>
                    <div className="features-grid">
                        <article className="feature-card">
                            <div className="feature-icon">📝</div>
                            <h3>Cadastro Simples</h3>
                            <p>Interface intuitiva para cadastro rápido e seguro de pessoas.</p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-icon">💾</div>
                            <h3>Armazenamento Seguro</h3>
                            <p>Seus dados são armazenados com segurança em nossa plataforma.</p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Gerenciamento</h3>
                            <p>Organize e gerencie informações de forma centralizada.</p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Privacidade</h3>
                            <p>Proteção total de dados com privacidade garantida.</p>
                        </article>
                    </div>
                </section>

                {/* Info Section */}
                <section className="info">
                    <div className="info-box">
                        <h2>Como Funciona?</h2>
                        <ol className="info-list">
                            <li><strong>Acesse o formulário:</strong> Clique no botão de cadastro</li>
                            <li><strong>Preencha os dados:</strong> Nome, idade, última localização e telefone</li>
                            <li><strong>Confirme:</strong> Revise e envie o formulário</li>
                            <li><strong>Gerencie:</strong> Edite ou exclua registros quando necessário</li>
                        </ol>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="cta-content">
                        <h2>Pronto para começar?</h2>
                        <p>Registre seu primeiro cadastro agora mesmo!</p>
                        <button className="btn-primary btn-large" onClick={() => {
                            setEditingPessoa(null)
                            onNavigateToForm()
                        }}>
                            Cadastrar Agora
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="home-footer">
                <p>&copy; 2026 Sistema de Registro de Pessoas. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}

export default Home
