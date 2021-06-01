import React,  { useState, useRef} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import styles from './Login.module.css'
import trophy from '../assets/trophy.png';
import {Link, useHistory} from 'react-router-dom';
import firebase from '../firebase'
import NavBurgur from '../Nav/Nav'


function Login() {
  const history = useHistory();
  const idref = useRef()
  const pswdref = useRef()
const [msg, setMsg] = useState('')
const [col, setCol] = useState('success')

const checkLogin = async () => {
  const id = idref.current.value
  const pswd = pswdref.current.value
  console.log("idref: " + id)
  const db = firebase.firestore().collection('users')
  const docRef = await db.doc(id)
  docRef.get().then((doc) => {
    if(doc.exists){
      if (doc.data().password ==pswd) {
        console.log("Login Successful");
        setMsg('Login Successful!')
        setCol('success')
        history.push('/business_profile');
    } else {
        console.log("Invalid password")
        setMsg('Invalid Password!')
        setCol('danger')
    }
    }else{
      db.where("email", "==", id)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              if(doc.data().password==pswd){
                console.log("login successful")
                setMsg('Login Successful!')
                setCol('success')
                history.push('/business_profile');
              }else{
                console.log("invalid password")
                setMsg('Invalid Password!')
                setCol('danger')
              }
          });
      })
      .catch((error) => {
          console.log("Invalid email or number ", error);
          setMsg('Invalid email or phone number!')
           setCol('danger')
      });
  
    }
      
  });

  
  
}

const handleSubmit = () => {
  if(idref.current.value==null || idref.current.value=='' || idref.current.value==' '){
    setMsg('Please enter a valid email or phone number!')
    setCol('danger')
  }else if(pswdref.current.value==null || pswdref.current.value.length<6){
    setMsg('Please enter the password correctly!')
    setCol('danger')

  }
  checkLogin()

}

    return (
      <div>
        <NavBurgur></NavBurgur>
        <div className={styles.container}>
          <div className={styles.upper}>
            <a><img src={trophy} alt="Loyalty Program" width="100" height="100"></img></a>
            <div className={styles.uptxt}><h4>LOYALTY REWARDS</h4><p>P R O G R A M</p></div>
          </div>
          <Alert variant={col}>{msg}</Alert>
            <div className={styles.containerfluid} >
              <h3 className={styles.downtxt}>Login</h3>
            <Form>
              <Form.Group controlId="formBasicEmail" className={styles.logform}>
                <Form.Control type="email" ref={idref} placeholder="Enter email or phone number" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className={styles.logform}>
                <Form.Control type="password" ref={pswdref} placeholder="Password" /><br/>
                <Link to="/forgot"><a className={styles.frgt}>Forgot Password</a></Link>
              </Form.Group>
              

            <Button className={styles.logbtn} variant="primary"  onClick={handleSubmit}>
            Login
            </Button>
          </Form>

          <br>
          </br>
          <br>
          </br>
          <p  className={styles.acc}>Not Registered?<Link to="/"><a> Create an account</a></Link></p>
          <Link to="/storelogin"><a>Go to Store Login</a></Link>
            </div>
        </div>
        </div>
    )
}

export default Login
