import react, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './Components/Auth/LoginForm/LoginForm';
import Dashboard from './Components/Dashboard/Dashboard';
import NewDashboard from './Components/Dashboard/NewDashboard';
import Error from './Components/UI/404Error/404Error';
import Logout from './Components/Auth/Logout/Logout';

class App extends Component {

  constructor(props)
  {
    super(props);
  }
  
  render() {

    return (
      <>
        <Switch>
          <Route exact path='/' component={ NewDashboard } />
          <Route path='/candidateinfo' component={ NewDashboard } />
          <Route path='/reports' component={ NewDashboard } />

          <Route path='/login' component={ LoginForm } />
          <Route path='/logout' component={ Logout } />
          <Route>
            <Error />
          </Route>
        </Switch>
      </>
    );

  }
}

export default App;
