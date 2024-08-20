import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import { checkValidData } from '../utils/validate';
import { addUser } from '../slice/userSlice';
import Footer from './Footer';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const token = localStorage.getItem('token');

  const{ setId , setUsername, setIsUserLoggedIn} = useContext(UserContext)

useEffect(() => {
  if (token) {
    navigate('/posts');
  }
  else{
    navigate('/');
  }
}, [token, navigate]);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = async () => {
    let message;
    if (isSignInForm) {
      message = checkValidData(null, email.current.value, password.current.value, isSignInForm);
    } else {
      message = checkValidData(name.current.value, email.current.value, password.current.value, isSignInForm);
    }

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up
      try {
        setLoading(true);
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/register`;
        const response = await axios.post(reqUrl, {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value
        });

        toast.success(`${response.data.data.name} Registered Successfully!`);
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
        setIsSignInForm(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    } else {
      // Sign In
      try {
        setLoading(true);
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
        const response = await axios.post(reqUrl, {
          email: email.current.value,
          password: password.current.value
        });

        localStorage.setItem("token", response.data.data.token);
        dispatch(addUser({
          userInfo: response.data.data.userData, 
          token: response.data.data.token
        }));

        setId(response.data.data.userData._id)
        setUsername(response.data.data.userData.name)
        setIsUserLoggedIn(true)

        toast.success(`${response.data.data.userData.name} Logged In Successfully!`);
                setLoading(false);
        navigate('/posts');
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        setErrorMessage(error?.response?.data?.message);
      }
    }
  };

  return (
    <>

<div className="min-h-screen w-full overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 w-full h-full">
      <img
          src={BG_URL}
          alt="Bg-Image"
          className="w-full h-full object-cover"
          />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className={`relative p-10 w-full md:w-3/12 my-28 bg-black  md:my-16 mx-auto z-20 right-0 left-0 text-white bg-opacity-50 rounded-lg`}>
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="p-4 my-4 w-full bg-transparent border border-gray rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          ref={email}
          className="p-4 my-4 w-full bg-transparent border border-gray rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-4 my-4 w-full bg-transparent border border-gray rounded-lg"
        />

        <p className="text-red-500 text-center font-semibold py-2">{errorMessage}</p>

        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        <p className="text-neutral-300 py-4">
          {isSignInForm ? 'New to VerseVault?' : 'Already have an account?'}{' '}
          <span className="text-white font-semibold cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? 'Sign Up Now' : 'Sign In'}.
          </span>
        </p>
      </form>


      <Footer />


    </div>


  

    </>
  );
}

export default Login;
