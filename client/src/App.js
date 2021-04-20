import react, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Dashboard';
import Cookies from 'js-cookie';
import MedicalExamination from './Components/Dashboard/MedicalExamination/MedicalExamination';
import MedicalExamination2 from './Components/Dashboard/MedicalExamination-2/MedicalExamination2';
import Error from './Components/UI/404Error/404Error';

class App extends Component {

  constructor(props)
  {
    super(props);
  }
  
  render() {

    return (
      <>
        <Switch>
          <Route exact path='/' component={MedicalExamination2} />

          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/candidateinfo' component={ Dashboard } />
          <Route exact path='/candidatereport' component={ Dashboard } />
          <Route exact path='/createuser' component={ Dashboard } />
          <Route exact path='/MedicalExamination' component={ Dashboard } />

          <Route exact path='/login' component={LoginForm} />
          <Route>
            <Error />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
