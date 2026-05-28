import { useEffect ,  useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import RoomCard from "../components/RoomCard";
import '../styles/Home.css';

export default function Home(){

    const [rooms,setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();


     const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(()=>{
       fetchRooms();
    },[])

    const handleSearch = async()=>{
      try{
        const response = await axios.get("http://localhost:5000/api/rooms",{
          params: {city: search, type: type}
        });
        setRooms(response.data);

      }catch(e){
        console.log(e);
      }
    }

    return(
         <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="search-select">
          <option value="">All Types</option>
          <option value="single">Single</option>
          <option value="shared">Shared</option>
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
        </select>
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="no-rooms">No rooms found</p>
      ) : (
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onClick={() => navigate(`/rooms/${room._id}`)}
            />
          ))}
        </div>
      )}
    </div>
    )
}