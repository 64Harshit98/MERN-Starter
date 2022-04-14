import express, { Express, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"

// Import routes
import userRoutes from "./routes/user"


const app: Express = express()

// Setting the PORT
const PORT: string | number = process.env.PORT || 4000

// For CORS 
app.use(cors())
app.use(bodyParser.json())

// Set Routes
app.use("/user", userRoutes)

// Home Route
app.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({ "msg": "success!" })
    } catch (error) {
        throw error
    }
})

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustermain.ry7lg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options: object = { useNewUrlParser: true, useUnifiedTopology: true }
// For connecting to MongoDB
mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        console.log("MongoDB Atlas!")
        throw error
    })