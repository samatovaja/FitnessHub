import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Calorie from './components/Calorie'
import CalorieTrackingForm from './components/CalorieTracker'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import WorkoutSchedule from './components/WorkoutSchedule'
import WorkoutSearch from './components/Search2'

function App(){
  return(
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='search' element={<WorkoutSearch/>}></Route>
          <Route path='/calorie' element={<Calorie/>}></Route>
          <Route path='/trackCalories' element={<CalorieTrackingForm/>}></Route>
          <Route path='/workoutSchedule' element={<WorkoutSchedule/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App