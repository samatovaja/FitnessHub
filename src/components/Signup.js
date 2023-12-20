import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import MainPic from '../pictures/5 Gründe mit dem Yoga-Training zu beginnen.jpeg'

function Signup() {

    const navigate = useNavigate()
    
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault()

        try{
            await axios.post('http://localhost:8000/signup',{
                name,email,password
            })
            .then(res=>{
                console.log({res})
                if(res.data.exists) {
                    alert('user already exists')
                }else if(!res.data.exists) {
                    localStorage.setItem("userData", JSON.stringify(res.data.userData[0]))
                    navigate('/home',{state: {id: name}})
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
    return (
        <div className='container'>
        <div className='login'>
            <h1>Signup</h1>
            <form action='POST'>
            <input type='text' onChange={(event)=> {setName(event.target.value)}} placeholder='Enter Your Name' />
                <input type='email' onChange={(event)=>{setEmail(event.target.value)}} placeholder='Enter Your Email' />
                <input type='password' onChange={(event)=>{setPassword(event.target.value)}} placeholder='Enter Your Password' />

                <input type="submit"
				onClick={handleSubmit}/>
            </form>

            <br />
            <p>OR</p>
            <br />
            <Link to='/'>Log In</Link>
        </div>  
        <img className='mainPic' src={MainPic}></img>
        </div>
         )
}
export default Signup