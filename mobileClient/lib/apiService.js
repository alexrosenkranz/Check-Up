const apiUrl = "http://localhost:3001/api/v2"

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