import React from 'react'
import './css/footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    const email="chitresh.cm@gamil.com"
    return (
        <>
                 <div className="root-container">


                <div class="card-header footer bg-dark text-white my-0" >
                    <Link to={`mailto:${email}`} className='footer-text'>
                        <a >chitresh.cm@gamil.com</a>
                    
                    </Link> 
                </div>
                 </div>
        

            
        </>
    )
}

export default Footer
