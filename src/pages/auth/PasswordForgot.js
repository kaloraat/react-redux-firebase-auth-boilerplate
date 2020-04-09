import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const PasswordForgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_PASSWORD_FORGOT_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration`
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log("error on password reset email", error);
      });
  };

  return (
    <>
      <div className="container p-5">
        {loading ? (
          <h4 className="text-danger">Loading..</h4>
        ) : (
          <h4>Forgot Password</h4>
        )}
        <AuthForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PasswordForgot;
