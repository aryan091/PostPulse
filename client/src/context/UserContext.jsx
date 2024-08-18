import { createContext, useState, useEffect } from "react";
import axios from 'axios';

 const UserContext = createContext({});

 function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
          setIsUserLoggedIn(true);
          setUsername(response.data.data.name);
          setId(response.data.data._id);
        } else {
          setIsUserLoggedIn(false);
          setUsername(null);
          setId(null);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error.response ? error.response.data.message : error.message);
      }
      finally {
        setLoading(false);
      }
    };

    getUser();
  }, []); // Ensure this dependency array is empty

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isUserLoggedIn, setIsUserLoggedIn ,  loading  }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContextProvider, UserContext };