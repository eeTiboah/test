import React from 'react'
import './Footer.css'

const Footer = () => {
    const getDate = new Date().getFullYear()
    return (
        <footer className="footer">
            <p className="copyright">
                &copy; Copyright {getDate} AquaFind 
            </p>
        </footer>
    )
}

export default Footer