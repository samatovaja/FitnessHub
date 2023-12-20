import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

function CalorieTrackingForm() {
    const navigate = useNavigate()
    const [email, setEmail] =useState('')
  const [date, setDate] = useState('');
  const [caloriesConsumed, setCaloriesConsumed] = useState('');
  const [details, setDetails] = useState('');


  async function handleSubmit(event){
    event.preventDefault()

    try{
        await axios.post('http://localhost:8000trackCalories/',{
            date, caloriesConsumed, details
        })
        .then(res=>{
            if(res.data=='User not found'){
                navigate('/home',{state: {id: email}})
            }else if(res.data=='User does not exist'){
                alert('Need to sign up first')
            }
        })
        .catch(event=>{
            alert('Wrong details')
            console.log(event)
        })
    }
    catch(event){
        console.log(event)
    }
}

//   const handleCalorieTracking = async () => {
//     try {
//       await axios.post('http://localhost:8000/trackCalories', {
//         date,
//         caloriesConsumed,
//         details,
//       });
//       // You can provide feedback to the user upon successful tracking
//     } catch (error) {
//       // Handle error cases
//     }
//   }

  return (
    <div>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" value={caloriesConsumed} onChange={(e) => setCaloriesConsumed(e.target.value)} />
      <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
      <button onClick={handleSubmit}>Track Calorie Intake</button>
    </div>
  );
}

export default CalorieTrackingForm;
