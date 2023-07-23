import React from 'react';
import {AiFillHome} from 'react-icons/ai'
import {AiOutlinePoweroff} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
const NavBar = () => {
    const navigate=useNavigate();

    function logOut(){
		localStorage.removeItem('token')
		navigate('/')
	}
  return (
    <nav className='navbar'>
        <div className='border'>
        <div className='content'>
        <div className='home' ><AiFillHome/></div>
        <div className='NoteSnap'>NoteSnap</div>
        <div className='logout' title='logout' onClick={logOut}><AiOutlinePoweroff/></div>
        </div>
        </div>
    </nav>
  );
};

export default NavBar;
