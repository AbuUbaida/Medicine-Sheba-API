const express = require('express')
const moment = require('moment')
const auth = require('../../middlewares/authAdmin')
const Order = require('../../models/order')
const router = new express.Router()


router.get('/admin/orders/pending', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Pending' }).populate('owner').exec()

        if (orders.length == 0) {
            return res.status(404).json({ status: 'error', message: 'No pending order available' })
        }

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


router.get('/admin/orders/accepted', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Accepted' }).populate('owner').exec()

        if (orders.length == 0) {
            return res.status(400).json({ status: 'error', message: 'No accepted order available' })
        }

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


router.get('/admin/orders/delivered', auth, async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Delivered' }).populate('owner').exec()

        if (orders.length == 0) {
            return res.status(400).json({ status: 'error', message: 'No delivered order available' })
        }

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




//need to change; find owner:......
router.get('/admin/orders/:orderNo', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ orderNo: req.params.orderNo }).populate('owner medicineId').exec()

        if (!order) {
            res.status(404).json({ status: 'error', message: 'Order not found' })
        }

        const orderNo = order.orderNo
        const customerName = order.owner.userName
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


router.post('/admin/orders/change-status', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ orderNo: req.body.orderNo, orderStatus: req.body.statusFrom })

        if (!order) {
            res.status(404).json({ status: 'error', message: 'Order not found' })
        }

        order.orderStatus = req.body.statusTo
        order.save()
        res.status(200).json({ status: 'success', message: 'Order status changed' })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})

module.exports = router