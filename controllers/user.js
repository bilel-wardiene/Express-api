const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


var url = 'mongodb://127.0.0.1:27017/university'
exports.register = async function (req, res) {
    try {
        await mongoose.connect(url)
        const { username, email, password } = req.body
        const exist = await User.findOne({ email }).exec()
        if (exist) {
            mongoose.disconnect()
            res.status(404).json({ error: 'user exist' })
        }
        else {
            var hpassword = await bcrypt.hash(password, 10)
            let user = new User({
                username: username,
                email: email,
                password: hpassword
            })
            await user.save()
            res.json(user)
        }


    }
    catch (error) {
        mongoose.disconnect()
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        mongoose.disconnect()
    }
}
var privateKey = "flmsmaprpr576sdmùdùdùdù"
exports.login = async function(req,res){
    try{
        await mongoose.connect(url)
        const {email,password} = req.body
        const user = await User.findOne({email}).exec()
        if(!user){
            res.status(404).json({ error: 'user not exist' })
            return;
        }
        const passwordMatch =await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            res.status(404).json({ error: 'incorrect password' })
            return;
        }

        const token = jwt.sign({id: user._id},privateKey,{
            expiresIn:'1h',
        })
        res.status(200).json({token:token });


    }
    catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally{
        mongoose.disconnect()
    }
}