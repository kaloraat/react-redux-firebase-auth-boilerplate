import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import Wrapper from "./wrapper";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { useDispatch } from "react-redux";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import PasswordForgot from "./pages/auth/PasswordForgot";

const App = () => {
  const dispatch = useDispatch();
  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
        // console.log("currentUser", user);
        // console.log("idTokenResult", idTokenResult.token);
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        });
      }
    });
    //
    return () => unsubscribe();
  }, []);

  return (
    <Wrapper className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route exact path="/password/forgot" component={PasswordForgot} />
      </Switch>
    </Wrapper>
  );
};

export default App;
