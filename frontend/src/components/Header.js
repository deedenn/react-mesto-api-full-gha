import React from "react";
import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header({email, onLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
      <NavBar email={email} onLogout={onLogout} />
    </header>
  );
}

export default Header;