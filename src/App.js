import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Pet from './pages/Pet'

import { PetfinderProvider } from './context/petfinder/PetfinderContext'

function App() {
  return (
    <PetfinderProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/pet/:id' element={<Pet />} />
        </Routes>
      </Router>
    </PetfinderProvider>
  )
}

export default App
