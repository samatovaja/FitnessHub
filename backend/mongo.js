const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/another-try')
.then(()=>{
    console.log('mongodb connected')
})
.catch(()=> {
    console.log('failed')
})


const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

const User = mongoose.model('users', UserSchema);
User.createIndexes();


const scheduleSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Monday: {
        type: String
    },
    Tuesday :{
        type: String
    },
   Wednesday: {
        type: String
    },
    Thursday: {
        type: String
    },
    Friday: {
        type: String
    },
    Saturday: {
        type: String
    },
    Sunday: {
        type: String
    }
  });
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  Schedule.createIndexes()

  module.exports = {
    Schedule,
    User
  }


