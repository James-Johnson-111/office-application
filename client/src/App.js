import react, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Dashboard';
import Cookies from 'js-cookie';
import NoLoggedIn from './Components/UI/NoLoggedIn/NoLoggedIn';
import MedicalExamination from './Components/Dashboard/MedicalExamination/MedicalExamination';

class App extends Component {

  constructor(props)
  {
    super(props);
  }
  
  render() {

    let navbar = null;

    if(window.location.href == '/')
    {
      navbar = <Navbar />;
    }

    return (
      <>
        {/* {navbar} */}
        <Navbar />
        <Switch>
          <Route exact path='/' component={MedicalExamination} />

          <Route exact path='/dashboard' component={ Cookies.get('LoginID') != null ? Dashboard : NoLoggedIn } />
          <Route exact path='/candidateinfo' component={ Cookies.get('LoginID') != null ? Dashboard : NoLoggedIn } />
          <Route exact path='/candidatereport' component={ Cookies.get('LoginID') != null ? Dashboard : NoLoggedIn } />
          <Route exact path='/createuser' component={ Cookies.get('LoginID') != null ? Dashboard : NoLoggedIn } />
          <Route exact path='/MedicalExamination' component={ Cookies.get('LoginID') != null ? Dashboard : NoLoggedIn } />

          <Route exact path='/login' component={LoginForm} />
          <Route component={Dashboard} />
          <Route>
            <LoginForm />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
