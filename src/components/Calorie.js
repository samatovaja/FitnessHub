import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Calorie() {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [desiredWeight, setDesiredWeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState('sedentary');

  const handleCurrentWeightChange = (e) => {
    setCurrentWeight(parseFloat(e.target.value));
  };

  const handleDesiredWeightChange = (e) => {
    setDesiredWeight(parseFloat(e.target.value));
  };

  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };
  function calculateCalorieNeeds(currentWeight, desiredWeight, activityLevel) {
    // Constants for calorie calculation (Harris-Benedict equation)
    const BMR_MALE = 88.362;
    const BMR_FEMALE = 447.593;
    const WEIGHT_MULTIPLIER = 13.397;
    const HEIGHT_MULTIPLIER = 4.799;
    const AGE_MULTIPLIER = 5.677;

    // Calculate Basal Metabolic Rate (BMR)
    const gender = 'male'; // Change to 'female' for female calculations
    const bmr =
      gender === 'male'
        ? BMR_MALE + WEIGHT_MULTIPLIER * currentWeight + HEIGHT_MULTIPLIER * 160 - AGE_MULTIPLIER * 30
        : BMR_FEMALE + WEIGHT_MULTIPLIER * currentWeight + HEIGHT_MULTIPLIER * 160 - AGE_MULTIPLIER * 30;

    // Calculate Total Daily Energy Expenditure (TDEE) based on activity level
    let tdee = 0;
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'lightlyActive':
        tdee = bmr * 1.375;
        break;
      case 'moderatelyActive':
        tdee = bmr * 1.55;
        break;
      case 'veryActive':
        tdee = bmr * 1.725;
        break;
      default:
        tdee = bmr;
    }

    // Calculate daily calorie intake needed to reach the desired weight
    const calorieIntake = tdee - 500; 

    return calorieIntake;
  }

  const calorieIntake = calculateCalorieNeeds(currentWeight, desiredWeight, activityLevel);

  return (
    <div className="calorie-container">
      <h1 className="calorie-heading">Calorie Calculator</h1>
      <form>
        <label className="form-label">
          Current Weight (lbs): <input type="number" onChange={handleCurrentWeightChange} className="calorie-input" />
        </label>
        <label className="form-label">
          Desired Weight (lbs): <input type="number" onChange={handleDesiredWeightChange} className="calorie-input" />
        </label>
        <label className="form-label">
          Activity Level:
          <select value={activityLevel} onChange={handleActivityLevelChange} className="calorie-select">
            <option value="sedentary">Sedentary</option>
            <option value="lightlyActive">Lightly Active</option>
            <option value="moderatelyActive">Moderately Active</option>
            <option value="veryActive">Very Active</option>
          </select>
        </label>
      </form>
      <div className="result-container">
        <p className="result-text">Calorie Intake Needed: {calorieIntake} calories/day</p>
        <button onClick={navigateToHome} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default Calorie;
