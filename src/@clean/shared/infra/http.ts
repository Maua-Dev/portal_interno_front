import axios from 'axios'

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL
})
