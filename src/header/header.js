import React, { useState, useEffect, useRef} from 'react'
import styles from './header.module.css'
import dp from '../assets/dp.jpg'
import trophy from '../assets/trophy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSearch} from '@fortawesome/free-solid-svg-icons'


function Header() {

    const [objbg, setBg] = useState({backgroundColor:"white"})
    const [objSN, setSN] = useState({width:'0px'})
    const [objmain, setMain] = useState({marginLeft:'0px'})
    const openNav = () => {
        setBg({backgroundColor:'rgba(0,0,0,0.4)'})
        setSN({width:'250px'})
        setMain({marginLeft:'250px'})
        console.log("open49")
    }
    const closeNav = () => {
        setBg({backgroundColor:'white'})
        setSN({width:'0px'})
        setMain({marginLeft:'0px'})
        console.log("here")
    }
    return (
        <div>
            <div className={styles.containerfluid}>

            
            <div id={styles.mySidenav} className={styles.sidenav} style={objSN} >
                <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>&times;</a>
                    <img className={styles.dp} src={dp}></img>
                    <a href="#">POS</a>
                    <a href="#">Dashboard</a>
                    <a href="#">Customers</a>
                    <a href="#">Rules</a>
                    <br/>
                    <a href="#">Create New Partner</a>
                    <a href="#">Edit Partner</a>
                    <br/>
                    <a href="#">Profile</a>
                    <a href="#">Logout</a>
                    <br/>
                    <br/>
                    <a href="#">Contact us</a>
                    <a href="#">Terms and Conditions</a>
                    <a href="#">FAQs</a>
                    <a href="#">Wishlist</a>


                </div>
                <div id={styles.main} className={styles.main} style={objmain} >
                <span className={styles.open} onClick={openNav}>&#9776;</span>
                
                <img className={styles.trophy} src={trophy}></img>
                <div className={styles.right}> <FontAwesomeIcon icon={faSearch} style={{fontSize:'x-large',color:'white', marginRight:'50px', margin: '0px 20px 10px 50px'}}/>
            <img className={styles.dp} src={dp}></img>
            </div>
            </div>
            
            
            </div>
        </div>
    )
}

export default Header

