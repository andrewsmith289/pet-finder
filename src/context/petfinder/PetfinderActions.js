import axios from 'axios'

const PETFINDER_URL = process.env.REACT_APP_PETFINDER_URL
const PETFINDER_TOKEN = process.env.REACT_APP_PETFINDER_TOKEN

console.log(PETFINDER_TOKEN)
const petfinder = axios.create({
  baseURL: PETFINDER_URL,
  headers: { Authorization: `Bearer ${PETFINDER_TOKEN}` },
})

export const searchPets = async (text) => {
  const params = new URLSearchParams({
    name: text,
  })

  const res = await petfinder.get(`animals?${params}`)

  return res.data.animals
}
