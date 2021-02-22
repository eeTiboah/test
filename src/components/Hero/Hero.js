import React from 'react'
import './Hero.css'
import Footer from '../Footer/Footer'
import {Link} from 'react-router-dom'

const Hero = ()=>{
    return (
        <div className="page">
            <section className='hero'>
                <div className="hero_info">
                    <div className="hero_info__text">
                        <h1>ARE YOU TIRED OF INTERMITTENT <span className="water">WATER SUPPLY?</span></h1>
                        <p>Life is thoroughly enjoyed when there is constant supply of water. Your breath
                        is too precious to be wasting it screaming because there is a cease in 
                        water flow
                        </p>
                        
                        <p>Join <b className="aqua_btn">
                        <Link to="/order">
                        AquaFind
                        </Link>
                        </b> for constant <b>water supply</b></p>
                    </div>
                </div>
                <div className="hero_img">
                    {/* <div>
                        <img src="assets/images/back.jpg" alt='A lake with a red metal in the middle' />
                    </div> */}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Hero