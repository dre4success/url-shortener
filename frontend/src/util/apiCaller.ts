import { response } from 'express'

const baseURL = process.env.REACT_APP_BASE_URL

export const registerAPI = async (email: string, password: string) => {
  console.log({ email, password })
  const data = JSON.stringify({
    email,
    password,
  })
  console.log({ data })
  try {
    const resp = await fetch(`${baseURL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
    return resp.json()
  } catch (error) {
    console.log(`register error: `, error)
  }
}

