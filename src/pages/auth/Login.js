import React, { useState, useContext, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Login", values);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          // console.log("result", result);
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();
          // console.log("before dispatch token > ", idTokenResult.token);

          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: idTokenResult.token,
            },
          });

          // send user info to update user in mongodb

          history.push("/dashboard");
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      // console.log("result", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log("before dispatch token > ", idTokenResult.token);

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      // send user info to update user in mongodb

      history.push("/update/profile");
    });
  };

  return (
    <Fragment>
      <div className="container p-5">
        {loading ? <h4 className="text-danger">Loading..</h4> : <h4>Login</h4>}
        {success && history.push("/update/profile")}
        <button className="btn btn-danger mt-5" onClick={googleLogin}>
          Login with Google
        </button>

        <AuthForm
          email={email}
          password={password}
          loading={loading}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          showPasswordInput="true"
        />
        <Link to="/password/forgot" className="text-danger float-right">
          Forgot Password
        </Link>
      </div>
    </Fragment>
  );
};

export default Login;
