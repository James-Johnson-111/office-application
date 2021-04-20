import Cookies from 'js-cookie';
import react, { Component } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import CandidateForm from './CandidateForm/CandidateForm';
import CreateUser from './CreateUser/CreateUser';

import './Dashboard.css';
import DashboardHome from './DashboardHome/DashboardHome';
import MedicalExamination from './MedicalExamination/MedicalExamination';
import ReportPanel from './ReportPanel/ReportPanel';

class Dashboard extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            sideBar: false
        }

    }

    componentDidMount()
    {

        if( Cookies.get('LoginID') === undefined )
        {

            this.props.history.push('/login');

        }

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
        this.props.history.push('/login');

    }

    render()
    {

        let createUser = null;

        if(Cookies.get('LoginID') != undefined && Cookies.get('LoginID') == 'Admin')
        {
            createUser = <div className="d-grid other-grids"><Link to='/createuser'>Create New User</Link></div>;
        }

        return(
                <div className="Dashboard">
                    <div className="top_bar d-flex justify-content-between">
                        <div className="d-grid">
                            <Link to="/" className="Dashboard_logo">Labonline</Link>
                        </div>
                        <div className="d-grid other-grids">
                            <input type="search" className="form-control" placeholder="search keywords" />
                        </div>
                        <div className="d-grid other-grids"></div>
                        <div className="d-grid other-grids"></div>
                        <div className="d-grid other-grids">
                        </div>
                        
                        <div className="d-grid d-tablet-block">
                            <button className="btn text-white px-0" onClick={this.openSideBar}>
                                <i class="las la-ellipsis-v la-2x"></i>
                            </button>
                        </div>

                        {createUser}
                    </div>
                    <div className="side_fixed_bar">
                        <button className="btn btn-block text-white p-0" onClick={this.openSideBar}>
                            <i className="las la-bars la-2x"></i>
                        </button>

                        <div className='h-100' style={ { 'display' : 'grid', 'alignItems' : 'center' } }>
                            <div>
                                <a href="##" className="d-block text-center">
                                    <i className="lab la-facebook la-2x text-white py-3"></i>
                                </a>
                                <a href="##" className="d-block text-center">
                                    <i className="lab la-twitter la-2x text-white py-3"></i>
                                </a>
                                <a href="##" className="d-block text-center">
                                    <i className="lab la-instagram la-2x text-white py-3"></i>
                                </a>
                                <a href="##" className="d-block text-center">
                                    <i className="lab la-google-drive la-2x text-white py-3"></i>
                                </a>
                            </div>
                        </div>
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
                            <Link onClick={this.logout}>Logout</Link>
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link to='/MedicalExamination'>MedicalExamination</Link>
                        </div>
                    </div>
                    <div className="rendering">
                        <Switch>
                            <Route exact path='/dashboard' component={DashboardHome} />
                            <Route exact path='/candidateinfo' component={CandidateForm} />
                            <Route exact path='/candidatereport' component={ReportPanel} />
                            <Route exact path='/createuser' component={CreateUser} />
                            <Route exact path='/MedicalExamination' component={MedicalExamination} />
                        </Switch>
                    </div>
                </div>

        );

    }

}

export default Dashboard;