const apiUrl = "http://localhost:3002/api/v2"
const authUrl = "http://localhost:3002/auth"

export const _signIn = (email, password) => {
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

export const _getPatient = (token) => {
  return fetch(`${apiUrl}/patient/id`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    }
  })
  .then(res => res.json())
  .catch((err) => {
    console.log(err)
  })
}

export const _addProvider = (apptInfo, token) => {
  console.log(apptInfo)
  return fetch(`${apiUrl}/new-provider`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(apptInfo)
  }).then(res => {
    console.log(res)
    res.json()})
    .catch((err) => console.log(err))
}

export const _addAppointment = (apptInfo, token) => {
  console.log(apptInfo)
  return fetch(`${apiUrl}/new-appointment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify(apptInfo)
  }).then(res => {
    console.log(res)
    res.json()})
    .catch((err) => console.log(err))
}