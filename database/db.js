const bolengedb = require('bolengedb')
const path = require('path')

const BolengeClient = bolengedb.BolengeClient;
const client = new BolengeClient({
  data_path: path.join(__dirname, './data'),
  db_name: 'flutterapi',
  locale: 'fr'
})

const state = {
  db: null
}

module.exports = {
  connect() {
    return new Promise((resolve, reject) => {
      if (state.db) {
        resolve({state: true, message: 'Une connexion à la DB existe déjà', db: state.db})
      } else {
        client.connect((err, db) => {
          if (err) {
            reject({state: false, message: 'Erreur de connexion à la DB : '+err, db: null})
          } else {
            state.db = db

            resolve({state: true, message: '>>> Connexion à la DB reussie !', db})
          }
        })
      }
    })
  },

  client() {
    return client
  }
}