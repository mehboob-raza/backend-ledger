const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const emailService = require('../services/email.service')
/*
    -- user register controller
    -- /api/auth/register
*/
async function userRegister(req, res) {
    const { email, name, password } = req.body
    const isExistingUser = await userModel.findOne({
        email: email
    })
    if (isExistingUser) {
        return res.status(422).json({
            message: "User already Exists with this Email",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    })
    res.cookie('token', token)

    res.status(201).json({
        user, token
    })

    await emailService.sendRegistrationEmail(user.email, user.name)
}

//POST --->  api/auth/login
async function userLogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or Password is INVALID"
        });
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or Password is INVALID"
        });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    })
    res.cookie('token', token)

    res.status(200).json({
        user, token
    })
}

module.exports = { userRegister, userLogin }