import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { verifyToken } from "../../services";

const Login = () => {
  const navigate = useNavigate();
  const checkAuth = useCallback(async () => {
    const storageToken = localStorage.getItem("accessToken");
    const auth = await verifyToken(storageToken);
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = () => {
    const redirectUri = "http://localhost:3000";
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}`;
    window.location = authorizeUrl;
  };
  return (
    <div className="login-container">
      <div className="login-btn">
        <Link>
          <button onClick={handleLogin}>Login</button>
        </Link>
        <img className="spot-img" src="logo1.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
