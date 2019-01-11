const { Pool } = require('pg')

const pool = new Pool()

pool.on('error', (err, client) => {
console.error('Unexpected error on idle client', err)
process.exit(-1)
})

pool.connect()
.then(client => {
  return client.query(
    //read query
  )
    .then(res => {
      client.release()
      console.log(res.rows[0])
    })
    .catch(e => {
      client.release()
      console.log(err.stack)
    })
})