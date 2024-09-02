import express from 'express'
import {
    newProduct, getProducts, searchProducts
} from '../controllers/products.js'

const app = express.Router()

app.post('/new', newProduct)

app.get('/get', getProducts)

app.post('/search', searchProducts)

export default app