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

export const getPets = async ({ name, type, color }) => {
  const params = new URLSearchParams()
  name && params.append('name', name.toLowerCase())
  type && params.append('type', type.toLowerCase())
  color && params.append('color', color.toLowerCase())

  const res = await petfinder.get(`pets?${params}`)

  return res.data.animals
}

export const getPet = async (id) => {
  const res = await petfinder.get(`pet/${id}`)

  return res.data.animal
}
