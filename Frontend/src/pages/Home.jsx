import { useEffect ,  useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import RoomCard from "../components/RoomCard";


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

    

    return(
        <>
        <div>
              home
        </div>
     
        </>
    )
}