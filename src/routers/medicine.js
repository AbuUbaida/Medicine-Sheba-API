const express = require('express')
const auth = require('../middlewares/auth')
const Medicine = require('../models/admin/medicine')
const router = new express.Router()


router.get('/medicines', auth, async (req, res) => {
    try {
        const medicines = await Medicine.find()
        res.status(200).json({ status: 'success', message: medicines })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})

module.exports = router