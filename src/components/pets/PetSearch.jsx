import { useState, useContext } from 'react'
import PetfinderContext from '../../context/petfinder/PetfinderContext'
import { searchPets } from '../../context/petfinder/PetfinderActions'

function PetSearch() {
  const [text, setText] = useState('')

  const { pets, dispatch } = useContext(PetfinderContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'SET_LOADING' })

    const pets = await searchPets(text)
    dispatch({ type: 'GET_PETS', payload: pets })
    setText('')
  }

  const handleChange = (e) => setText(e.target.value)

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
                value={text}
                onChange={handleChange}
              />
              <button type='submit' className='w-24 btn btn-lg'>
                Go
              </button>
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
