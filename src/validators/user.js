const validate = require('mongoose-validator')

//validates the user fields
const userValidator = {
    nameValidator: [
        validate({
            validator: 'isLength',
            arguments: [3, 50],
            message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: 'Name should contain alpha-numeric characters only',
        })
    ],
    phoneValidator: [
        validate({
            validator: 'isMobilePhone',
            arguments: ['bn-BD'],
            message: 'Invalid phone number'
        })
    ],
    emailValidator:[
        validate({
            validator:'isEmail',
            passIfEmpty: true,
            message:'Invalid email address'
        })
    ]
}

module.exports = userValidator