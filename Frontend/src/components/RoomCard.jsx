import '../styles/RoomCard.css';

export default function RoomCard ({room, onClick}){
    return(
        <div className="room-card" onClick={onClick}>
            <div className="room-image">
                {room.photos?.length >0? (
                    <img src={room.photos[0]} alt={room.title} />
                ): (
                    <div className="no-image">No Image</div>
                )}
            </div>
            <div className="room-info">
                <h3>{room.title}</h3>
                <p className="room-city ">{room.city}</p>
                <p className="room-type">{room.type}</p>
                <p className="room-price">Rs. {room.price}/month</p>
            </div>
        </div>
    )
}