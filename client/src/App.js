import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm/LoginForm';  
import NewDashboard from './Components/Dashboard/NewDashboard';
import Error from './Components/UI/404Error/404Error';
import Logout from './Components/Auth/Logout/Logout';
import GetToken from './Components/GetToken/GetToken';
import ToCandidate from './Components/ToCandidate/ToCandidate';

const App = () => {
  
  return (
    <>
      <Switch>
        <Route exact path='/' component={ NewDashboard } />
        <Route path='/dashboard' component={ NewDashboard } />
        <Route path='/candidateinfo' component={ NewDashboard } />
        <Route path='/reports' component={ NewDashboard } />
        <Route path='/gettoken' component={ GetToken } />
        <Route path='/createuser' component={ NewDashboard } />
        <Route path='/welcomecandidate/:id' component={ ToCandidate } />

        <Route path='/login' component={ LoginForm } />
        <Route path='/logout' component={ Logout } />
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}

export default App;
