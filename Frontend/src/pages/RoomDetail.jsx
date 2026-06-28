import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import '../styles/RoomDetail.css';
import { deleteRoom } from '../services/roomServices';
import server from '../environment';

function RoomDetail() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [editFormData, setEditFormData] = useState({});
  const [isInterested, setIsInterested] = useState(false);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
  
  if (user && room?.inquiries?.some(i => i.renter === user.id)) {
    setIsInterested(true);
  }
}, [room, user]);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${server}/api/rooms/${id}`);
      setRoom(response.data);
        setEditFormData({
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        city: response.data.city,
        type: response.data.type,
        contactPhone: response.data.contactPhone,
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

    const isOwner = user && room && user.id === room.owner._id;

  const handleContact = () => {
    if (!user) {
      navigate('/login');
    }
  };

 

  const handleEdit =()=>{
    navigate('/dashboard' , {state: {roomId: id}})
  }
   const handleDelete = async () => {
  if (!window.confirm("Delete this room?")) return;

  try {
    await deleteRoom(room._id, token);

    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

const handleInterest = async () => {
  if (!user) {
    navigate('/login');
    return;
  }

  try {
    await axios.post(`${server}/api/inquiries`, 
      { roomId: id, message: '' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setIsInterested(true);
    alert('Interest submitted! Owner will see your profile.');
  } catch (err) {
    alert(err.response?.data?.message || 'Error submitting interest');
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

           {/* Only for owner */}
         {isOwner && (
            <div className="owner-actions">
              <button className="btn-edit" onClick={handleEdit}>
                ✏️ Edit
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          )}

      
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
          )}{!isOwner && (
             <button 
              className="btn-interest" 
              onClick={handleInterest}
              disabled={isInterested}
          >
               {isInterested ? '✓ Already Interested' : '❤️ I\'m Interested'}
         </button>
          )}
         
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;