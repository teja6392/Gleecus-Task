import React from 'react'
import logo from "../Images/logo.jpg"
import logo1 from "../Images/logo1.jpg"
const Header = () => {
    return (
        <div id="container">
            {/*NavBar1*/}
            <div id="nav">
               <div>
               <ul>
                    <li><a href='#'><img src={logo1} id="logo1"/></a></li>
                    <li className='textLi'>
                        <select>
                            <option value="1">Clinical</option>
                        </select>
                    </li>
                    <li className='textLi'>
                        <select>
                            <option value="2">Business Developmnet</option>
                        </select>
                    </li>
                    <li className='textLi' >
                        <select id='colorLi'>
                            <option value="0">Admin</option>
                            <option value="1">Client</option>
                        </select>
                    </li>
                    <li id='navright'>
                        <a href='#'><img  src={logo} id="logo"/></a>
                    </li>
                    <li></li>
                </ul>
               </div>
            

            </div>
        </div>
    )
}

export default Header