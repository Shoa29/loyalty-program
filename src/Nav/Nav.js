import React, { Component } from 'react'
import styles from './Nav.module.css'
import dp from '../assets/dp.jpg'


export class NavBurgur extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            objbg:{
                backgroundColor:"white"
            },
            objsidenav:{
                width: '0px'
            },
            objmain : {
                 marginLeft:'0px'
             }
        }

    }
    openNav = () => {
        this.setState({
            objbg:{
                backgroundColor:"rgba(0,0,0,0.4)"
            },
            objsidenav:{
                width:'250px'
            },
            objmain:{
                marginLeft:'250px'
            }
        })
        console.log("open49")
    }
    closeNav = () => {
        this.setState({
            objbg:{
                backgroundColor:"white"
            },
            objsidenav:{
                width:'0px'
            },
            objmain:{
                marginLeft:'0px'
            }
        })
        console.log("here")
    }

    
    render() {
        return (
            <div>
                <div id={styles.mySidenav} className={styles.sidenav} style={this.state.objsidenav}>
                <a href="javascript:void(0)" className={styles.closebtn} onClick={this.closeNav}>&times;</a>
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
                <div id={styles.main} className={styles.main} style={this.state.objmain}>
                <span className={styles.open} onClick={this.openNav}>&#9776;</span>
                

                </div>
                
            </div>
        )
    }
}

export default NavBurgur
