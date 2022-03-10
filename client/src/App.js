import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm/LoginForm';  
import NewDashboard from './Components/Dashboard/NewDashboard';
import Error from './Components/UI/404Error/404Error';
import Logout from './Components/Auth/Logout/Logout';
import GetToken from './Components/GetToken/GetToken';
import ToCandidate from './Components/ToCandidate/ToCandidate';
import Token from './Components/Token/Token';

const App = () => {
  
  return (
    <>
      <Switch>
        <Route exact path='/' component={ NewDashboard } />
        <Route exact path='/dashboard' component={ NewDashboard } />
        <Route exact path='/candidateinfo' component={ NewDashboard } />
        <Route exact path='/reports' component={ NewDashboard } />
        <Route exact path='/gettoken' component={ GetToken } />
        <Route exact path='/createuser' component={ NewDashboard } />
        <Route exact path='/token' component={ Token } />
        <Route exact path='/welcomecandidate/:id' component={ ToCandidate } />

        <Route exact path='/login' component={ LoginForm } />
        <Route exact path='/logout' component={ Logout } />
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}

export default App;
