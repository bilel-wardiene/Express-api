const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student')

router.post('/addStudent',studentController.addStudent)
router.get('/getStudents',studentController.getAllStudents)
router.get('/getStudent/:id',studentController.verifyToken,studentController.getOneStudnet)
router.put('/updateStudent/:id',studentController.verifyToken,studentController.updateStudent)
router.delete('/deleteStudent/:id',studentController.deleteStudent)

module.exports = router;