import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
 const{user} = useAuth(); 
 if(!user){
    return <h1>You aren't logged in</h1>
 }
 const isOwner = user?.role === 'owner';

  return (
    <div style={{ padding: '2rem' }}>
      {isOwner ? (
        <h1>You are an Owner</h1>
      ) : (
        <h1>You are a Renter</h1>
      )}
      <h3>Profile page under maintenance.</h3>
    </div>
  );
}