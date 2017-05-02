const apiUrl = "http://localhost:3001/api/v2"
const authUrl = "http://localhost:3001/auth"

export const _signIn = (email, password) => {
  console.log(email)
  console.log(password)
  let signInCreds = {email, password}
  return fetch(`${authUrl}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signInCreds)
  }).then(res => res.json())
}

export const _signUp = (username) => {
  console.log(username)
  return fetch(`${apiUrl}/new-patient`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(username)
  }).then(res => res.json())
}

export const _addAppointment = (username) => {
  console.log(username)
  return fetch(`${apiUrl}/new-appointment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(username)
  }).then(res => res.json())
}