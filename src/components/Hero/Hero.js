import React from 'react'
import './Hero.css'
import Footer from '../Footer/Footer'

const Hero = ()=>{
    return (
        <>
             <div id="bg">
                <img src="assets/images/1.jpg" alt='A lake between two forests' />
            </div>
            <section className='hero'>
                <div className="hero_info">
                    <div className="hero_info__text">
                        <h1>ARE YOU TIRED OF INTERMITTENT <span className="water">WATER SUPPLY?</span></h1>
                        <p>Life is thoroughly enjoyed when there is constant supply of water. Your breath
                        is too precious to be wasting it screaming because there is a cease in 
                        water flow
                        </p>
                        <p>
                            AquaFind finds private water suppliers in your vicinity making it easy for you to
                            get water to your home
                        </p>
                        <p>Join <b>AquaFind</b> for constant <b>water supply</b></p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Hero