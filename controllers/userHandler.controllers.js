const User = require('../models/Users')

exports.createUsers = async (req,res,next) =>{
    console.log(req.body)
    res.send('create users')
}