import axios from 'axios'

const PETFINDER_URL = process.env.REACT_APP_PETFINDER_URL

const petfinder = axios.create({
  baseURL: PETFINDER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getPetTypes = async () => {
  const res = await petfinder.get('types')

  return res.data.types
}

export const searchPets = async ({ name, type }) => {
  const params = new URLSearchParams()
  name && params.append('name', name)
  type && params.append('type', type.toLowerCase())

  const res = await petfinder.get(`pets?${params}`)

  return res.data.animals
}
