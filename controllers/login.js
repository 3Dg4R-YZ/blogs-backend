const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      error: 'Usuario o contraseña incorrecta'
    })
  }
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter
