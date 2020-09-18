const express = require('express')
const Cart = require('../models/cart')
const auth = require('../middlewares/auth')
const router = new express.Router()


router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find({ owner: req.user._id })
        res.status(200).json({ status: 'success', message: cartItems })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/add-cart', async (req, res) => {
    const cart = new Cart({
        ...req.body,
        owner:req.user._id
    })
    try {
        await cart.save()
        res.status(201).json({ status: 'success', message: 'Items added to cart' })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/remove-cart', async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.body._id)
        res.status(201).json({ status: 'success', message: cartItem })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/admin/remove-medicine', async (req, res) => {
    try {
        const registeredMedicine = await Cart.findByIdAndDelete(req.body._id)
        res.status(201).json({ status: 'success', message: registeredMedicine })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


// user registration; user information will be given through body;
// authentication token will be provided to the registered user to use the features 
router.post('/signup', async (req, res) => {
    const user = new User({
        ...req.body
    })

    try {
        const registeredUser = await User.find({ phone: req.body.phone })

        if (registeredUser.length != 0) {
            return res.status(409).json({ status: 'error', message: 'Phone number already registered' })
        }

        await user.save()
        res.status(201).json({ status: 'success', message: user })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // toJSON is called into user implicitly which returns the selected properties
        res.json({ status: 'success', message: { user, token } })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).json({ status: 'success', message: 'Logged out from current device' })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
})


// // Logout user from all session
// router.post('/users/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = []
//         await req.user.save()
//         res.json({ status: 'success', message: 'Logged out from all devices' })
//     } catch (e) {
//         res.status(500).json({ status: 'error', message: e.message })
//     }
// })


module.exports = router