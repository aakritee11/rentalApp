import {useNavigate, Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar(){
  const {token, user, logout} = useAuth();
  const navigate = useNavigate();


const handleLogout = ()=>{
  logout();
  navigate('/');
}

    return(
      <nav style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#1a1a2e',
        color: 'white'
      }}>
        
          <div>
           <Link  to='/' style={{color:'white', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none'}}>
           RentNepal
           </Link>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            
             {token ? (
          // logged in
          <>
        
            {user?.role === 'owner' && (
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            )}

            <span style={{ color: 'white', cursor: 'pointer' }} onClick={() => {
              logout();
              navigate('/');
            }}>Logout</span>
            
            <Link style={{ color: 'white', textDecoration: 'none' }}>Profile</Link> 

          </>
        ) : (
          // not logged in
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
          </div>
       </nav>
    )
}