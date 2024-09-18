const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.post('/search', studentController.searchStudent);
router.put('/update/:_id', studentController.updateStudent);
router.delete('/delete/:_id', studentController.deleteStudent);
router.post('/find-by-grade', studentController.findStudentsByGrade);

module.exports = router;
