import { useContext } from 'react'

import PetItem from './PetItem'
import PetfinderContext from '../../context/petfinder/PetfinderContext'

function PetResults() {
  const { pets, loading } = useContext(PetfinderContext)

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {pets.map((pet) => {
          return <PetItem key={pet.id} pet={pet} />
        })}
      </div>
    )
  } else {
    return 'Loading...'
  }
}

export default PetResults
