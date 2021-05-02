import react, { Component } from 'react';

import './ReportPanel.css';
import axios from 'axios';
// import axios from '../../../axios-instance';
import Modal from '../../UI/Modal/Modal';
import $ from "jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../UI/Loading/Loading';
import Cookies from 'js-cookie';

class ReportPanel extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            candidateInfo: {
                ID: null,
                Token: null
            },
            candidateReportInfo: {},
            showRecordModal: false,
            loading: true,
            getAllThroughDate: [],
            getAllThroughToken: {},
            getAllThroughShift: [],
            SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>,
            SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>,
            SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5>

        }

    }

    componentDidMount()
    {

        $('form').on('submit', function() {

            $('input[type=text][name=ID]').val('');

        } )
        
        this.setState( { loading: false } );

    }

    getDate = ( value ) => {

        let getSplit = value.split('-');
        let year = getSplit[0];
        let month = getSplit[1];
        let date = getSplit[2];

        let removeZeroFromMonth = month.substring(1,2);
        let getCorrectMonth = removeZeroFromMonth - 1;

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let getMonthName = monthNames[getCorrectMonth];

        let WhatTheCorrectDate = year + "-" + getMonthName + "-" + date;
        return WhatTheCorrectDate;

    }

    onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = {

            ...this.state.candidateInfo,
            [name]: value

        }
        this.setState( { candidateInfo: setValues } );

    }

    ManualEntryThrougID = ( event ) => {

        event.preventDefault();
        this.setState( { loading: true } );
        const formsData = new FormData();

        formsData.append('CandidateID', this.state.candidateInfo.ID);

        axios.post( '/getcandidatethroughid', formsData ).then( response => {

            if( response.data[0] == undefined )
            {

                this.setState( { loading: false } );
                toast.dark("No Records Found", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            }else
            {

                for( let key in response.data )
                {

                    this.setState( { candidateReportInfo: response.data[key] } );

                }

                this.setState( { showRecordModal: true, loading: false } );

            }

        } ).catch( error => {

            this.setState( { loading: false } );

            toast.dark("Network Error 500 please check your network connection", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        } )

    }

    modalToggle = ( event ) => {

        event.preventDefault();

        if(this.state.showRecordModal)
        {

            this.setState( { showRecordModal: false } );

        }else
        {

            this.setState( { showRecordModal: true } );

        }

    }

    getDataThroughDate = ( event ) => {

        this.setState( { loading: true } );
        const { value } = event.target;

        const formsData = new FormData();
        formsData.append( 'date', this.getDate(value) );

        axios.post( '/getdatathroughdate', formsData ).then( response => {

            this.setState( { loading: false } );
            this.setState( { getAllThroughDate: response.data } );

            if( this.state.getAllThroughDate == 0 )
            {

                toast.dark("No Record Found", {
                    position: 'bottom-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            }

        } ).catch( error => {

            this.setState( { loading: false } );

            toast.dark("Network Error 500 please check your network connection", {
                position: 'bottom-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        } )

    }

    getDataThroughToken = ( event ) => {

        event.preventDefault();
        this.setState( { loading: true } );
        const formsData = new FormData();
        formsData.append('token', this.state.candidateInfo.Token);
        axios.post('/gettokendata', formsData).then(response => {

            if (response.data[0] == "N") {
                
                this.setState( { loading: false } );

                toast.dark("Not Found", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            } else {

                this.setState( { loading: false } );
                for( let key in response.data )
                {

                    this.setState( { candidateReportInfo: response.data[key] } );

                }

                this.setState( { showRecordModal: true, loading: false } );

            }

        }).catch(err => {

            this.setState( { loading: false } );
            toast.dark("Network Error 500 please check your network connection", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        });

    }

    getDataThroughShift = ( event ) => {

        this.setState( { loading: true } );
        const { value } = event.target;
        if( value !== "nothing" )
        {

            const formsData = new FormData();
            formsData.append('shift', value);

            axios.post('getcandidatethroughtime', formsData).then(response => {

                this.setState({ loading: false });
                this.setState({ getAllThroughShift: response.data });

                if (this.state.getAllThroughShift == 0) {

                    toast.dark("No Record Found", {
                        position: 'bottom-center',
                        progressClassName: 'success-progress-bar',
                        autoClose: 3000,
                    });

                }

            }).catch(error => {

                toast.dark("Network Error 500 please check your network connection", {
                    position: 'bottom-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            })

        }else
        {

            this.setState( { loading: false } );

        }

    }

    getCandidate = ( passport ) => {

        const formsData = new FormData();
        formsData.append( 'passport', passport );
        axios.post( '/getcandidatethroughpassport', formsData ).then( response => {

            for (let key in response.data) 
            {

                this.setState({ candidateReportInfo: response.data[key] });

            }

            this.setState({ showRecordModal: true, loading: false });

        } ).catch( error => {

            this.setState( { loading: false } );

            toast.dark("Network Error 500 please check your network connection", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        } )

    }

    ChangeToTextField = ( whichOne ) => {

        let txt = null;
        if( whichOne == 'SByToken' )
        {
            txt = <> <input type="text" className="form-control form-control-sm rounded-0 SbyTDSInput" placeholder="Token NO." /> </>
            this.setState( { SByTokenTxt: txt, SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne == 'SByDate' )
        {
            txt = <> <input type="date" className="form-control form-control-sm rounded-0 SbyTDSInput" onChange={this.getDataThroughDate} /> </>
            this.setState( { SByDateTxt: txt, SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne == 'SByShift' )
        {
            txt = <> <input type="text" className="form-control form-control-sm rounded-0 SbyTDSInput" /> </>
            this.setState( { SByShiftTxt: txt, SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>, SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5> } );
        }

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="GetCandidate w-100">
                    <div className="container-fluid">
                        <div className="row border-bottom">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Candidate</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Reports</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Anything Else</a>
                                            <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Others</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <div className="d-flex justify-content-center user_box">
                                    <div className="">
                                        <img
                                            src="https://d1bvpoagx8hqbg.cloudfront.net/259/0f326ce8a41915e8b1d21ffaee087fae.jpg"
                                            width="30"
                                            height="30"
                                            className="rounded-circle"
                                        />
                                    </div>
                                    <div className="d-grid px-3">
                                        <p>Usman Badar</p>
                                    </div>
                                    <div className="d-grid">
                                        <p><i className="las la-user-secret"></i></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="search_options d-grid">
                                            <div className="d-flex justify-content-center">
                                                <div className="row sec" onClick={ () => this.ChangeToTextField('SByToken') }>
                                                    <div className="col-4 pr-0 text-center">
                                                        <i className="las la-money-bill-wave"></i>
                                                    </div>
                                                    <div className="col-8 pl-0 text-left d-grid">
                                                        {this.state.SByTokenTxt}
                                                    </div>
                                                </div>
                                                <div className="row sec" onClick={ () => this.ChangeToTextField('SByDate') }>
                                                    <div className="col-4 pr-0 text-center">
                                                        <i className="las la-calendar-day"></i>
                                                    </div>
                                                    <div className="col-8 pl-0 text-left d-grid">
                                                        {this.state.SByDateTxt}
                                                    </div>
                                                </div>
                                                <div className="row sec" onClick={ () => this.ChangeToTextField('SByShift') }>
                                                    <div className="col-4 pr-0 text-center">
                                                        <i className="las la-sun"></i>
                                                    </div>
                                                    <div className="col-8 pl-0 text-left d-grid">
                                                        {this.state.SByShiftTxt}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row search_result">
                                    <div className="container-fluid">
                                        <div className="row">
                                            {
                                                this.state.getAllThroughDate.map( ( data, index ) => {

                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                                                            <div className="candidate_info_div">
                                                                <div className="row">
                                                                    <div className="col-6 text-center">
                                                                        <img
                                                                            src="data:image/jpeg;base64,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"
                                                                            width="100"
                                                                            height='100'
                                                                        />
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <h5 className="mb-0 font-weight-bolder">{data.candidate_name}</h5>
                                                                        <p>{data.candidate_nationality}</p>
                                                                        <button className="btn btn-sm btn-block">View Details</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <h1>Reports</h1>
                            </div>
                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <h1>Anything Else</h1>
                            </div>
                            <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                <h1>Others</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />
            </>

        );

    }

}

export default ReportPanel;