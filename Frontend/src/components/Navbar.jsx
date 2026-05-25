import {Link} from "react-router-dom";

export default function Navbar(){
const token= localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));


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
           <Link to='/' style={{color:'white', fontSize:'1.5rem', fontWeight:'bold'}}>
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
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}>Logout</span>
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