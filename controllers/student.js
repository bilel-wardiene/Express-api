const mongoose =require('mongoose')
const {schemaValidator,Student} = require('../models/student')

const jwt = require('jsonwebtoken')


var url = 'mongodb://127.0.0.1:27017/university'


var privateKey = "flmsmaprpr576sdmùdùdùdù"

exports.verifyToken = async function (req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(404).json({ msg: 'access rejected' });
    } 
    try {
        jwt.verify(token, privateKey);
        next();
    } catch (error) {
        return res.status(404).json({ msg: error });
    }
}


exports.addStudent = async function(req,res){
    try{
        await mongoose.connect(url)
        const {firstname,lastname,email,age,phone} = req.body
        
        const student = await Student.findOne({email}).exec()
        let validation = await schemaValidator.validateAsync({firstname:firstname,lastname:lastname,email:email,age:age,phone:phone})
        if(validation.error){
            res.json(validation.error.details[0].message)
            return;
            
        }
        
        if(!student){
            let student = new Student ({
                firstname:firstname,
                lastname:lastname,
                email:email,
                age:age,
                phone:phone,
            })
            await student.save()
            res.json(student);
        } else{
             // Handle the case where the student already exists
             res.status(404).json({ error: 'Student already exists' });
        }

    }
    catch(err){
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally{
        mongoose.disconnect()
    }
}

exports.getAllStudents = async function (req,res){
    try{
        await mongoose.connect(url)
        const students = await Student.find().exec()
        res.json(students)

    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
    finally{
        mongoose.disconnect()
    }
}

exports.getOneStudnet = async function (req,res){
    try{
        await mongoose.connect(url)
        const student = await Student.findById(req.params.id).exec()
        if(!student){
            res.status(404).json({error : 'invalid student'})
        }
        else{
            res.json(student)
        }

    }
    catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
    finally{
        mongoose.disconnect()
    }
}

exports.updateStudent = async function(req,res){
    try{
        await mongoose.connect(url)
        const{firstname,lastname,email,age,phone} = req.body
        const student = await Student.findById(req.params.id).exec()
        let validation = await schemaValidator.validateAsync({firstname:firstname,lastname:lastname,email:email,age:age,phone:phone})
        if(validation.error){
            res.json(validation.error.details[0].message)
            return;
            
        }
        if(!student){
            res.status(404).json({error : 'invalid student'})
        }
        else{
            student.firstname = firstname,
            student.lastname = lastname,
            student.email = email,
            student.age = age,
            student.phone = phone
            await student.save()
        }
        res.json(student)
        

    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})

    }
    finally{
        mongoose.disconnect()
    }
}


exports.deleteStudent = async function(req,res){
    try{
        await mongoose.connect(url)
       const student = await Student.findByIdAndDelete(req.params.id)
       if(!student){
        mongoose.disconnect()
        res.status(404).json({error : 'invalid student'})
       }
       else{
        res.json(student)
       }

    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'})

    }
    finally{
        mongoose.disconnect()
    }
}