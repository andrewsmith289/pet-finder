import axios from 'axios'

const PETFINDER_URL = process.env.REACT_APP_PETFINDER_URL

const petfinder = axios.create({
  baseURL: PETFINDER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchPets = async (text) => {
  const params = new URLSearchParams({
    name: text,
  })

  const res = await petfinder.get(`pets?${params}`)

  return res.data.animals
}
