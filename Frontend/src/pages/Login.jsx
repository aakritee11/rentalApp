import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import '../styles/Register.css';
import axios from "axios";


export default function Login (){
    const navigate = useNavigate();
    const {login} = useAuth();

    const [formData, setFormData] = useState({
         email: '',
         password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
       const response= await axios.post('http://localhost:5000/api/auth/login', formData)
      //  console.log(response.data.token);
       const data = await response.data;

       if(data.token){
        login(data.user, data.token);
        navigate('/');
       }
      }catch(e){
        console.log(e);
      }
    }

    return(
        <>
         <div className="login-container">
            <div className="login-box">
            <h2>Login</h2>
            
            {error && <p className="error">{error}</p>}

           <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn">Login</button>
           </form>
           <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        </div>
         </div>
        </>
    )
}