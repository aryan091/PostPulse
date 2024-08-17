import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer, Bounce } from 'react-toastify';
import store from './store/store';
import Body from './components/Body';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
