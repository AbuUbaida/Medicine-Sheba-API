const express = require('express')
const moment = require('moment')
const Order = require('../../models/order')
const auth = require('../middlewares/auth')
const router = new express.Router()


router.get('/admin/orders/pending', async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Pending' }).populate('owner').exec()

        const response = []
        orders.forEach(order => {
            const orderId = order._id
            const ownerId = order.owner._id
            const orderNo = order.orderNo
            const customerName = order.owner.userName
            const dateTime = moment(order.createdAt).format('DD/MM/YYYY hh:mm a')
            const subTotal = order.subTotal
            const obj = { orderId, ownerId, orderNo, customerName, dateTime, subTotal }
            response.push(obj)
        })

        res.status(200).json({ status: 'success', message: response })
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