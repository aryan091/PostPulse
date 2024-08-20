import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUser = (userId) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        setUser({
          name: response.data.data.name,
          email: response.data.data.email,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading is false after fetch attempt
      }
    };

    getUserDetails();
  }, [userId]);

  return { user, loading };
};

export default useFetchUser;
