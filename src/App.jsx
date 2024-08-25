import React from "react";
import { RouterProvider } from "react-router-dom";
import Routes from "./configs/Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>
      <RouterProvider router={Routes} />
      <ToastContainer />
    </>
  );
};

export default App;
