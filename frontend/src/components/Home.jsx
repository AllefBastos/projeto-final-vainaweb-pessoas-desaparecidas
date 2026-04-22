import './home.css'

const Home = ({ onNavigateToForm }) => {
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
                        <button className="btn-primary" onClick={onNavigateToForm}>
                            Iniciar Cadastro
                        </button>
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
                            <li><strong>Preencha os dados:</strong> Nome, idade, email e telefone</li>
                            <li><strong>Confirme:</strong> Revise e envie o formulário</li>
                            <li><strong>Pronto!</strong> Seus dados foram registrados com sucesso</li>
                        </ol>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="cta-content">
                        <h2>Pronto para começar?</h2>
                        <p>Registre seu primeiro cadastro agora mesmo!</p>
                        <button className="btn-primary btn-large" onClick={onNavigateToForm}>
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
