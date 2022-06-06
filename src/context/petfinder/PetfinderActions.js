import axios from 'axios'

const PETFINDER_URL = process.env.REACT_APP_PETFINDER_URL
const PETFINDER_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const PETFINDER_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const petfinder = axios.create({
  baseURL: PETFINDER_URL,
})

petfinder.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await refreshAccessToken()
      petfinder.defaults.headers.common['Authorization'] =
        'Bearer ' + access_token

      return petfinder(originalRequest)
    }

    return Promise.reject(error)
  }
)

const refreshAccessToken = async () => {
  const data = await petfinder.post(`oauth2/token`, {
    grant_type: 'client_credentials',
    client_id: PETFINDER_CLIENT_ID,
    client_secret: PETFINDER_CLIENT_SECRET,
  })

  return data.data.access_token
}

export const searchPets = async (text) => {
  const params = new URLSearchParams({
    name: text,
  })

  const res = await petfinder.get(`animals?${params}`)

  return res.data.animals
}
