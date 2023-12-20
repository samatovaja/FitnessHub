import React, {  useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'
import MainPic from '../pictures/5 Gründe mit dem Yoga-Training zu beginnen.jpeg'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event){
        event.preventDefault()

        try{
            await axios.post('http://localhost:8000/',{
                email,password
            })
            .then(res=>{
                if(res.data==='User exist'){
                    navigate('/home',{state: {email: email}})
                }else if(res.data==='User does not exist'){
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
    return (
        <div className='container'>
        <div className='login'>
        <h1>Login</h1>
        <form action='POST'>
            <input type='email' onChange={(event)=>{setEmail(event.target.value)}} placeholder='Enter Your Email' />
            <input type='password' onChange={(event)=>{setPassword(event.target.value)}} placeholder='Enter Your Password' />

            <input type='submit' onClick={handleSubmit}/>
        </form>

        <br />
        <p>OR</p>
        <br />
        <Link to='/signup'>Sign Up First</Link>
    </div>   
    <img className='mainPic' src={MainPic}/> 
    </div>)
        
}
export default Login