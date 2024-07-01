const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: "Username already exists" })
    }
    user = new User({ username, password })
    await user.save()
    const payload = { userId: user._id }
    const token = jwt.sign(payload, 'your_secure_secret_key', { expiresIn: '1h' })
    res.status(201).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})


// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const payload = { userId: user._id }
    const token = jwt.sign(payload, 'your_secure_secret_key', { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
