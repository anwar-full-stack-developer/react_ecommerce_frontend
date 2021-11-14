import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#main_nav"
          aria-controls="main_nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                className="nav-link"
                to="/"
                >Home</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/product"
                >Products</Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                >About</Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Supermarket</a
              >
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Partnership</a
              >
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Baby &amp; Toys</a
              >
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Fitness sport</a
              >
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Clothing</a
              >
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/page-index-2.html#"
                >Furnitures</a
              >
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#/page-index-2.html#"
                aria-expanded="false"
              >
                More</a
              >
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  href="#/page-index-2.html#"
                  >Foods and Drink</a
                >
                <a
                  className="dropdown-item"
                  href="#/page-index-2.html#"
                  >Home interior</a
                >
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#/page-index-2.html#"
                  >Category 1</a
                >
                <a
                  className="dropdown-item"
                  href="#/page-index-2.html#"
                  >Category 2</a
                >
                <a
                  className="dropdown-item"
                  href="#/page-index-2.html#"
                  >Category 3</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

export default Navbar;
