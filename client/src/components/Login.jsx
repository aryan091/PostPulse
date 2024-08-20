import React, { useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BG_URL } from '../utils/constants';
import { checkValidData } from '../utils/validate';
import { useAuth } from '../hooks/useAuth'; // Import the custom hook

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const { register, login, loading, errorMessage } = useAuth(); // Use the custom hook

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

    if (message) {
      setErrorMessage(message);
      return;
    }

    if (!isSignInForm) {
      await register(name.current.value, email.current.value, password.current.value);
    } else {
      await login(email.current.value, password.current.value);
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

      <form onSubmit={(e) => e.preventDefault()} className="relative p-10 w-full md:w-3/12 my-28 bg-black  md:my-16 mx-auto z-20 right-0 left-0 text-white bg-opacity-50 rounded-lg">
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

        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick} disabled={loading}>
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
  );
}

export default Login;
