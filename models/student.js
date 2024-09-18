const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  Stnm: { type: String, required: true },
  Stemail: { type: String, required: true, unique: true },
  Stpwd: { type: String, required: true }, 
  Stdept: { type: String, required: true },
  Stmarks: { type: Number, required: true, max: 100 },
  Stgrade: { type: String } 
});


studentSchema.pre('save', async function (next) {
  if (!this.isModified('Stpwd')) return next();
  const salt = await bcrypt.genSalt(10);
  this.Stpwd = await bcrypt.hash(this.Stpwd, salt);
  next();
});


studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Stpwd);
};

studentSchema.methods.calculateGrade = function () {
  if (this.Stmarks >= 90) return 'A';
  if (this.Stmarks >= 75) return 'B';
  if (this.Stmarks >= 50) return 'C';
  if (this.Stmarks >= 35) return 'D';
  return 'FAIL';
};

studentSchema.pre('save', function (next) {
  this.Stgrade = this.calculateGrade();
  next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
