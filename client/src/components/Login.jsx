import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BG_URL , LOADING_STYLE} from '../utils/constants';
import { checkValidData } from '../utils/validate';
import { useAuth } from '../hooks/useAuth'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners'; 
import { FaUpload } from "react-icons/fa"; 



const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const avatar = useRef(null); // Ref for avatar file input

  const [selectedFileName, setSelectedFileName] = useState(''); // State to hold the file name

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name); // Set the file name to state
    }
  };


  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    // Set the form type based on location state
    if (location.state && location.state.defaultSignIn !== undefined) {
      setIsSignInForm(location.state.defaultSignIn);
    }
  }, [location.state]);

  const { register, login, loading } = useAuth();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(''); // Clear error message when toggling
  };

  const handleButtonClick = async () => {
    let message;
    if (isSignInForm) {
      message = checkValidData(null, email.current.value, password.current.value, isSignInForm);
    } else {
      message = checkValidData(name.current.value, email.current.value, password.current.value, isSignInForm);
    }
  
    if (message) {
      setErrorMessage(message);
      return;
    }
  
    setErrorMessage(''); // Clear any previous error message
  
    try {
     
  
  
      if (isSignInForm) {
        console.log('Signing in...');
        console.log(email.current.value, password.current.value);
        await login(email.current.value, password.current.value);
      } else {
        const formData = new FormData();
        formData.append('name', name?.current?.value);
        formData.append('email', email.current.value);
        formData.append('password', password.current.value);
        
        if (avatar.current && avatar.current.files[0]) {
          formData.append('avatar', avatar.current.files[0]); // Add avatar to form data
          console.log(formData.get('avatar')); // Should log the File object

        } else {
          setErrorMessage('Avatar is required.');
          return;
        }
        await register(formData); // Pass formData to the register function
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 w-full h-full">
        <img
          src={BG_URL}
          alt="Bg-Image"
          className="object-cover w-full h-full"
          loading='lazy'
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="relative left-0 right-0 z-20 w-full p-4 mx-auto text-white bg-black bg-opacity-50 rounded-lg my-14 md:p-8 md:w-3/12 md:my-16">
        <h1 className="py-4 text-3xl font-bold">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>

        {!isSignInForm && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              ref={name}
              className="w-full p-4 my-4 bg-transparent border rounded-lg border-gray"
            />
           <label className="w-full p-4 my-4 bg-black bg-opacity-70 rounded-lg cursor-pointer flex items-center justify-between text-white">
          <div className="flex items-center w-1/2">
            <FaUpload className="mr-2" />
            Choose File
          </div>
          <span className="ml-2 text-gray-300 line-clamp-1 w-1/2">
            {selectedFileName || 'No file chosen'}
          </span>
          <input
            type="file"
            ref={avatar} // Avatar input
            className="hidden"
            accept="image/*"
            onChange={handleFileChange} // Handle file selection
          />
        </label>

          </>
        )}
        <input
          type="text"
          placeholder="Email"
          ref={email}
          className="w-full p-4 my-4 bg-transparent border rounded-lg border-gray"
        />

        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="w-full p-4 my-4 bg-transparent border rounded-lg border-gray"
        />

        {errorMessage && <p className="py-2 font-semibold text-center text-red-500">{errorMessage}</p>}

        <button className="w-full p-4 my-6 bg-red-700 rounded-lg" onClick={handleButtonClick} disabled={loading}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        {loading && (
          <PropagateLoader
            color="#ffffff"
            cssOverride={LOADING_STYLE}
          />
        )}

        <p className="py-4 text-neutral-300">
          {isSignInForm ? 'New to VerseVault?' : 'Already have an account?'}{' '}
          <span className="font-semibold text-white cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? 'Sign Up Now' : 'Sign In'}.
          </span>
        </p>
      </form>

      <Footer />
    </div>
  );
}

export default Login;
