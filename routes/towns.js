const express = require('express')
const router = express.Router()
const db = require('../database/db').get()

router.post('/', (req, res) => {
  console.log('Database instance', db);

  res.json({
    state: true,
    message: 'Villes récupérées',
    results: []
  })
})

module.exports = router