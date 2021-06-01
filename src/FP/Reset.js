import React , {useRef, useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import styles from './FP.module.css'
import trophy from '../assets/trophy.png';
import {Link, useParams} from 'react-router-dom';

import firebase from '../firebase'


function Reset() {

    const { email } = useParams()
    const npswd = useRef()
    const cpswd = useRef()
    const [msg, setMsg] = useState('')
    const [col, setCol] = useState('success')

    const handleSubmit = () => {
        if(npswd.current.value==cpswd.current.value){
            const pswd = cpswd.current.value
            const db = firebase.firestore().collection('users')
            console.log(email)
        db.where("email", "==", email)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const thing = querySnapshot.docs[0];
            thing.ref.update({password:pswd});
          });
      })
      .catch((error) => {
          console.log("Invalid email  ", error);
      });
    

        }else{
            setMsg('Passwords must match')
            setCol('danger')
        }
    }
        

    return (
        <div className={styles.container}>
          <div className={styles.upper}>
            <a><img src={trophy} alt="Loyalty Program" width="100" height="100"></img></a>
            <div className={styles.uptxt}><h4>LOYALTY REWARDS</h4><p>P R O G R A M</p></div>
          </div>
          <Alert variant={col}>{msg}</Alert>
            <div className={styles.containerfluid} >
              <h3 className={styles.downtxt}>Reset Password</h3>
            <Form>
              <Form.Group controlId="formNPass">
                <Form.Control ref={npswd} type="password" placeholder="Enter new Password" />
              </Form.Group>    
              <Form.Group controlId="formCPass">
                <Form.Control ref={cpswd} type="password" placeholder="Confirm new Password" />
              </Form.Group>            
              <br/>
              <br/>
            <Button className={styles.btn} onClick={handleSubmit} variant="primary" >
            Submit            </Button>
          </Form>
            </div>
            <Link to="/login"><p className={styles.acc}>Back To Login</p></Link>

        </div>
    )
}

export default Reset
