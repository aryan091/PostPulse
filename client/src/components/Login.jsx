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
        await login(email.current.value, password.current.value);
      } else {
        await register(name.current.value, email.current.value, password.current.value);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 z-0 w-full h-full">
        <img
          src={BG_URL}
          alt="Bg-Image"
          className="w-full h-full object-cover"
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="relative p-10 w-full md:w-3/12 my-28 bg-black md:my-16 mx-auto z-20 right-0 left-0 text-white bg-opacity-50 rounded-lg">
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

        {errorMessage && <p className="text-red-500 text-center font-semibold py-2">{errorMessage}</p>}

        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick} disabled={loading}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>

        {loading && (
          <PropagateLoader
            color="#ffffff"
            cssOverride={loadingSpinnerStyles}
          />
        )}

        <p className="text-neutral-300 py-4">
          {isSignInForm ? 'New to VerseVault?' : 'Already have an account?'}{' '}
          <span className="text-white font-semibold cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? 'Sign Up Now' : 'Sign In'}.
          </span>
        </p>
      </form>

      <Footer />
    </div>
  );
}

export default Login;
