const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Medicine'
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


cartSchema.statics.findByGeneric = async (genericName) => {
    const medicine = await Cart.findOne({ genericName })

    if (!medicine) {
        throw new Error('Medicine not found')
    }

    return medicine
}


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart