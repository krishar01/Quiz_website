import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
 
  return (
    <nav className='main'>
      <p>ICON</p>
       <ul className={isMobileNavOpen?'nav-links mobile':'nav-links'}
        onClick={()=>setIsMobileNavOpen(!isMobileNavOpen)}>
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/quiz/form'}>QUIZ</Link></li>
        <li><Link to={'/score'}>SCORE</Link></li>
        <li><Link to={'/about'}>ABOUT</Link></li>
        <li><Link to={'/leaderboard'}>STATS</Link></li>
       </ul>
       <button className='hamburger' onClick={()=>setIsMobileNavOpen(!isMobileNavOpen)}>
        {isMobileNavOpen? '✕' : '☰'}</button>
    </nav>

  )
}

export default Navbar;
