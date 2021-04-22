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
import LaboratoryInvestigation from './Components/Dashboard/LaboratoryInvestigation/LaboratoryInvestigation';

class App extends Component {

  constructor(props)
  {
    super(props);
  }
  
  render() {

    return (
      <>
        <Switch>
          <Route exact path='/' component={ Dashboard } />

          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/candidateinfo/:id' component={ Dashboard } />
          <Route exact path='/candidatereport' component={ Dashboard } />
          <Route exact path='/createuser' component={ Dashboard } />
          <Route exact path='/MedicalExamination/:id' component={ Dashboard } />
          <Route exact path='/MedicalExamination2/:id' component={ Dashboard } />
          <Route exact path='/LaboratoryInvestigation/:id' component={ Dashboard } />

          <Route exact path='/login' component={ LoginForm } />
          <Route>
            <Error />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
