import React, { useState } from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import styles from './FP.module.css'
import trophy from '../assets/trophy.png';
import {Link} from 'react-router-dom';
import NavBurgur from '../Nav/Nav'
import axios from 'axios';
import firebase from '../firebase'


function FP() {
  const [email,setEmail] = useState({email:''});
  const [error, setError] = useState('');
  const emailSubmit = () =>{
    const db = firebase.firestore().collection('users');
    db.where("email", "==", email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.data());
              axios.post('https://us-central1-loyalty-app-cdb1c.cloudfunctions.net/api/sendmail', email).then((response) =>{
                console.log("Sent");
              }).catch((error)=>{
                console.log("not sent");
              })
          });
      })
      .catch((error) => {
          console.log("not found ", error);
          setError('Email not registered with us!')
      });
  }
    return (
      <div>
        <NavBurgur></NavBurgur>
        <div className={styles.container}>
          <div className={styles.upper}>
            <a><img src={trophy} alt="Loyalty Program" width="100" height="100"></img></a>
            <div className={styles.uptxt}><h4>LOYALTY REWARDS</h4><p>P R O G R A M</p></div>
          </div>
            <div className={styles.containerfluid} >
              <h3 className={styles.downtxt}>Forgot Password</h3>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail({email:e.target.value})} />
              </Form.Group>              
              <br/>
              <br/>
            <Link to="/sent"><Button className={styles.btn} variant="primary" type="submit" >
            Send
            </Button></Link>
          </Form>
            </div>
            <p className={styles.acc}>Back To Login</p>

        </div>
        </div>
    )
}

export default FP
