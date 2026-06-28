import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "../styles/Navbar.css";

export default function Navbar(){
  const {token, user, logout} = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


const handleLogout = ()=>{
  logout();
  navigate('/');
  setIsOpen(false);
}

const closeMenu = ()=>{
  setIsOpen(false);
}

    return(
      <nav style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#1a1a2e',
        color: 'white',
        position: 'relative'
      }}>
        
          <div className="logo">
           <Link  to='/' style={{color:'white', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none'}}>
           RentNepal
           </Link>
           <p>Skip the Broker, Find Home</p>
          </div>
         <button className="hamburger-btn"
         onClick={()=> setIsOpen(!isOpen)}
         aria-label="Toggle menu">
          {isOpen ? <CloseIcon/> : <MenuIcon/>}
         </button>
          

          <div
          className={`nav-items ${isOpen ? 'active' : ''}`}
          
         
          >
            <Link 
            to='/' 
            onClick={closeMenu}
            style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            
             {token ? (
          // logged in
          <>
        
            {user?.role === 'owner' && (
              <Link 
              to="/dashboard" 
              style={{ color: 'white', textDecoration: 'none' }}
              onClick={closeMenu}
              >Dashboard</Link>
            )}

            <span style={{ color: 'white', cursor: 'pointer' }} onClick={handleLogout}>Logout</span>
            
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' } } onClick={closeMenu}>Profile</Link> 

          </>
        ) : (
          // not logged in
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }} onClick={closeMenu}>Register</Link>
          </>
        )}
          </div>
       </nav>
    )
}