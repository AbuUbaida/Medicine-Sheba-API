const express = require('express')
const Order = require('../models/order')
const auth = require('../middlewares/auth')
const router = new express.Router()


router.post('/order', auth, async (req, res) => {
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


router.get('/orders/accepted', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Accepted', owner: req.user._id })

        if (orders.length == 0) {
            return res.status(409).json({ status: 'error', message: 'You do not have any accepted order' })
        }

        res.status(200).json({ status: 'success', message: orders })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.get('/orders/pending', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Pending', owner: req.user._id })

        if (orders.length == 0) {
            return res.status(409).json({ status: 'error', message: 'You do not have any pending order' })
        }

        res.status(200).json({ status: 'success', message: orders })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.get('/orders/delivered', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Delivered', owner: req.user._id })

        if (orders.length == 0) {
            return res.status(409).json({ status: 'error', message: 'You do not have any delivered order' })
        }

        res.status(200).json({ status: 'success', message: orders })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.get('/orders/:orderNo', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ orderNo: req.params.orderNo, owner: req.user._id }).populate('medicineId').exec()

        if (!order) {
            res.status(404).json({ status: 'error', message: 'Order not found' })
        }

        const orderNo = order.orderNo
        // const customerName = order.owner.userName
        //const address = order.owner.address
        const medicineDetails = order.orderDetails
        const dateTime = moment(order.createdAt).format('DD/MM/YYYY hh:mm a')
        const subTotal = order.subTotal
        
        const response = { orderNo, customerName, medicineDetails, dateTime, subTotal }

        res.status(200).json({ status: 'success', message: response })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


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