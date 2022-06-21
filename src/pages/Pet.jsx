import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import PetfinderContext from '../context/petfinder/PetfinderContext'
import { getPet } from '../context/petfinder/PetfinderActions'

function Pet() {
  const { pet, dispatch } = useContext(PetfinderContext)
  const { id } = useParams()

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    const getPetData = async () => {
      const petData = await getPet(id)
      dispatch({ type: 'GET_PET', payload: petData })
    }
    getPetData()
  }, [id, dispatch])
  console.log(pet)
  return <div>Pet {id}</div>
}
export default Pet
