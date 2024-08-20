import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);



 
  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isUserLoggedIn, setIsUserLoggedIn, loading , setLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
