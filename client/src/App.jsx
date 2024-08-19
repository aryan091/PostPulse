import React from "react";
import { Provider } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import store from "./store/store";
import Body from "./components/Body";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/UserContext";
import { BG_URL } from "./utils/constants";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
                  <UserContextProvider>

        <Provider store={store}>

            <Body />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />

        </Provider>
        </UserContextProvider>

    </>
  );
}

export default App;
