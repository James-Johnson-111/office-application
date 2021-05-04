import react, { Component } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import './NewDashboard.css';
import NewCandidateInfo from './CandidateInfo/NewCandidateInfo';
import Report from './ReportPanel/ReportPanel';
import $ from 'jquery';

class Dashboard extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            tokenNO: null,
            show: true,
            isShowed: false,
            isHided: false
        }

    }

    componentDidMount()
    {

        if( Cookies.get('LoginID') === undefined || Cookies.get('LoginID') == null )
        {

            this.props.history.push('/login');

        }

        let uniqueID = () => {

            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);

        }
        Cookies.set('tokenNo', uniqueID());
        this.setState( { tokenNO: uniqueID() } );

    }

    openClose = () => {

        if( this.state.show )
        {
            this.setState( { show: false } );
        }else
        {
            this.setState( { show: true } );
        }

    }

    render()
    {

        return(

            <>
                <div className="NewDashboard">
                    <button className='btn fixed_btn' onClick={this.openClose} ><i className="lab la-openid"></i></button>
                    <div className="side_bar" style={ { 'left' : this.state.show ? '0' : '-100%' } }>
                        <h3 className="text-center pt-3 pb-0 mb-0">
                            lab official
                            <div>online laboratory</div>
                        </h3>
                        <hr />
                        <div className="clear_float"></div>
                        <div className="d-grid">
                            <div className="side-links">
                                <NavLink activeClassName="linkActive" to={ "/dashboard" }>
                                    <div className="d-grid pr-1">
                                        <i className="las la-home"></i>
                                    </div>
                                    <div className="d-grid pl-1">
                                        dashboard
                                    </div>
                                </NavLink>
                                <NavLink activeClassName="linkActive" to={ "/candidateinfo" }>
                                    <div className="d-grid pr-1">
                                        <i className="las la-info-circle"></i>
                                    </div>
                                    <div className="d-grid pl-1">
                                        candidate info
                                    </div>    
                                </NavLink>
                                <NavLink activeClassName="linkActive" to="/reports">
                                    <div className="d-grid pr-1">
                                        <i className="las la-print"></i>
                                    </div>
                                    <div className="d-grid pl-1">
                                        reports
                                    </div>
                                </NavLink>
                            </div>
                            <div className="logout_div">
                                <div className="side-links mb-0 pb-0">
                                    <NavLink activeClassName="linkActive" to="/logout" className="mb-0">
                                        <div className="d-grid pr-1">
                                            <i className="las la-sign-out-alt"></i>
                                        </div>
                                        <div className="d-grid pl-1">
                                            Logout
                                        </div>
                                    </NavLink>
                                    <hr />
                                    <div className="clear_float"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <Switch>
                            <Route path='/candidateinfo' component={NewCandidateInfo} />
                            <Route path='/reports' component={Report} />
                        </Switch>
                    </div>
                </div>
            </>
            
        )

    }

}


export default Dashboard;