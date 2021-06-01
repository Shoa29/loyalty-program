import React, { useState, useEffect, useRef, useHistory} from 'react'
import css from './bprofile.module.css'
import {Form, Alert, Button} from 'react-bootstrap'
import trophy from '../assets/trophy.png';
import Header from '../header/header'
import {AuthProvider, useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'
import firebase from '../firebase'
import 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTimes} from '@fortawesome/free-solid-svg-icons'
import {faInstagram,faFacebookF,faTwitter} from '@fortawesome/free-brands-svg-icons';


import axios from 'axios'

/* global grecaptcha */
const Bprofile= (props) => {


    const name = useRef()
    const emailref = useRef()
    const numref = useRef()
    const addref = useRef()
    const smref = useRef()
    const desc = useRef()
    const memfees= useRef()
    const period = useRef()
    const imgref = useRef()
    const image = useRef()
    const cb = useRef()
    const [logourl, setLogo] = useState()
    const [fileName, setFN] = useState('None selected')
   // const image = document.querySelector('.img');
    const {currentUser} = useAuth()
    const [path, setPath] = useState('')
    const [uploaded, setUp] = useState({display:'none'})


    const defaultActive = () =>{
        imgref.current.click();
    }
    const remImg = () =>{
        setPath('')
        image.current.src = '';
        setUp({
            display:'none'
        })
    }
    const defClicked = (e) => {
        const file = e.target.files[0];
        let regexp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;
        if(file){
            const reader = new FileReader();
            reader.onload = function(){
                const result = reader.result;
                setPath(result)
                image.current.src = result;
                console.log(result + " result");
                setUp({display:'block'})
            }
            reader.readAsDataURL(file);
        }else{
            console.log("no file");
        } 
        if(e.target.value){
            let valueStore = e.target.value.match(regexp);
            setFN(valueStore)
        } 
    }

    const handleSubmit = () => {
       let obj = {
           name:name.current.value,
           address:addref.current.value,
           email:emailref.current.value,
           phone: numref.current.value,
           social_media: smref.current.value,
           business_description: desc.current.value,
           membership_fees:memfees.current.value,
           membership_period:period.current.value

       }
       axios.post('https://us-central1-loyalty-app-cdb1c.cloudfunctions.net/api/business_profile',obj).then((res)=>{
           console.log("added");

       }).catch((error)=>{
           console.log(error);
       })
       
    }



    return (
        
        <AuthProvider>
            <div>
                <Header></Header>
                 <div className="container">
                     <h2 style={{textAlign:'center', color:'#464747'}}>Create Business Profile</h2>
                            <Form className={css.create} >
                            <Form.Group controlId="formGroupBName" className={css.bpform}>
                            <Form.Control type="text" ref={name} name="bname" placeholder="Business Name" required/>
                            </Form.Group >
                            
                            <Form.Group controlId="formGroupAddress" className={css.bpform}>
                            <Form.Control type="text" ref={addref} name="address" placeholder="Address" required/>
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail" className={css.bpform}>
                            <Form.Control  ref={emailref} type="email" placeholder="Email" />
                            </Form.Group >
                            
                            <Form.Group controlId="formGroupPhone" className={css.bpform}>
                            <Form.Control type="text" name="phone" ref={numref} placeholder="Phone" />
                            </Form.Group>
                            <Form.Group controlId="formGroupRef" className={css.bpform}>
                            <div className={css.inputicons}><Form.Control className={css.inputfield} type="text" name="sm" ref={smref} placeholder="Social Media" />
                            <FontAwesomeIcon className={css.icons}  icon={faFacebookF} style={{fontSize:'medium'}}/> <FontAwesomeIcon className={css.icons} icon={faInstagram} style={{fontSize:'medium'}}/>
                            <FontAwesomeIcon className={css.icons} icon={faTwitter} style={{fontSize:'medium'}}/></div>
                            
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="formGroupDesc" className={css.bpform}>
                                <Form.Control as="textarea" rows={5} placeholder="Business Description" ref={desc}/>
                            </Form.Group>
                            <Form.Group controlId="formGroupMemfees" className={css.bpform}>
                            <Form.Control type="text" name="memfees" ref={memfees} placeholder="Membership Fees" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPeriod" className={css.bpform}>
                            <Form.Control ref={period} as="select"  className={css.bpform}>
                                <option value="month">Monthly</option>
                                <option value="year">Yearly</option>

                            </Form.Control></Form.Group>
                            <br>
                            </br>
                            <br/><br/>
                             <div className={css.containerfull}>
                                 <div className={css.wrapper}>
                                    <div className={css.image}>
                                       <img className="img" ref={image} alt=""></img>
                                    </div>
                                    <div className={css.content}>
                                        <div className={css.icon}><FontAwesomeIcon icon={faCamera} style={{fontSize:'80'}}/></div>
                                        <div className={css.text}>No file Chosen</div>
                                        
                                    </div>
                                    <div className={css.cancelbtn} ref={cb} style={uploaded}><a onClick={remImg}><FontAwesomeIcon icon={faTimes} style={{fontSize:'medium', color:'#159b82'}}/></a></div>
                                    <div className={css.filename}>{fileName}</div>
                                 </div>
                                <Form.Control onClick={defClicked} ref={imgref} type="file" className={css.defaultbtn} hidden/>
                                <Button  onClick={defaultActive} className={css.custombtn}>Add Business Logo</Button>

                             </div>
                            <br/>
                            <Button className={css.btn} onClick={handleSubmit}>Save</Button><br/><br/>
                        </Form>
                        </div>
                    </div>
            </AuthProvider>
        
        
    )

}
export default Bprofile;