const petfinderReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PET_TYPES':
      return {
        ...state,
        petTypes: action.payload,
        loading: false,
      }
    case 'GET_PETS':
      return {
        ...state,
        pets: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_PETS':
      return {
        ...state,
        pets: [],
        loading: false,
      }
    default:
      return state
  }
}

export default petfinderReducer
