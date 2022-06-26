import { useState, useContext, useEffect } from 'react'
import PetfinderContext from '../../context/petfinder/PetfinderContext'
import { getPetTypes, getPets } from '../../context/petfinder/PetfinderActions'

function PetSearch() {
  const DEFAULT_TYPE_TEXT = 'Pick an animal type'
  const DEFAULT_COLOR_TEXT = 'Pick a color'

  const [name, setName] = useState('')

  const [petType, setPetType] = useState(DEFAULT_TYPE_TEXT)
  const [selectedType, setSelectedType] = useState(undefined)

  const [petColor, setPetColor] = useState(DEFAULT_COLOR_TEXT)

  const { petTypes, pets, dispatch } = useContext(PetfinderContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch({ type: 'SET_LOADING' })

    const params = {
      type:
        petType === 'Any' || petType === DEFAULT_TYPE_TEXT
          ? undefined
          : petType,
      color:
        petColor === 'Any' || petColor === DEFAULT_COLOR_TEXT
          ? undefined
          : petColor,
      name: name === '' ? undefined : name,
    }
    const pets = await getPets(params)
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

  const handleTypeSelectChange = (e) => {
    if (e.target.value === 'Any') {
      setSelectedType(0)
    } else {
      setSelectedType(e.target.selectedIndex - 2)
    }

    setPetType(e.target.value)
  }

  const handleColorSelectChange = (e) => {
    setPetColor(e.target.value)
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
                defaultValue={petType}
                onChange={handleTypeSelectChange}
              >
                <option disabled>{DEFAULT_TYPE_TEXT}</option>
                <option>Any</option>
                {petTypes.map((type, index) => {
                  return <option key={type.name}>{type.name}</option>
                })}
              </select>
            </div>
          </div>
          {selectedType !== undefined && (
            <div className='form-control'>
              <div className='input-group'>
                <select
                  className='select w-full max-w-xs'
                  defaultValue={petColor}
                  onChange={handleColorSelectChange}
                >
                  <option disabled>{DEFAULT_COLOR_TEXT}</option>
                  <option>Any</option>
                  {petTypes[selectedType].colors.map((color, index) => {
                    return <option key={color}>{color}</option>
                  })}
                </select>
              </div>
            </div>
          )}
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
