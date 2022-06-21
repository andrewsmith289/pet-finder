import { createContext, useReducer } from 'react'

import petfinderReducer from './PetfinderReducer'

const PetfinderContext = createContext()

export const PetfinderProvider = ({ children }) => {
  const initialState = {
    petTypes: [],
    pets: [],
    pet: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(petfinderReducer, initialState)

  return (
    <PetfinderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PetfinderContext.Provider>
  )
}

export default PetfinderContext
