const express = require('express')
const Order = require('../models/order')
const router = new express.Router()


router.post('/order', async (req, res) => {
    const order = new Order({
        ...req.body
        //owner: req.user._id
    })
    try {
        order.orderNo = await Order.countDocuments() + 1
        await order.save()
        res.status(201).json({ status: 'success', message: 'Order placed for acceptance' })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


// router.get('/orders/accepted', async (req, res) => {
//     try {
//         const orders = await Order.find({ orderStatus: 'Accepted', owner: req.user._id })
//         res.status(200).json({ status: 'success', message: cartItems })
//     } catch (e) {
//         res.status(400).json({ status: 'error', message: e.message })
//     }
// })


// router.post('/remove-cart', async (req, res) => {
//     try {
//         const cartItem = await Order.findByIdAndDelete(req.body._id)
//         res.status(201).json({ status: 'success', message: cartItem })
//     } catch (e) {
//         res.status(400).json({ status: 'error', message: e.message })
//     }
// })


// router.post('/admin/remove-medicine', async (req, res) => {
//     try {
//         const registeredMedicine = await Order.findByIdAndDelete(req.body._id)
//         res.status(201).json({ status: 'success', message: registeredMedicine })
//     } catch (e) {
//         res.status(400).json({ status: 'error', message: e.message })
//     }
// })

module.exports = router