import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/RoomDetail.css';

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
      setRoom(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleContact = () => {
    if (!user) {
      navigate('/login');
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!room) return <p className="loading">Room not found</p>;

  return (
    <div className="detail-container">

      {/* photos */}
      <div className="detail-photos">
        {room.photos?.length > 0 ? (
          room.photos.map((photo, index) => (
            <img key={index} src={photo} alt={room.title} />
          ))
        ) : (
          <div className="no-image">No Photos Available</div>
        )}
      </div>

      {/* room info */}
      <div className="detail-info">
        <h2>{room.title}</h2>
        <p className="detail-city">📍 {room.city}</p>
        <p className="detail-type">Type: {room.type}</p>
        <p className="detail-price">Rs. {room.price}/month</p>
        <p className="detail-description">{room.description}</p>

        {/* owner contact - only shown after login */}
        <div className="contact-section">
          {user ? (
            <div className="owner-info">
              <h3>Owner Details</h3>
              <p>Name: {room.owner?.name}</p>
              <p>Email: {room.owner?.email}</p>
              {room.contactPhone && <p>Phone: {room.contactPhone}</p>}
            </div>
          ) : (
            <div className="contact-prompt">
              <p>Login to see owner contact details</p>
              <button className="btn" onClick={handleContact}>
                Login to Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;