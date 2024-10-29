import React from 'react'
import {Link}  from 'react-router-dom';
import "./Nav.css";
function Navbar() {
    return (
        <>
            <div class="navbar">
                <Link to='/'>Home</Link>
                <div class="dropdown">
                    <Link to='/products'>Products</Link>
                    <div class="dropdown-content">
                        <Link to='/products/mens'>Mens</Link>
                        <Link to='/products/womens'>Womens</Link>
                        <Link to='/products/kids'>Kids</Link>
                    </div>
                </div>
                <Link to='/carts'>Cart<i class="fa-solid fa-cart-shopping"></i></Link>

                <div className='validation'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signUp'>Signup</Link>
                </div>/
            </div>
        </>
    )
}
export default Navbar;