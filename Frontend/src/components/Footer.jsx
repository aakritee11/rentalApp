import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const toTop = ()=>{
    window.scrollTo({top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer style={{
      backgroundColor: '#1a1a2e',
      color: 'white',
      padding: '2rem',
      marginTop: '2rem'
    
    }}>
      <div className="footer-container">
       
        <p className="btn-to-top" onClick={toTop}>Back to top⬆️</p>
        <div className="footer-section">
          <h3>RentNepal</h3>
          <p>Find your perfect rental property!</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} RentNepal. All rights reserved.</p>
      </div>
    </footer>
  );
}