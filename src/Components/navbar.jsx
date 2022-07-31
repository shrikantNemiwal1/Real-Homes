import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <img className="logo" src={logo} alt="logo" />
          <Link className="navbar-brand" to="#">
            REAL HOMES
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/properties"
                >
                  Buy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customers">
                  Sell
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rentals">
                  Rent
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign in
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
