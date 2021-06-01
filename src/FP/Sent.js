import React from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import styles from './FP.module.css'
import trophy from '../assets/trophy.png';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'

function Sent() {
    return (
        <div className={styles.container}>
            <div className={styles.containerfluids} >
            <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'220px'}}/>
              <h1>Please Check</h1>
              <p>An email has been sent to your registered address...</p>
            
            <Link to="/forgot"><Button className={styles.btn} variant="primary" >
            Close
            </Button></Link>
          
            </div>

        </div>
    )
}

export default Sent
