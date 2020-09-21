const express = require('express')
const auth = require('../../middlewares/authAdmin')
const Medicine = require('../../models/admin/medicine')
const router = new express.Router()


router.get('/admin/medicines', auth, async (req, res) => {
    try {
        const medicines = await Medicine.find()
        res.status(200).json({ status: 'success', message: medicines })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/admin/add-medicine', auth, async (req, res) => {
    const medicine = new Medicine({
        ...req.body
    })
    try {
        const registeredMedicine = await Medicine.find({
            medicineName: req.body.medicineName,
            strength: req.body.strength,
            unit: req.body.unit
        })

        if (registeredMedicine.length != 0) {
            return res.status(409).json({ status: 'error', message: 'Medicine is already in the list' })
        }

        await medicine.save()
        res.status(201).json({ status: 'success', message: 'Successfully inserted' })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/admin/update-medicine', auth, async (req, res) => {
    try {
        const registeredMedicine = await Medicine.findByIdAndUpdate(req.body._id,
            {
                medicineName: req.body.medicineName,
                strength: req.body.strength,
                strength: req.body.strength,
                genericName: req.body.genericName,
                manufacturer: req.body.manufacturer,
                price: req.body.price
            }, { new: true })
        res.status(200).json({ status: 'success', message: registeredMedicine })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/admin/remove-medicine', auth, async (req, res) => {
    try {
        const registeredMedicine = await Medicine.findByIdAndDelete(req.body._id)
        res.status(200).json({ status: 'success', message: registeredMedicine })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})

module.exports = router