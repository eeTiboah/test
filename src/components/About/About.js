import React from 'react'
import Footer from '../Footer/Footer'
import {Link} from 'react-router-dom'
import './About.css'

const About = () => {
    return (
        <>
            <div className="about">
               <div className="about_info">
               <h1>  <span className="water">WE ARE WATER</span></h1>
                <p>Founded in 2019, we have been providing our customers clean
                water. With a single tap on your phone, you get access to various water suppliers
                available in your vicinity making it easy to get water to your home.</p>
                <p>
                    We provide a 24/7 service so you do not need to worry when your water ceases to flow
                </p>
                <p>What are you waiting for? 
                    <b className="aqua_btn">
                        <Link to="/order">
                        Join Us
                        </Link>
                    </b> for uninterrupted water supply
                </p>
                <p></p>
               </div>
            </div>
            <Footer />
        </>
    )
}

export default About