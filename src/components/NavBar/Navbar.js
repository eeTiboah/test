import React, {useContext} from 'react'
import './Navbar.css'
import {Link, NavLink, withRouter, Redirect} from 'react-router-dom'
import app from "../../firebase.js";
import { AuthContext } from "../../Auth.js";

const Navbar = () => {
    const handleLogout = () => {
        app.auth().signOut();
        <Redirect to="/home" />;
      };

    const { currentUser } = useContext(AuthContext);

    return (
        <>
        {currentUser ? (
            <header className="header">
                <nav className="header_width">
                    <Link to="/" className="header_a">
                        <h3>AquaFind</h3>
                    </Link>
                    <ul className="header_links__ul">
                        <li className="header_links__li">
                            <NavLink className="header_links__a" to="/about"><span>ABOUT</span></NavLink>
                        </li>
                        <li className="header_links__li">
                            <NavLink className="header_links__a" to="/contact"><span>CONTACT</span></NavLink>
                        </li>
                        <li className="header_links__li">
                            <NavLink className="header_links__a" to="/order"><span>Get Water</span></NavLink>
                        </li>
                        <div onClick={handleLogout}>
                        <li className="header_links__li login">
                            <NavLink className="login_link" to="/"><span>LOGOUT</span></NavLink>
                        </li> 
                        </div>
                    </ul>
                </nav>
            </header>
        ): <header className="header">
            <nav className="header_width">
                <Link to="/" className="header_a">
                    <h3>AquaFind</h3>
                </Link>
                <ul className="header_links__ul">
                    <li className="header_links__li">
                        <NavLink className="header_links__a" to="/about"><span>ABOUT</span></NavLink>
                    </li>
                    <li className="header_links__li">
                        <NavLink className="header_links__a" to="/contact"><span>CONTACT</span></NavLink>
                    </li>
                    <li className="header_links__li login">
                        <NavLink className="login_link" to="/login"><span>GET STARTED</span></NavLink>
                    </li>  
                </ul>
            </nav>
        </header>}
        </>
        
    )
}

export default withRouter(Navbar)

