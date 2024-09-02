import mongoose, { Schema, model } from "mongoose"

const schema = new Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})


export const Product = mongoose.models.Product || model('Product', schema)