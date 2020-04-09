import React, { useState, Fragment } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleChange = e => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );
    // save user email in localstorage to be used later to complete registration
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="container p-5">
        {loading ? (
          <h4 className="text-danger">Loading..</h4>
        ) : (
          <h4>Register</h4>
        )}
        <AuthForm
          email={email}
          loading={loading}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fragment>
  );
};

export default Register;
