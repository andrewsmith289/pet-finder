import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'

import { PetfinderProvider } from './context/petfinder/PetfinderContext'

function App() {
  return (
    <PetfinderProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </PetfinderProvider>
  )
}

export default App
