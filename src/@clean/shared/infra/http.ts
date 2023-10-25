import axios from 'axios'

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL:
    'https://mj6hntn98c.execute-api.sa-east-1.amazonaws.com/prod/mss-action'
})
