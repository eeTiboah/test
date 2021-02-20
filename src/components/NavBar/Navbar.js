import React from 'react'
import './Navbar.css'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="header">
            <nav className="header_width">
                <Link to="/" className="header_a">
                    <h3>AquaFind</h3>
                </Link>
                <ul className="header_links__ul">
                    <li className="header_links__li">
                        <NavLink className="header_links__a" to="/order" data-hover="get-water"><span>Get Water</span></NavLink>
                    </li>
                    <li className="header_links__li">
                        <NavLink className="header_links__a" to="/login" data-hover="login"><span>LOGIN</span></NavLink>
                    </li> 
                    
                </ul>
            </nav>
        </header>
    )
}

export default Navbar

