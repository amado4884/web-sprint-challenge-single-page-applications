import React from "react";
import { NavLink as Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
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
    </header>
  );
};
export default Header;
