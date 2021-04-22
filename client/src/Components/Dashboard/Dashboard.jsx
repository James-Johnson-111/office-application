import Cookies from 'js-cookie';
import react, { Component } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Loading from '../UI/Loading/Loading';
import CandidateForm from './CandidateForm/CandidateForm';
import CreateUser from './CreateUser/CreateUser';

import './Dashboard.css';
import DashboardHome from './DashboardHome/DashboardHome';
import LaboratoryInvestigation from './LaboratoryInvestigation/LaboratoryInvestigation';
import MedicalExamination2 from './MedicalExamination-2/MedicalExamination2';
import MedicalExamination from './MedicalExamination/MedicalExamination';
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

        if( Cookies.get('LoginID') === undefined )
        {

            this.props.history.push('/login');

        }else
        {

            this.props.history.push('/dashboard');

        }

        this.setState( { loading: false } );

    }

    openSideBar = () => {

        this.setState( { loading: true } );

        if(this.state.sideBar)
        {
            this.setState( { sideBar: false } );
            this.setState( { loading: false } );
        }else
        {
            this.setState( { sideBar: true } );
            this.setState( { loading: false } );
        }

    }

    logout = () => {

        this.setState( { loading: true } );
        Cookies.remove('LoginID');
        this.props.history.push('/login');

    }

    render()
    {

        let createUser = null;

        if(Cookies.get('LoginID') != undefined && Cookies.get('LoginID') == 'Admin')
        {
            createUser = <Link to='/createuser' className="text-center">Create New User</Link>;
        }

        return(
                
            <>
                <Loading show={this.state.loading} />
                <div className="Dashboard">
                    <div className="top_bar d-flex justify-content-between">
                        <div className="d-grid">
                            <Link to="/dashboard" className="Dashboard_logo">Labonline</Link>
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
                        <div className="d-grid other-grids">
                            {createUser}
                        </div>
                    </div>
                    <div className="side_fixed_bar">
                        <button className="btn btn-block text-white p-0" onClick={this.openSideBar}>
                            <i className="las la-bars la-2x"></i>
                        </button>

                        <div className='h-100' style={{ 'display': 'grid', 'alignItems': 'center' }}>
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
                            <Link to={ "/candidateinfo/" + 10 }>Candidate Info</Link>
                        </div>
                        <div className="action_links sub-links" onClick={this.openSideBar}>
                            <Link to={ '/MedicalExamination/' + 10 }>MedicalExamination</Link>
                        </div>
                        <div className="action_links sub-links" onClick={this.openSideBar}>
                            <Link to={ '/MedicalExamination2/' + 10 }>MedicalExamination2</Link>
                        </div>
                        <div className="action_links sub-links" onClick={this.openSideBar}>
                            <Link to={ '/LaboratoryInvestigation/' + 10 }>Laboratory Investigation</Link>
                        </div>
                        <div className="action_links d-mobile-block" onClick={this.openSideBar}>
                            {createUser}
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link to="/candidatereport">Reports</Link>
                        </div>
                        <div className="action_links" onClick={this.openSideBar}>
                            <Link onClick={this.logout}>Logout</Link>
                        </div>
                    </div>
                    <div className="rendering">
                        <Switch>
                            <Route exact path='/dashboard' component={DashboardHome} />
                            <Route exact path='/candidateinfo/:id' component={CandidateForm} />
                            <Route exact path='/candidatereport' component={ReportPanel} />
                            <Route exact path='/createuser' component={CreateUser} />
                            <Route exact path='/MedicalExamination/:id' component={MedicalExamination} />
                            <Route exact path='/MedicalExamination2/:id' component={MedicalExamination2} />
                            <Route exact path='/LaboratoryInvestigation/:id' component={LaboratoryInvestigation} />
                        </Switch>
                    </div>
                </div>
            </>

        );

    }

}

export default Dashboard;