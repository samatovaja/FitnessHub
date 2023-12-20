import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../App.css'
import HomePic from '../pictures/Green aesthetic pic.jpeg'

function Home() {
    
    const location = useLocation();

  const navigate = useNavigate()


  const navigateToSignup = () => {
    navigate('/signup')
  }

  const navigateToLogin = () => {
    navigate('/')
  }


  const userDataString = localStorage.getItem('userData') || '{}';
  const userData = JSON.parse(userDataString);
  const name = userData.name;

  return (
    <div className='home-container'>
    
    <div className="homepage">
      <h1 className="welcome-heading">Welcome, {name}!</h1>
      <div className="links-container">
        <Link to="/search" className="nav-link">
          Workouts
        </Link>
        <Link to="/calorie" className="nav-link">
          Calorie Calculator
        </Link>
        <Link to="/workoutSchedule" className="nav-link">
          Workout Schedule
        </Link>
        <button onClick={navigateToSignup}>Back to Sign up</button>
        <button onClick={navigateToLogin}>Log out</button>
      </div>
    </div>
    <img className='homePic' src={HomePic}/>
    </div>
  );
}

export default Home;
