/** This middleware function will check the req.body for a
 * valid password and email. It will sign the jwt if they are valid
 */

// TO DO: errors should throw error objects. And write error handler in server.js
const jwt = require('jsonwebtoken')
const Query = require('../controllers/apiQueries')

module.exports = function (contBool) {
  const callNext = contBool || false
  return function (req, res, next) {
    // 1. check if there is a req.body.username && password
    const { email, password } = req.body
    if (!email || !password) {
      console.log('email', email)
      console.log('password', password)
      return res.json({msg: 'Please provide both an email and password'})
    }
    // 2. find user and check password
    Query.findPatientByEmail(email).then((userResult) => {
      if (!userResult) {
        return res.json({msg: 'Sorry, no user found with that email'})
      } else if (!userResult.checkPassword(password)) {
        // 2b. check that the password matches
        return res.json({ msg: 'Sorry, that password is incorrect' })
      } else {
        // 3. make the token
        // 3a. make the payload
        const payload = {
          _id: userResult._id,
          email: userResult.email,
          exp: Math.floor(Date.now() / 1000)
          // exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in 1 hour
        }
        // 3b. sign the token
        const token = jwt.sign(payload, process.env.JWT_PASSPHRASE)
        // 3c. make a cookie for the res
        res.cookie('token', token, { httpOnly: true })
        // check to see to keep going or not
        if (callNext) {
          next()
        } else {
          console.log(token)
          return res.json({ token })
        }
      }
    })
  }
}
