const Student = require('../models/student');
const bcrypt = require('bcrypt');

class StudentController {

    async registerStudent(req, res) {
        try {
            const { Stnm, Stemail, Stpwd, Stdept, Stmarks } = req.body;
            let student = await Student.findOne({ Stemail });
            if (student) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            student = new Student({ Stnm, Stemail, Stpwd, Stdept, Stmarks });
            await student.save();
            res.status(201).json({ message: 'Student registered successfully', student });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async loginStudent(req, res) {
        try {
            const { Stemail, Stpwd } = req.body;
            const student = await Student.findOne({ Stemail });
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            const isMatch = await student.comparePassword(Stpwd);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful', student });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async searchStudent(req, res) {
        try {
            const { Stnm, Stdept } = req.body;
            const student = await Student.findOne({ Stnm, Stdept });
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json(student);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updateStudent(req, res) {
        try {
            const { _id } = req.params;
            const { Stnm, Stdept, Stmarks } = req.body;
            let student = await Student.findById(_id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            student.Stnm = Stnm || student.Stnm;
            student.Stdept = Stdept || student.Stdept;
            student.Stmarks = Stmarks || student.Stmarks;
            student.Stgrade = student.calculateGrade();

            await student.save();
            res.status(200).json({ message: 'Student updated successfully', student });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteStudent(req, res) {
        try {
            const { _id } = req.params;
            const student = await Student.findByIdAndDelete(_id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async findStudentsByGrade(req, res) {
        try {
            const { Stgrade } = req.body;
            const students = await Student.find({ Stgrade });
            if (!students.length) {
                return res.status(404).json({ message: 'No students found with this grade' });
            }
            res.status(200).json(students);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new StudentController();