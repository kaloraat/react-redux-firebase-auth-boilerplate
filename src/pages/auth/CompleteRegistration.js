import React, { useState, useEffect, useContext, Fragment } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
// 1 useSelector for getting state
// 1 useDispatch for updating state
import { useSelector, useDispatch } from "react-redux";

const CompleteRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  // 2 allows you to extract data from the Redux store state
  const { user } = useSelector((state) => ({ ...state }));

  // 3 allows you to update state
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("window.location.href", window.location.href);

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    try {
      // make sure to use async in the next callback / the second argument to register
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   if user email is verified
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        console.log("email verified", result);
        let user = auth.currentUser;
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();
        console.log("before dispatch token > ", idTokenResult.token);

        // dispatch to redux state
        // make api request to save user in mongodb

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        history.push("/");
      }
    } catch (error) {
      console.log("register complete error", error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <div className="container p-5">
        {loading ? (
          <h4 className="text-danger">Loading..</h4>
        ) : (
          <h4>Complete your registration</h4>
        )}
        <hr />
        {JSON.stringify(user)}
        <hr />
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handleSubmit={handleSubmit}
          showPasswordInput="true"
        />
      </div>
    </Fragment>
  );
};

export default CompleteRegistration;
