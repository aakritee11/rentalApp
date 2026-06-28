import { useState } from "react";
import{Link, useNavigate } from "react-router-dom";
import '../styles/Register.css';
import axios from "axios";
import server from "../environment";


export default function Register(){
const navigate = useNavigate();
const [formData, SetFormData] = useState({
    name : '',
    email: '',
    password: '',
    role: 'customer'
});
const [error, setError] = useState('');

const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name) && name.trim().length >= 2;
};

 const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Additional check: TLD must be at least 2 chars
    const parts = email.split('.');
    const hasValidTLD = parts[parts.length - 1].length >= 2;
    return regex.test(email) && hasValidTLD;
  };

const handleChange = (e) =>{
    SetFormData({...formData, [e.target.name]: e.target.value});

};

const handleSubmit = async(e)=>{
    e.preventDefault();
     if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if(!isValidName(formData.name)){
      setError('Name cannot bet symbols or numbers!');
      return;
    }

    try{
         await axios.post(`${server}/api/auth/register`,formData);
         navigate('/login');
    }catch (e){
        console.log(e);
    }
}
 return(
 <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>I am a</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <button type="submit" className="btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}



