const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const router = require('./routers/index.js')
const app = express()

require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))


app.use('/api/v1', router.userRouter)
app.get('/media/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
})

const port = 5000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port} and successfully connected to the database.`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })
