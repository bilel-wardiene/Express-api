const mongoose = require('mongoose')
const joi = require('joi')                  // validation of inputs

const schemaValidator = joi.object({
    firstname: joi.string().alphanum().min(3).max(20).required(),
    lastname: joi.string().alphanum().min(3).max(20).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: joi.number().required(),
    phone: joi.number().required(),
})


var student = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    age: Number,
    phone: Number,
})

var Student = mongoose.model('student', student)
module.exports = { schemaValidator, Student };