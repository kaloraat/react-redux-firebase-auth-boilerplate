import React, { Fragment } from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <ToastContainer />
      {children}
    </Fragment>
  );
};

export default Wrapper;
