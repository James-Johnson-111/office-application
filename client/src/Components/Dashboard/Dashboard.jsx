import Cookies from 'js-cookie';
import react, { Component } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Loading from '../UI/Loading/Loading';
import CandidateForm from './CandidateForm/CandidateForm';
import CreateUser from './CreateUser/CreateUser';

import './Dashboard.css';
import ReportPanel from './ReportPanel/ReportPanel';

class Dashboard extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            sideBar: false,
            loading: true
        }

    }

    componentDidMount()
    {

        this.setState( { loading: false } );

    }

    openSideBar = () => {

        if(this.state.sideBar)
        {
            this.setState( { sideBar: false } );
        }else
        {
            this.setState( { sideBar: true } );
        }

    }

    logout = () => {

        Cookies.remove('LoginID');
        // this.props.history.replace('/login');

    }

    render()
    {

        let createUser = null;

        if(Cookies.get('LoginID') != null && Cookies.get('LoginID') == 'Admin')
        {
            createUser = <div className="d-grid"><Link to='/createuser'>Create New User</Link></div>;
        }

        return(
            <>
                <div className="Dashboard">
                    <div className="top_bar d-flex justify-content-lg-between">
                        <div className="d-grid">
                            <h3>Labonline</h3>
                        </div>
                        <div className="d-grid">
                            <input type="search" className="form-control" placeholder="search keywords" />
                        </div>
                        <div className="d-grid"></div>
                        <div className="d-grid"></div>
                        <div className="d-grid">
                            <div>
                                <a href="##">
                                    <i className="lab la-facebook"></i>
                                </a>
                                <a href="##">
                                    <i className="lab la-facebook"></i>
                                </a>
                                <a href="##">
                                    <i className="lab la-facebook"></i>
                                </a>
                                <a href="##">
                                    <i className="lab la-facebook"></i>
                                </a>
                            </div>
                        </div>
                        {createUser}
                    </div>
                    <div className="side_fixed_bar">
                        <button className="btn btn-block text-white" onClick={this.openSideBar}>
                            <i className="las la-bars la-2x"></i>
                        </button>
                    </div>
                    <div className="side_bar" style={{ 'transform': this.state.sideBar ? 'translateX(0)' : 'translateX(-100%)' }}>
                        <div className="d-flex justify-content-lg-start">
                            <button className="btn text-white" onClick={this.openSideBar}>
                                <i className="las la-arrow-left"></i>
                            </button>
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link to="/candidateinfo">Candidate Info</Link>
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link to="/candidatereport">Reports</Link>
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link to='' onClick={this.logout}>Logout</Link>
                        </div>
                    </div>
                    <Loading show={this.state.loading} />
                    <div className="rendering" style={{ 'display': this.state.loading ? 'none' : 'block' }}>
                        <Switch>
                            <Route exact path='/candidateinfo' component={CandidateForm} />
                            <Route exact path='/candidatereport' component={ReportPanel} />
                            <Route exact path='/createuser' component={CreateUser} />
                        </Switch>
                    </div>
                </div>
            </>

        );

    }

}

export default Dashboard;