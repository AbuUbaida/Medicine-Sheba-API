const express = require('express')
const User = require('../../models/admin/user')
const auth = require('../../middlewares/authAdmin')
const router = new express.Router()


// user registration; user information will be given through body;
// authentication token will be provided to the registered user to use the features
router.post('/admin/create-user', auth, async (req, res) => {
    const user = new User({
        ...req.body
    })

    try {
        const registeredUser = await User.find({ email: req.body.email })

        if (registeredUser.length != 0) {
            return res.status(409).json({ status: 'error', message: 'Admin already registered' })
        }

        await user.save()
        res.status(201).json({ status: 'success', message: user })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})


router.post('/admin/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // toJSON is called into user implicitly which returns the selected properties
        res.json({ status: 'success', message: { user, token } })
    } catch (e) {
        res.status(400).json({ status: 'error', message: e.message })
    }
})



router.post('/admin/logout', auth, async (req, res) => {
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


// Logout user from all session
router.post('/admin/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.json({ status: 'success', message: 'Logged out from all devices' })
    } catch (e) {
        res.status(500).json({ status: 'error', message: e.message })
    }
})


module.exports = router