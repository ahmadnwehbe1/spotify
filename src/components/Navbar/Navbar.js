import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link style={{ color: "black", textDecoration: "none" }} to="/">
        Spotify Artist Search
      </Link>
    </div>
  );
};

export default Navbar;
