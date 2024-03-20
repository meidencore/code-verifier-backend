import express, { type Express } from 'express'
import dotenv from 'dotenv'

// configuration the .env file
dotenv.config()

// Create Express APP

const app: Express = express()
const port: string | number = process.env.PORT ?? 8000

// Execute APP and listen request to PORT

app.listen(port, () => {
  console.log(`Express Server runing at: http://localhost:${port}`)
})
