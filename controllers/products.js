import { Product } from '../models/products.js'
import { getMonthNumber } from '../utils/features.js'
import { ErrorHandler } from '../utils/utility.js'
// import { Notification } from '../models/notification.js'



const newProduct = async (req, res, next) => {

    try {
        const { productName, quantity, price } = req.body

        const product = await Product.create({
            productName,
            quantity,
            price
        })

        res.status(200).json({
            success: true,
            message: `${productName} added successfully`,
            product,
        })
    } catch (error) {
        next(error)
    }

}

const getProducts = async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products,
    })
}


const searchProducts = async (req, res, next) => {

    const { day, month, year } = req.body;

    if(!month){
        return res.status(400).json({
            success: false,
            message:  "Please Enter Month"
        })
    }
    if(!year){
        return res.status(400).json({
            success: false,
            message:  "Please Enter Year"
        })
    }

    try {
        // Build the query object
        const query = {};
    
        if (year || month || day) {
            query.createdAt = {};
    
            if (year) {
                query.createdAt.$gte = new Date(`${year}-01-01T00:00:00Z`);
                query.createdAt.$lt = new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`);
            }
    
            if (month) {
                query.createdAt.$gte = new Date(`${year || '1970'}-${String(month).padStart(2, '0')}-01T00:00:00Z`);
                query.createdAt.$lt = new Date(`${year || '1970'}-${String(parseInt(month) + 1).padStart(2, '0')}-01T00:00:00Z`);
            }
    
            if (day) {
                query.createdAt.$gte = new Date(`${year || '1970'}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00Z`);
                query.createdAt.$lt = new Date(`${year || '1970'}-${String(month).padStart(2, '0')}-${String(parseInt(day) + 1).padStart(2, '0')}T00:00:00Z`);
            }
        }
    
        // Execute the query
        const products = await Product.find(query).exec();
        res.status(200).json({
            success: true,
            message: `Products according to search query`,
            products,
        })
    
    } catch (error) {
        console.error('Error searching products:', error);
    }
}



export {
    newProduct,
    getProducts,
    searchProducts
}
