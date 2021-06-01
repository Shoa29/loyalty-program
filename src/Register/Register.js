import React, { useState, useEffect, useRef, useHistory} from 'react'
import styles from './Register.module.css'
import Form from 'react-bootstrap/Form'
import trophy from '../assets/trophy.png';
import NavBurger from '../Nav/Nav'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {AuthProvider, useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/firestore';

/* global grecaptcha */
const Register = (props) => {
    
    const otpref = useRef()
    const emailref = useRef()
    const numref = useRef()
    const pwdref = useRef()
    const dobref = useRef()
    const coderef = useRef()
    const genderref = useRef()
    const fnameref = useRef()
    const lnameref = useRef()
    const cityref = useRef()
    const addressref = useRef()
    const regionref = useRef()
    const postref = useRef()
    const cpwdref = useRef()
    const country_coderef = useRef()

    const [cocode, setcocode] = useState("64")
    const [boolOffer, setOffer] = useState(false)
    const [verified, setVerify] = useState({
        display:"none"
    })
    const [boolCont1, setContone] = useState({
        display:"block"
    })
    const [boolCont, setCont] = useState(true)
    const [boolCont2, setConttwo] = useState({
        display:"none"
    })
    const [phone, setPhone] = useState('')
    const {signup, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [userErr, setUserErr] = useState("")

  const[clkd, setClicked] = useState(false)
  const[counter, setCounter] = useState('Verify')
    const[boolchng, setChange] = useState(0)
        const clickHandler = async () => {
        let number = "+" + cocode + " " + phone ;
        const db = firebase.firestore().collection("users");
        const docf =  await db.doc(number).get();
        console.log(docf.data());
        if(docf.data()!=null){
            setUserErr("User Already Exists!")
        }else{
            anotherSubmit()
            setCont(false)
            setContone({
                display:"none"
            })
            setConttwo({
                display:"block"
            })
        }

    }
    function handleSubmit(e) {
        e.preventDefault()
        let number = "+" + cocode + " " + phone ;
        let objuser = {
            phone_number : number,
            first_name : fnameref.current.value,
            last_name : lnameref.current.value,
            email : emailref.current.value,
            city : cityref.current.value,
            region : regionref.current.value,
            post_code : postref.current.value,
            DOB : dobref.current.value,
            password : pwdref.current.value,
            referral_code : coderef.current.value,
            keep_posted_offer : boolOffer

        }
        if(currentUser){
            if(objuser.password==null || objuser.password.length<6){
                setError("Please enter password atleast of 6 digits!");
            }else if(objuser.password != cpwdref){
                setError("Please confirm same passwords!");
            }else if(objuser.post_code.length!=4){
                setError("Please enter valid post code!");}
            else{
                const db = firebase.firestore().collection('users');
            console.log(db);
            console.log(objuser);
            db.doc(objuser.phone_number).set(objuser).then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            console.log("uploaded data");
            }
            
        }
        else{
            setError("Failed to create an account");
        }
        
    }
    const veridone = () => {

        let c = 9
        setClicked(!clkd)
        let countdown = setInterval(() => {
            
            let txt = "Verifying..." + c + " seconds";
            setCounter(txt)
            c = c - 1
        if(c==0 && currentUser!=null){
            setCounter("Verified")
            clearInterval(countdown);
            setVerify({display:"block"})
        }
    }, 1000); 
        
        
    }
    
    const anotherSubmit = () => {
        
        let number = "+" + cocode + " " + phone ;
        
        if(number=='' || number==null){
            setError("Please Enter a Valid Number!")

        }
        else{
                console.log(number);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log("another submit success" + response);
            }
          });
          const recaptchaV = window.recaptchaVerifier;
          firebase.auth().signInWithPhoneNumber(number, recaptchaV).then(function(e){
            let checkotp = setInterval(() => {
                if(clkd || otpref.current.value !=null){
                    let code = otpref.current.value
            e.confirm(code).then(function(result){
                console.log(result.user, 'user');
            }).catch((error)=>{
                console.log(error);
            }) 
        }
        if(currentUser!=null || boolchng==1){
            clearInterval(checkotp);
        }
        }, 10000); 
             
        })
          
        
    }
        
        
    }
    const changeNumber = () =>{
        setChange(1)

        let number = "+" + cocode + " " + phone ;

        let widgetId = 'recaptcha';
        console.log(boolchng + "again resending " + number)
        window.recaptchaVerifier.render().then(function(widgetId) {
            window.recaptchaVerifier.reset(widgetId);
        })
        const recaptchaV = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(number, recaptchaV).then(function(e){
            let checkotp = setInterval(() => {
            if(clkd || otpref.current.value !=null){
                let code = otpref.current.value
        e.confirm(code).then(function(result){
            console.log(result.user, 'user');
        }).catch((error)=>{
            console.log(error + " inside auth");
        }) 
    }
    if(currentUser!=null){
        console.log("done")
        clearInterval(checkotp);
    }
    }, 10000); 
         
    })
            
        


    }
    const formInit = (
            <div className={styles.containerfluid1} style={boolCont1}>
                        <div className={styles.text}><h4>Get Started</h4>
                        <p>We will send a verification code to verify your phone number</p></div>
                        <div className={styles.form}>
                        <Form >
                            
                            <Form.Group controlId="formGroupPhoneEnter" className={styles.regform}>
                            <Form.Control ref={country_coderef} as="select" value={cocode} onChange={e => setcocode(e.target.value)} >
                            <option data-countryCode="NZ" value="64" >NZ (+64)</option>
                            <option data-countryCode="DZ" value="213"> DZ (+213)</option>
		<option data-countryCode="AD" value="376">AD (+376)</option>
		<option data-countryCode="AO" value="244">AO (+244)</option>
		<option data-countryCode="AI" value="1264">AI (+1264)</option>
		<option data-countryCode="AG" value="1268">AG (+1268)</option>
		<option data-countryCode="AR" value="54">AR (+54)</option>
		<option data-countryCode="AM" value="374">AM (+374)</option>
		<option data-countryCode="AW" value="297">AW (+297)</option>
		<option data-countryCode="AU" value="61">AU (+61)</option>
		<option data-countryCode="AT" value="43">AT (+43)</option>
		<option data-countryCode="AZ" value="994">AZ (+994)</option>
		<option data-countryCode="BS" value="1242">BS (+1242)</option>
		<option data-countryCode="BH" value="973">BH (+973)</option>
		<option data-countryCode="BD" value="880">BD (+880)</option>
		<option data-countryCode="BB" value="1246">BB (+1246)</option>
		<option data-countryCode="BY" value="375">BY (+375)</option>
		<option data-countryCode="BE" value="32">BE (+32)</option>
		<option data-countryCode="BZ" value="501">BZ (+501)</option>
		<option data-countryCode="BJ" value="229">BJ (+229)</option>
		<option data-countryCode="BM" value="1441">BM (+1441)</option>
		<option data-countryCode="BT" value="975">BT (+975)</option>
		<option data-countryCode="BO" value="591">BO (+591)</option>
		<option data-countryCode="BA" value="387">BA (+387)</option>
		<option data-countryCode="BW" value="267">BW (+267)</option>
		<option data-countryCode="BR" value="55">BR (+55)</option>
		<option data-countryCode="BN" value="673">BN (+673)</option>
		<option data-countryCode="BG" value="359">BG (+359)</option>
		<option data-countryCode="BF" value="226">BF (+226)</option>
		<option data-countryCode="BI" value="257">BI (+257)</option>
		<option data-countryCode="KH" value="855">KH (+855)</option>
		<option data-countryCode="CM" value="237">CM (+237)</option>
		<option data-countryCode="CA" value="1">CA(+1)</option>
		<option data-countryCode="CV" value="238">CV (+238)</option>
		<option data-countryCode="KY" value="1345">KY (+1345)</option>
		<option data-countryCode="CF" value="236">CF (+236)</option>
		<option data-countryCode="CL" value="56">CL (+56)</option>
		<option data-countryCode="CN" value="86">CN (+86)</option>
		<option data-countryCode="CO" value="57">CO (+57)</option>
		<option data-countryCode="KM" value="269">KM (+269)</option>
		<option data-countryCode="CG" value="242">CG (+242)</option>
		<option data-countryCode="CK" value="682">CK (+682)</option>
		<option data-countryCode="CR" value="506">CR (+506)</option>
		<option data-countryCode="HR" value="385">HR (+385)</option>
		<option data-countryCode="CU" value="53">CU (+53)</option>
		<option data-countryCode="CY" value="90392">CY (+90392)</option>
		<option data-countryCode="CY" value="357">Cy (+357)</option>
		<option data-countryCode="CZ" value="42">CZ (+42)</option>
		<option data-countryCode="DK" value="45">DK (+45)</option>
		<option data-countryCode="DJ" value="253">DJ (+253)</option>
		<option data-countryCode="DM" value="1809">DM (+1809)</option>
		<option data-countryCode="DO" value="1809">DO (+1809)</option>
		<option data-countryCode="EC" value="593">EC (+593)</option>
		<option data-countryCode="EG" value="20">EG (+20)</option>
		<option data-countryCode="SV" value="503">SV (+503)</option>
		<option data-countryCode="GQ" value="240">GQ (+240)</option>
		<option data-countryCode="ER" value="291">ER (+291)</option>
		<option data-countryCode="EE" value="372">EE (+372)</option>
		<option data-countryCode="ET" value="251">ET (+251)</option>
		<option data-countryCode="FK" value="500">FK (+500)</option>
		<option data-countryCode="FO" value="298">FO (+298)</option>
		<option data-countryCode="FJ" value="679">FJ (+679)</option>
		<option data-countryCode="FI" value="358">FI (+358)</option>
		<option data-countryCode="FR" value="33">FR (+33)</option>
		<option data-countryCode="GF" value="594">GF (+594)</option>
		<option data-countryCode="PF" value="689">PF (+689)</option>
		<option data-countryCode="GA" value="241">GA (+241)</option>
		<option data-countryCode="GM" value="220">GM (+220)</option>
		<option data-countryCode="GE" value="7880">GE (+7880)</option>
		<option data-countryCode="DE" value="49">DE (+49)</option>
		<option data-countryCode="GH" value="233">GH (+233)</option>
		<option data-countryCode="GI" value="350">GI (+350)</option>
		<option data-countryCode="GR" value="30">GR (+30)</option>
		<option data-countryCode="GL" value="299">GL (+299)</option>
		<option data-countryCode="GD" value="1473">GD (+1473)</option>
		<option data-countryCode="GP" value="590">GP (+590)</option>
		<option data-countryCode="GU" value="671">GU (+671)</option>
		<option data-countryCode="GT" value="502">GT (+502)</option>
		<option data-countryCode="GN" value="224">GN (+224)</option>
		<option data-countryCode="GW" value="245">GW (+245)</option>
		<option data-countryCode="GY" value="592">GY (+592)</option>
		<option data-countryCode="HT" value="509">HT (+509)</option>
		<option data-countryCode="HN" value="504">HN (+504)</option>
		<option data-countryCode="HK" value="852">HK (+852)</option>
		<option data-countryCode="HU" value="36">HU (+36)</option>
		<option data-countryCode="IS" value="354">IS (+354)</option>
		<option data-countryCode="IN" value="91">IN (+91)</option>
		<option data-countryCode="ID" value="62">ID (+62)</option>
		<option data-countryCode="IR" value="98">IR (+98)</option>
		<option data-countryCode="IQ" value="964">IQ (+964)</option>
		<option data-countryCode="IE" value="353">IE (+353)</option>
		<option data-countryCode="IL" value="972">IL (+972)</option>
		<option data-countryCode="IT" value="39">IT (+39)</option>
		<option data-countryCode="JM" value="1876">JM (+1876)</option>
		<option data-countryCode="JP" value="81">JP (+81)</option>
		<option data-countryCode="JO" value="962">JO (+962)</option>
		<option data-countryCode="KZ" value="7">KZ (+7)</option>
		<option data-countryCode="KE" value="254">KE (+254)</option>
		<option data-countryCode="KI" value="686">KI (+686)</option>
		<option data-countryCode="KP" value="850">KP (+850)</option>
		<option data-countryCode="KR" value="82">KR (+82)</option>
		<option data-countryCode="KW" value="965">KW (+965)</option>
		<option data-countryCode="KG" value="996">KG (+996)</option>
		<option data-countryCode="LA" value="856">LA (+856)</option>
		<option data-countryCode="LV" value="371">LV (+371)</option>
		<option data-countryCode="LB" value="961">LB (+961)</option>
		<option data-countryCode="LS" value="266">LS (+266)</option>
		<option data-countryCode="LR" value="231">LR (+231)</option>
		<option data-countryCode="LY" value="218">LY (+218)</option>
		<option data-countryCode="LI" value="417">LI (+417)</option>
		<option data-countryCode="LT" value="370">LT (+370)</option>
		<option data-countryCode="LU" value="352">LU (+352)</option>
		<option data-countryCode="MO" value="853">MO (+853)</option>
		<option data-countryCode="MK" value="389">MK (+389)</option>
		<option data-countryCode="MG" value="261">MG (+261)</option>
		<option data-countryCode="MW" value="265">MW (+265)</option>
		<option data-countryCode="MY" value="60">MY (+60)</option>
		<option data-countryCode="MV" value="960">MV (+960)</option>
		<option data-countryCode="ML" value="223">ML (+223)</option>
		<option data-countryCode="MT" value="356">MT (+356)</option>
		<option data-countryCode="MH" value="692">MH (+692)</option>
		<option data-countryCode="MQ" value="596">MQ (+596)</option>
		<option data-countryCode="MR" value="222">MR (+222)</option>
		<option data-countryCode="YT" value="269">YT (+269)</option>
		<option data-countryCode="MX" value="52">MX (+52)</option>
		<option data-countryCode="FM" value="691">FM (+691)</option>
		<option data-countryCode="MD" value="373">MD (+373)</option>
		<option data-countryCode="MC" value="377">MC (+377)</option>
		<option data-countryCode="MN" value="976">MN (+976)</option>
		<option data-countryCode="MS" value="1664">MS (+1664)</option>
		<option data-countryCode="MA" value="212">MA (+212)</option>
		<option data-countryCode="MZ" value="258">MZ (+258)</option>
		<option data-countryCode="MN" value="95">MN (+95)</option>
		<option data-countryCode="NA" value="264">NA (+264)</option>
		<option data-countryCode="NR" value="674">NR (+674)</option>
		<option data-countryCode="NP" value="977">NP (+977)</option>
		<option data-countryCode="NL" value="31">NL (+31)</option>
		<option data-countryCode="NC" value="687">NC (+687)</option>
		<option data-countryCode="NZ" value="64">NZ (+64)</option>
		<option data-countryCode="NI" value="505">NI (+505)</option>
		<option data-countryCode="NE" value="227">NE (+227)</option>
		<option data-countryCode="NG" value="234">NG (+234)</option>
		<option data-countryCode="NU" value="683">NU (+683)</option>
		<option data-countryCode="NF" value="672">NF (+672)</option>
		<option data-countryCode="NP" value="670">NP (+670)</option>
		<option data-countryCode="NO" value="47">NO (+47)</option>
		<option data-countryCode="OM" value="968">OM (+968)</option>
		<option data-countryCode="PW" value="680">PW (+680)</option>
		<option data-countryCode="PA" value="507">PA (+507)</option>
		<option data-countryCode="PG" value="675">PG (+675)</option>
		<option data-countryCode="PY" value="595">PY (+595)</option>
		<option data-countryCode="PE" value="51">PE (+51)</option>
		<option data-countryCode="PH" value="63">PH (+63)</option>
		<option data-countryCode="PL" value="48">PL (+48)</option>
		<option data-countryCode="PT" value="351">PT (+351)</option>
		<option data-countryCode="PR" value="1787">PR (+1787)</option>
		<option data-countryCode="QA" value="974">QA (+974)</option>
		<option data-countryCode="RE" value="262">RE (+262)</option>
		<option data-countryCode="RO" value="40">RO (+40)</option>
		<option data-countryCode="RU" value="7">RU (+7)</option>
		<option data-countryCode="RW" value="250">RW (+250)</option>
		<option data-countryCode="SM" value="378">SM (+378)</option>
		<option data-countryCode="ST" value="239">ST (+239)</option>
		<option data-countryCode="SA" value="966">SA (+966)</option>
		<option data-countryCode="SN" value="221">SN (+221)</option>
		<option data-countryCode="CS" value="381">CS (+381)</option>
		<option data-countryCode="SC" value="248">SC (+248)</option>
		<option data-countryCode="SL" value="232">SL (+232)</option>
		<option data-countryCode="SG" value="65">SG (+65)</option>
		<option data-countryCode="SK" value="421">SK (+421)</option>
		<option data-countryCode="SI" value="386">SI (+386)</option>
		<option data-countryCode="SB" value="677">SB (+677)</option>
		<option data-countryCode="SO" value="252">SO (+252)</option>
		<option data-countryCode="ZA" value="27">ZA (+27)</option>
		<option data-countryCode="ES" value="34">ES (+34)</option>
		<option data-countryCode="LK" value="94">LK (+94)</option>
		<option data-countryCode="SH" value="290">SH (+290)</option>
		<option data-countryCode="KN" value="1869">KN (+1869)</option>
		<option data-countryCode="SC" value="1758">SC (+1758)</option>
		<option data-countryCode="SD" value="249">SD (+249)</option>
		<option data-countryCode="SR" value="597">SR (+597)</option>
		<option data-countryCode="SZ" value="268">SZ (+268)</option>
		<option data-countryCode="SE" value="46">SE (+46)</option>
		<option data-countryCode="CH" value="41">CH (+41)</option>
		<option data-countryCode="SI" value="963">SI (+963)</option>
		<option data-countryCode="TW" value="886">TW (+886)</option>
		<option data-countryCode="TJ" value="7">TJ (+7)</option>
		<option data-countryCode="TH" value="66">TH (+66)</option>
		<option data-countryCode="TG" value="228">TG (+228)</option>
		<option data-countryCode="TO" value="676">TO (+676)</option>
		<option data-countryCode="TT" value="1868">TT (+1868)</option>
		<option data-countryCode="TN" value="216">TN (+216)</option>
		<option data-countryCode="TR" value="90">TR (+90)</option>
		<option data-countryCode="TM" value="7">TM (+7)</option>
		<option data-countryCode="TM" value="993">TM (+993)</option>
		<option data-countryCode="TC" value="1649">TC (+1649)</option>
		<option data-countryCode="TV" value="688">TV (+688)</option>
		<option data-countryCode="UG" value="256">UG (+256)</option>
		<option data-countryCode="GB" value="44">UK (+44)</option>
		<option data-countryCode="UA" value="380">UA (+380)</option>
		<option data-countryCode="AE" value="971">AE (+971)</option>
		<option data-countryCode="UY" value="598">UY (+598)</option>
		<option data-countryCode="US" value="1">US (+1)</option>
		<option data-countryCode="UZ" value="7">UZ (+7)</option>
		<option data-countryCode="VU" value="678">VU (+678)</option>
		<option data-countryCode="VA" value="379">VA (+379)</option>
		<option data-countryCode="VE" value="58">VE (+58)</option>
		<option data-countryCode="VN" value="84">VN (+84)</option>
		<option data-countryCode="VG" value="84">VG (+1284)</option>
		<option data-countryCode="VI" value="84">VI (+1340)</option>
		<option data-countryCode="WF" value="681">WF (+681)</option>
		<option data-countryCode="YE" value="969">YE (+969)</option>
		<option data-countryCode="YE" value="967">YE (+967)</option>
		<option data-countryCode="ZM" value="260">ZM (+260)</option>
		<option data-countryCode="ZW" value="263">ZW (+263)</option>
                            </Form.Control>
                            <Form.Control className={styles.in} ref={numref} value={phone} onChange={e => setPhone(e.target.value)} type="phone" placeholder="Phone Number" required/>
                            </Form.Group>
                            <div id="recaptcha" className="recaptcha"></div>
                            <Button className={styles.regbutton} onClick={clickHandler}>Join Now</Button>
                            <br/><br/>{userErr && <Alert variant="danger">{userErr}</Alert>}
                        </Form>
                        </div>

                <p className={styles.acc}>Already Have An Account? <Link to="/login"><a style={{textDecoration:"underline", cursor:"pointer"}}  className={styles.login} >Login</a></Link></p>
            </div>

        )
    return (
        <AuthProvider>
            <div>
                <NavBurger></NavBurger>
                 <div className="container">
                    <div className={styles.trophy}>
                        <a ><img src={trophy} alt="" width="100" height="100"></img></a>
                        <div className={styles.title}><h4>LOYALTY REWARDS</h4><p>P R O G R A M</p>
                        </div>
                    </div>
                    {boolCont && formInit}
                    <div className={styles.containerfluid2} style={boolCont2}>
                        <div className={styles.text1}>
                        <p>We have sent a verification SMS to your phone number</p></div>
                        <div className={styles.form}>
                        <Form className="verify">
                            <Form.Group controlId="formGroupPhone" className={styles.regform}>
                            <Form.Control className={styles.in} type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="883989438" />
                            <a style={{textDecoration:"underline", cursor:"pointer"}} className={styles.change} onClick={changeNumber}>Change</a>
                            </Form.Group >
                            <div id="recaptcha"></div>
                            <Form.Group controlId="formGroupOTP" className={styles.regform}>
                            <Form.Control type="text" name="otp" className={styles.otp} ref={otpref} placeholder="Enter Code Here" required/>
                            </Form.Group>

                            <Button className={styles.regbutton} onClick={veridone} >{counter}</Button>
                        </Form>
                        </div>

                        <p className={styles.login}>I didn't receive a code <a className={styles.login} onClick={changeNumber} style={{textDecoration:"underline", cursor:"pointer"}}>Resend</a></p>
                        <div style={verified}>
                            <br></br>
                            <h3>Your mobile has been verified, please fill the rest of the details to complete the registeration</h3>
                            <Form className={styles.complete} onSubmit={handleSubmit}>
                            <Form.Group controlId="formGroupFName" className={styles.regform}>
                            <Form.Control type="text" name="fname" ref={fnameref} placeholder="First Name" required/>
                            </Form.Group >
                            
                            <Form.Group controlId="formGroupLName" className={styles.regform}>
                            <Form.Control type="text" name="lname" ref={lnameref} placeholder="Last Name" required/>
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail" className={styles.regform}>
                            <Form.Control  ref={emailref} type="email" placeholder="Email (optional)" />
                            </Form.Group >
                            
                            <Form.Group controlId="formGroupCity" className={styles.regform}>
                            <Form.Control type="text" name="city" placeholder="City" ref={cityref} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPlace" className={styles.regform}>
                            <Form.Control className={styles.shared1} type="text" ref={regionref} name="region" placeholder="Region" />
                            <Form.Control className={styles.shared2} ref={postref} type="text" name="postcode" placeholder="Post Code" />
                            </Form.Group>
                            <p>Date Of Birth</p>
                            <Form.Group controlId="formGroupDOB" className={styles.regform}>
                            
                            <Form.Control type="date" name="date" ref={dobref} placeholder="Date Of Birth" />
                            </Form.Group>
                            <p>Create Password</p>
                            <Form.Group controlId="formGroupPswd" className={styles.regform}>
                            <Form.Control type="password" className={styles.shared1} name="pswd" ref={pwdref} placeholder="Enter Password" ref={pwdref} required/>
                            <Form.Control type="password" className={styles.shared2} name="cnfm_pswd" ref={pwdref} placeholder="Confirm Password" ref={cpwdref} required/>

                            </Form.Group>
                            <Form.Group controlId="formGroupRef" className={styles.regform}>
                            <Form.Control type="text" name="rcode" ref={coderef} placeholder="Enter Referral Code" />
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <Form.Group controlId="formBasicCheckbox" className={styles.regform}>
                                <Form.Check type="checkbox" name="offers" label="Keep me posted with offers" onClick={()=>{setOffer(!boolOffer)}}/>
                            </Form.Group>
                            <br/>
                            {error && <Alert variant="danger" style={{color:"red", fontSize:"small"}}>{error}</Alert>}
                            <Button type="submit" className={styles.regbtn}>Complete Registeration</Button><br/><br/>
                        </Form>
                        </div>
                    </div>
                </div>
                
            </div>
            </AuthProvider>
        
        
    )

}
export default Register;