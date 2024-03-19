import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

// configuration the .env file
dotenv.config() 

// Create Express APP

const app: Express = express()
const port: string | number = process.env.PORT || 8000

// Create first route

app.get("/", (req: Request, res: Response) => {
    // send Hello World
    res.send("Welcome to APP Express + TS + Swagger + Mongoose")
})

// Execute APP and listen request to PORT

app.listen(port, () => {
    console.log(`Express Server runing at: http://localhost:${port}`)
})