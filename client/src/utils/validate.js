export const checkValidData = (name, email, password, isSignInForm) => {
    if (!isSignInForm) {
      const isNameValid = /^[a-zA-Z\s]{2,}$/.test(name);
      if (!isNameValid) return "Full Name is not valid";
    }
  
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
      email
    );
  
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid";
  
    return null;
  };
  