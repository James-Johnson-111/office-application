import Cookies from 'js-cookie';
import React, { Component } from 'react';

import './DashboardHome.css';
import Loading from '../../UI/Loading/Loading';
import $ from 'jquery';
import axios from '../../../axios-instance';

class DashboardHome extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            loading: true,
            startProcess: false,
            startProcessTxt: 'Start Process'

        }

    }

    componentDidMount()
    {

        if( Cookies.get('ProcessStatus') !== undefined )
        {
            this.setState( { startProcess: true, startProcessTxt: Cookies.get('ProcessStatus') } );
        }
        this.setState( { loading: false } );

    }

    startStopP = () => {
        
        let date = new Date();
        date.setTime(date.getTime() + (0.10 * 1000));

        if( this.state.startProcess )
        {
            $('.startBtn').html('Start');
            Cookies.set('ProcessStatus', 'Process Has Stoped', { expires: date });
            this.setState( { startProcess: false, startProcessTxt: 'Start Process' } );

        }else
        {
            $('.startBtn').html('Stop');
            Cookies.set('ProcessStatus', 'Process Has Started', { expires: date });
            this.setState( { startProcess: true, startProcessTxt: 'Loading...' } );

            const Data = new FormData();
            Data.append( 'logger', Cookies.get('LoginID') );
            axios.post('/startprocess', Data ).then( response => {

                this.setState( { startProcessTxt: 'Process Has Started' } );

            } ).catch( error => {

                this.setState( { startProcessTxt: 'Operation Failed' } );

                setTimeout( () => {

                    this.setState( { startProcess: false, startProcessTxt: 'Start Process' } );

                }, 1500 );

            } )

        }

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="DashboardHome w-100">
                    <div className="container-fluid DashboardHome-content">
                        <div className="row border-bottom">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">About</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contacts</a>
                                            <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Others</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                {/* Empty */}
                            </div>
                        </div>

                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between px-5 startProcessDiv">
                                            <div className="d-grid">
                                                <p className="mb-1 strtprtxt"> { this.state.startProcessTxt } </p>
                                            </div>
                                            <div>
                                                <button className="btn btn-sm startBtn" onClick={this.startStopP}>Start</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <h1>second</h1>
                            </div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <h1>third</h1>
                            </div>
                            <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                <h1>forth</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default DashboardHome;