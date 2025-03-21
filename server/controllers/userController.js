const User = require('../models/User.js')

const bcrypt = require('bcryptjs')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')

const register = async (req, res) => {
  try {
    const { name, email, branch, subject, dob, password } = req.body
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.status(409).json({ message: 'User already exist with this email id.' })
    }
    const user = new User({ name, email, branch, profile: req.file.filename, subject, dob, password })
    const response = await user.save()
    return res.status(200).json({ message: 'Registration is successfull.' })
  } catch (error) {
    console.log('Error during registration.', error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    console.log('user', user)
    if (!user) return res.status(401).json({ message: 'User not found with this email.' })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' })
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const role = user.role
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({ message: 'User Logged in Successfull.', accessToken })
  } catch (error) {
    return res.status(500).json({ message: 'Error during login.', error })
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.status(200).json({ message: 'User logged out successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Error during logout.', error })
  }
}

const getProfile = async (req, res) => {
  try {

    const userId = req.user.userId
    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: 'Error during fetching user profile.', error })
  }
}

const updateProfile = async (req, res) => {
  try {

    const { name, subject, dob, branch, email } = req.body
    console.log('body', req.body)
    const updateUser = await User.findOneAndUpdate({ email }, { name, subject, dob, branch, profile: req?.file?.filename }, { new: true })
    // console.log('up', updateUser)
    res.status(200).json({ message: 'User profile update is successful.', user: updateUser })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error during updating user profile.', error })
  }
}


const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.user
    await User.deleteOne({ _id: userId })
    res.status(200).json({ message: 'User profile deletion is successful.' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ message: 'Error during deleting user profile.', error })
  }
}
module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteProfile
}
