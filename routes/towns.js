const express = require('express')
const router = express.Router()
const dbClient = require('../database/db').client()

router.post('/', (req, res) => {
  dbClient.connect((err, db) => {
    if (!db) {
      res.json({
        state: false,
        message: 'Erreur de connexion à la BDD',
        results: null
      })
    } else {
      db.collection('towns', (errCollection, collection) => {
        if (errCollection) {
          res.json({
            state: false,
            message: 'Erreur lors sur la collection `towns`',
            results: null
          })
        } else {
          const inputs = [
            {
              name: 'Kinshasa',
              longitude: 0,
              latitude: 0,
              altitude: 0,
              links: [
                {
                  self: {
                    href: ''
                  },
                  ville: {
                    href: ''
                  },
                  cinemas: {
                    href: ''
                  },
                }
              ]
            },
            {
              name: 'Bandundu',
              longitude: 0,
              latitude: 0,
              altitude: 0,
              links: [
                {
                  self: {
                    href: ''
                  },
                  ville: {
                    href: ''
                  },
                  cinemas: {
                    href: ''
                  },
                }
              ]
            },
            {
              name: 'Lubumbashi',
              longitude: 0,
              latitude: 0,
              altitude: 0,
              links: [
                {
                  self: {
                    href: ''
                  },
                  ville: {
                    href: ''
                  },
                  cinemas: {
                    href: ''
                  },
                }
              ]
            },
            {
              name: 'Kisangani',
              longitude: 0,
              latitude: 0,
              altitude: 0,
              links: [
                {
                  self: {
                    href: ''
                  },
                  ville: {
                    href: ''
                  },
                  cinemas: {
                    href: ''
                  },
                }
              ]
            }
          ]

          collection.insertMany(inputs, (errInsrtion, results) => {
            if (errInsrtion) {
              res.json({
                state: false,
                message: `Erreur lors de l'insertion`,
                results: null
              })
            } else {
              console.log('Result saved', results);

              res.json({
                state: true,
                message: 'Villes récupérées',
                results: results
              })
            }
          })
        }
      })
    }
  })
})

router.get('/', (req, res) => {
  dbClient.connect((err, db) => {
    if (err) {
      return res.status(500).json({
        state: false,
        message: 'Error Database connection',
        results: null
      })
    }

    db.collection('towns', (errCollection, collection) => {
      if (errCollection) {
        return res.status(500).json({
          state: false,
          message: 'Error Collection : '+errCollection,
          results: null
        })
      }

      collection.findAll((errFound, results) => {
        if (errFound) {
          return res.status(500).json({
            state: true,
            message: 'Villes récupérées',
            results: null
          })
        }

        res.status(200).json({
          state: true,
          message: 'Villes récupérées',
          results: results.data
        })
      })
    })
  })
})

module.exports = router