import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
import '../styles/RoomDetail.css';
import { deleteRoom } from '../services/roomServices';

function RoomDetail() {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
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

    const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/rooms/${id}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Room updated successfully!');
      setError('');
      setShowEditModal(false);
      fetchRoom();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room');
    } finally {
      setEditLoading(false);
    }
  };

   const handleDelete = async () => {
  if (!window.confirm("Delete this room?")) return;

  try {
    await deleteRoom(room._id, token);

    navigate("/");
  } catch (err) {
    console.log(err);
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
              <button className="btn-edit" onClick={() => setShowEditModal(true)}>
                ✏️ Edit
              </button>
              <button className="btn-delete" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          )}

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