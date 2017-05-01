const apiUrl = "http://localhost:3001/api/v2"

// GET RID OF BEFORE LAUNCH!!!!
export const _getUser = (email) => {
  console.log(email)
  return fetch(`${apiUrl}/patient/username/${email}`).then(res => res.json())
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

export const _signIn = (username) => {
  console.log(username)
  return fetch(`${apiUrl}/sign-in`, {
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(username)
  }).then(res => res.json())
}