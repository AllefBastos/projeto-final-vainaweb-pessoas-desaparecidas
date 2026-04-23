import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Formulario from './components/Formulario'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [editingPessoa, setEditingPessoa] = useState(null)

  const navigateToForm = (pessoa = null) => {
    setEditingPessoa(pessoa)
    setCurrentPage('formulario')
  }

  const navigateToHome = () => {
    setEditingPessoa(null)
    setCurrentPage('home')
  }

  return (
    <div className="app">
      {currentPage === 'home' ? (
        <Home onNavigateToForm={navigateToForm} />
      ) : (
        <Formulario
          onBackHome={navigateToHome}
          editingPessoa={editingPessoa}
        />
      )}
    </div>
  )
}

export default App
