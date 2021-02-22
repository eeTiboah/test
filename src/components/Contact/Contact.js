import React from 'react'
import './Contact.css'
import Footer from '../Footer/Footer'


const Contact = () => {
    return (
        <>
            <div className="contact">
               <div className="contact_info">
               <h1>  <span className="water">REACH US</span></h1>
                <p>
                Head Office: 28th February Road
                (near Independence Square)
                Post Office Box M 194, Accra – Ghana
                Email: info@aquafind.com.gh
                website: www.aquafind.netlify.app
               AquaFind Call Centre, Adjacent to 37 Military Hospital
                0800 40000 (Toll-free on vodafone)
                0207385088, 0207385089, 0207385090, 0302-2218240
                Master Control Room, Adjacent to 37 Military Hospital
                0207385087 (24 hrs), 0502917601, 0302-774707
                </p>
                
               </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact