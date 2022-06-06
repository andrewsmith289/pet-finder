import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function PetItem({ pet: { id, name, type, gender, age, status, photos } }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          {photos.length > 0 && (
            <div className='avatar'>
              <div className='rounded-lg shadow w-18 h-18'>
                <img src={photos[0].medium} alt='Profile' />
              </div>
            </div>
          )}
        </div>
        <div className='sidebar'>
          <h2 className='card-title'>{name}</h2>
          <h3>{type}</h3>
          <h3>{age}</h3>
          <h3>{gender}</h3>
          <h3>{capitalizeFirstLetter(status)}</h3>

          <Link className='text-base-content text-opacity-40' to={`/pet/${id}`}>
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

PetItem.propTypes = {
  pet: PropTypes.object.isRequired,
}

export default PetItem
