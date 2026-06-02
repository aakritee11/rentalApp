import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import '../styles/Dashboard.css';



export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    type: 'single',
    contactPhone: '',
    photos: []
  });

  // redirect if not owner
  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/');
    }
    fetchMyRooms();
  }, []);

  const fetchMyRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // filter only this owner's rooms
      const myRooms = response.data.filter(room => room.owner._id === user.id);
      setRooms(myRooms);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/rooms', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Room posted successfully!');
      setError('');
      setFormData({
        title: '',
        description: '',
        price: '',
        city: '',
        type: 'single',
        contactPhone: '',
        photos: []
      });
      fetchMyRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Room deleted successfully!');
      fetchMyRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Owner Dashboard</h2>
      <p className="welcome">Welcome, {user?.name}</p>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* post room form */}
      <div className="dashboard-form">
        <h3>Post a New Room</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Rs/month)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="single">Single</option>
                <option value="shared">Shared</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="btn">Post Room</button>
        </form>
      </div>

      {/* my rooms list */}
      <div className="my-rooms">
        <h3>My Rooms</h3>
        {loading ? (
          <p>Loading...</p>
        ) : rooms.length === 0 ? (
          <p>You have not posted any rooms yet</p>
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="my-room-card">
              <div className="my-room-info">
                <h4>{room.title}</h4>
                <p>{room.city} — {room.type} — Rs. {room.price}/month</p>
              </div>
              <div className="my-room-actions">
                <button
                  className="btn-view"
                  onClick={() => navigate(`/rooms/${room._id}`)}
                >
                  View
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(room._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}




