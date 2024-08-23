import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BG_URL } from '../utils/constants';
import { checkValidData } from '../utils/validate';
import { useAuth } from '../hooks/useAuth'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners'; 

const loadingSpinnerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  transform: "none"
}

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const avatar = useRef(null); // Ref for avatar file input

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
            <input
              type="file"
              ref={avatar} // Avatar input
              className="w-full p-4 my-4 bg-transparent border rounded-lg border-gray"
              accept="image/*"
            />
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
            cssOverride={loadingSpinnerStyles}
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
