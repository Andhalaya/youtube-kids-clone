import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo"><img src="../../assets/logo.png" alt="" /></div>
      <div className="greeting">Hi, Pepito! <span className="avatar">👦</span></div>
    </header>
  );
}

export default Header;
