const express = require('express')
const { User } = require('./mongo')
const CalorieIntake = require('./mongo')
const { Schedule } = require('./mongo')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', cors(), (req, res)=> {

})

app.post('/', async(req, res)=> {
    const {email, password}= req.body

    try{
        const userExist = await User.findOne({email:email})

        if(userExist){
            res.json('User exist')
        }else{
            res.json('User does not exist')
        }
    }
    catch(event){
        res.json('problem')
    }
})

app.get('/signup', cors(), (req, res) => {

})
app.post('/signup', async(req, res)=> {
    const {name, email, password}= req.body

    const data = {
        name: name,
        email: email,
        password: password
    }

    try{
        const result = {}
        let userExist = await User.findOne({email:email})

        if (!userExist) {
          userExist =  await User.insertMany([data])
          result.exists = false;
        } else {
            result.exists = true;
        }

        console.log({userExist: userExist[0]})
        result.userData = userExist

        return res.json(result)
    }
    catch(event){

        res.json({event})
    }
})

app.get('/workoutSchedule/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const schedule = await Schedule.findOne({ userId });

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.json({ schedule });
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/workoutSchedule', async (req, res) => {
    const scheduleData = req.body.schedule;
    const userId = req.body.userId;
    console.log({body: req.body});
  
    try {
        const existingSchedule = await Schedule.findOne({ userId });
    
        if (!existingSchedule) {
          const newSchedule = new Schedule({ ...scheduleData, userId });
          const savedSchedule = await newSchedule.save();
          res.json({ message: 'Schedule received and saved successfully', schedule: savedSchedule });
        } else {
          existingSchedule.set(scheduleData);
          const savedSchedule = await existingSchedule.save();
          res.json({ message: 'Schedule received and updated successfully', schedule: savedSchedule });
        }
      } catch (error) {
        console.error('Error saving or updating schedule:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });
  

app.listen(8000, ()=>{
    console.log('Listening on port 8000')
})

