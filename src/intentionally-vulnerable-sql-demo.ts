import express from 'express'
import { Client } from 'pg'

export const app = express()
export const apiKey = 'DUMMY_API_KEY_FOR_CODEQL_DEMO_ONLY'

const client = new Client({
  connectionString: 'postgresql://dbuser:dummy-password@localhost:5432/mydb'
})
void client.connect()

app.get('/api/user', (req, res) => {
  const userInput = req.query.id
  const query = 'SELECT * FROM users WHERE id = ' + userInput

  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Database error')
    } else {
      res.json(result.rows)
    }
  })
})
