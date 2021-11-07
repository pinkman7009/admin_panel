import React from 'react'
import "../../styles/TopNavbar.css"
import {FaUser} from "react-icons/fa"

const TopNavbar = () => {
    return (
        <div className="top-nav-container">
            <div className="user-container">
               
                <FaUser/>
                
                <p>John Doe</p>
            </div>
        </div>
    )
}

export default TopNavbar
