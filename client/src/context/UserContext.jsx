import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [email , setEmail] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [avatar , setAvatar] = useState(null);

  const [loading, setLoading] = useState(true);



  // Run this effect only when isUserLoggedIn changes to true
  useEffect(() => {
    const getUser = async () => {
  
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
          setUsername(response.data.data.name);
          setId(response.data.data._id);
          setIsUserLoggedIn(true);
          setEmail(response.data.data.email);
          setAvatar(response.data.data.avatar);

        }
      } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getUser();
  }, []);
  


  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isUserLoggedIn, setIsUserLoggedIn, loading , setLoading , email , setEmail , avatar , setAvatar }}>
            {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
