const mongoose = require('mongoose')


const medicineDetails = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Medicine'
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    }
})


const orderSchema = new mongoose.Schema({
    orderNo: {
        type: Number,
        required: true,
        unique: true
    },
    orderStatus: {
        type: String,
        required: false,
        default: 'Pending',
        enum: ['Accepted', 'Pending', 'Delivered']
    },
    orderDetails: [medicineDetails],
    subTotal: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order