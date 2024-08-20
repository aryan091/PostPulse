import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../slice/userSlice';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setId, setUsername, setIsUserLoggedIn } = useContext(UserContext);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/register`;
      const response = await axios.post(reqUrl, { name, email, password });
      toast.success(`${response.data.data.name} Registered Successfully!`);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
      const response = await axios.post(reqUrl, { email, password });
      localStorage.setItem("token", response.data.data.token);

      dispatch(addUser({
        userInfo: response.data.data.userData,
        token: response.data.data.token,
      }));

      setId(response.data.data.userData._id);
      setUsername(response.data.data.userData.name);
      setIsUserLoggedIn(true);

      toast.success(`${response.data.data.userData.name} Logged In Successfully!`);
      setLoading(false);
      setErrorMessage(null);
      navigate('/posts');
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Login failed");
      setErrorMessage(error?.response?.data?.message || "Login failed");
    }
  };

  return { register, login, loading, errorMessage };
};
