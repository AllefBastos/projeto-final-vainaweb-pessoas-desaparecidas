import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Formulario from './components/Formulario'

const BACKEND_URL = 'http://localhost:3000'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigateToForm = () => setCurrentPage('formulario')
  const navigateToHome = () => setCurrentPage('home')

  return (
    <div className="app">
      {currentPage === 'home' ? (
        <Home onNavigateToForm={navigateToForm} />
      ) : (
        <Formulario onBackHome={navigateToHome} />
      )}
    </div>
  )
}

export default App
