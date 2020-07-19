import React from "react";
import { NavLink as Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pizza">Pizza</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;
