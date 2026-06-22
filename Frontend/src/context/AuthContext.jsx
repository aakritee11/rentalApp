import { useContext,createContext, useState  } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [token, setToken]= useState(localStorage.getItem('token'));
    const [user, setUser] = useState(()=>{
      const raw = localStorage.getItem('user');
    try{
        return raw? JSON.parse(raw) : null;
    }catch(e){
        console.log(e);
    }
    })
    
    const login = (userData, tokenData)=>{
        localStorage.setItem('token', tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(tokenData);
        setUser(userData);
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }
return(
    <AuthContext.Provider value={{token, user, login, logout}}>
      {children}
    </AuthContext.Provider>
)



}

export function useAuth(){
    return useContext(AuthContext);
}