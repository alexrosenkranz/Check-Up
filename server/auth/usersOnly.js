module.exports = () => {
  return function (req, res, next) {
    if (req.user) {
      next()
    } else {
      res.json({ msg: 'please sign in' })
    }
  }
}
