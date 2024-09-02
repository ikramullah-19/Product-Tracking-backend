import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import mongoose from "mongoose"

import productRoute from './routes/products.js'

const corsOptions = {
  origin: ['http://localhost:3000',
      // 'http://localhost:4173',
      process.env.CLIENT_URL
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}


const app = express()

dotenv.config({
    path: './.env'
})

app.use(express.json())
app.use(cors(corsOptions));

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mycluster.olsb1vj.mongodb.net/`
const port = process.env.PORT || 5000
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"

const connectToDB = (uri) => {
    mongoose.connect(uri, { dbName: 'Products' }).then((data) => {
      console.log(`Connected to Database Successfully! ${data.connection.host} `)
    }).catch((err) => {
      throw err
    })
  }

connectToDB(mongoURI)

app.use('/api/v1/products', productRoute )

app.get('/', (req, res) => {
    res.send("Hello World!")
})




app.listen(port, () => {
    console.log(`Server Listening on Port ${port} in ${envMode} Mode!`)
})
