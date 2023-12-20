import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function WorkoutSchedule() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [schedule, setSchedule] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const userDataString = localStorage.getItem('userData') || '{}';
  const userData = JSON.parse(userDataString);
  const userId = userData.email;

  const url = `http://localhost:8000/workoutSchedule/${userId}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setSchedule(res.data.schedule);
    });
  }, [url]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/workoutSchedule', {
        schedule,
        userId: userData.email,
      });
      alert('Schedule saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleInputChange = (day, value) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: value,
    }));
  };

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  const renderSchedule = () => {
    return daysOfWeek.map((day) => (
      <div key={day} className="day-container">
        <p className="day-label">{day}</p>
        <input
          type="text"
          value={schedule[day]}
          onChange={(e) => handleInputChange(day, e.target.value)}
          className="schedule-input"
        />
      </div>
    ));
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-heading">Workout Schedule</h2>
      {renderSchedule()}
      <div className="button-container">
        <button onClick={handleSubmit} className="button">
          Save Schedule
        </button>
        <button onClick={navigateToHome} className="button">
          Back
        </button>
      </div>
    </div>
  );
}

export default WorkoutSchedule;
