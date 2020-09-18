const mongoose = require('mongoose')


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
        enum: ['Accepted', 'Pending']
    },
    medicineId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Medicine'
    }],
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