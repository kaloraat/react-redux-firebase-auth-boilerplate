import React from "react";

const AuthForm = ({
  email,
  password = "",
  loading,
  setEmail,
  setPassword,
  handleSubmit,
  showPasswordInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group"></div>
    <div className="form-group">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        className="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        disabled={loading}
      />
    </div>
    {showPasswordInput && (
      <div className="form-group">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
    )}
    <button
      type="submit"
      className="btn btn-primary"
      disabled={!email || loading}
    >
      Submit
    </button>
  </form>
);

export default AuthForm;
