const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const getNewAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token not provided' })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired refresh token' })
    }

    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const newAccessToken = generateAccessToken(user)

    res.status(200).json({ accessToken: newAccessToken })
  })
}

module.exports = { generateAccessToken, generateRefreshToken, getNewAccessToken }
