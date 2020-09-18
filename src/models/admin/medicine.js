const mongoose = require('mongoose')


const medicineSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true,
        trim: true
    },
    strength: {
        type: Number,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['mg','ml']
    },
    genericName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})


medicineSchema.statics.findByGeneric = async (genericName) => {
    const medicine = await Medicine.findOne({ genericName })

    if (!medicine) {
        throw new Error('Medicine not found')
    }

    return medicine
}


const Medicine = mongoose.model('Medicine', medicineSchema)

module.exports = Medicine