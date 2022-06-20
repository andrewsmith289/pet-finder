import { useState, useContext, useEffect } from 'react'
import PetfinderContext from '../../context/petfinder/PetfinderContext'
import {
  getPetTypes,
  searchPets,
} from '../../context/petfinder/PetfinderActions'
import { stringify } from 'postcss'

function PetSearch() {
  const [name, setName] = useState('')
  const [petType, setPetType] = useState('Pick an animal type')

  const { petTypes, pets, dispatch } = useContext(PetfinderContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'SET_LOADING' })

    const params = {
      type: petType,
      name,
    }
    const pets = await searchPets(params)
    console.log('Pets: ', pets)
    dispatch({ type: 'GET_PETS', payload: pets })
    setName('')
  }

  useEffect(() => {
    const loadPetTypes = async () => {
      const petTypes = await getPetTypes()
      dispatch({ type: 'GET_PET_TYPES', payload: petTypes })
    }
    loadPetTypes()
  }, [dispatch])

  const handleTextChange = (e) => setName(e.target.value)

  const handleSelectChange = (e) => {
    setPetType(e.target.value)
  }

  return (
    <div className='max-w-lg mb-8 m-auto'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='input-group'>
              <input
                type='text'
                className='w-full bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={name}
                onChange={handleTextChange}
              />

              <button type='submit' className='w-24 btn btn-lg'>
                Go
              </button>
            </div>
          </div>
          <div className='form-control'>
            <div className='input-group'>
              <select
                className='select w-full max-w-xs'
                value={petType}
                onChange={handleSelectChange}
              >
                <option disabled selected>
                  Pick an animal type
                </option>
                {petTypes.map((type, index) => {
                  return <option>{type.name}</option>
                })}
              </select>
            </div>
          </div>
        </form>
      </div>
      {pets.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_PETS' })}
            className='btn btn-ghost btn-lg'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
export default PetSearch
