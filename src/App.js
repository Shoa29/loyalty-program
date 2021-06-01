import logo from './logo.svg';
import './App.css';
import Login from './login/Login'
import StoreLogin from './login/Storelogin'
import FP from './FP/forgotpwd'
import Sent from './FP/Sent'
import Reset from './FP/Reset'
import Register from './Register/Register'
import {AuthProvider} from './contexts/AuthContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Bprofile from './Profiles/bprofile'

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
        <Switch>
        <Route path="/" exact component={Register}/>
  
        <Route path="/login" exact component={Login}/>
        <Route path="/storelogin" exact component={StoreLogin}/>
        <Route path="/forgot" exact component={FP}/>
        <Route path="/sent" exact component={Sent}/>
        <Route path="/reset/:email" exact component={Reset}/>
        <Route path="/business_profile" exact component={Bprofile}/>

        </Switch>
        </AuthProvider>
      </div>
    </Router>
    
  );
}

export default App;
