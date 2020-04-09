import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="container">
      <div className="row p-5">
        <p>Home</p>
        <hr />
        {JSON.stringify(user)}
      </div>
    </div>
  );
};

export default Home;
