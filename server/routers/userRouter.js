const express = require('express')
const multer = require('multer')
const path = require('path')
const { verifyAccessToken } = require('../middleware/common.js')
const { getNewAccessToken } = require('../utils/jwt.js')
const userController = require('../controllers/userController.js')
const userRouter = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newFilename = file.fieldname + '-' + Date.now() + ext; // Modified filename
    cb(null, newFilename);
  }
});

const upload = multer({ storage })
// auth routes
userRouter.post('/auth/register', upload.single('profileImage'), userController.register)
userRouter.post('/auth/login', userController.login)
userRouter.post('/auth/logout', userController.logout)
userRouter.post('/auth/refresh-token', getNewAccessToken)

// user routes
userRouter.get('/user/getProfile', verifyAccessToken, userController.getProfile)
userRouter.post('/user/updateProfile', upload.single('profileImage'), verifyAccessToken, userController.updateProfile)
userRouter.delete('/user/deleteProfile', verifyAccessToken, userController.deleteProfile)

module.exports = { userRouter }
