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
            modalHeight: null,
            loading: true,
            getAllThroughDate: [],
            getAllThroughToken: {},
            getAllThroughShift: []
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

    render()
    {

        let Records = null;

        if( Object.keys(this.state.candidateReportInfo).length === 0 )
        {
            Records = "No Records Found Please Enter The Correct ID.";
        }else
        {

            Records = (
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate ID
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_id}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Name
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Passport
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_passport}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Age
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_age}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Nationality
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_nationality}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Marital Status
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_marital_status}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Profession
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.candidate_profession}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Insertion Date
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.insert_date}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Inserted By
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.insert_by}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Edition Date
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.edit_date}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 d-grid">
                                <p style={ { 'fontSize' : '10px' } }>
                                    Candidate Edit By
                                </p>
                            </div>
                            <div className="col-9 mb-3">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control form-control-sm"
                                    value={this.state.candidateReportInfo.edit_by}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )

        }

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="ReportPanel">
                    <Modal top={this.state.modalHeight} show={this.state.showRecordModal} close={this.modalToggle}>
                        {Records}
                    </Modal>
                    <div className="ReportPanel-inner d-flex justify-content-center">
                        <div className="ReportPanel-content">
                            <h3 className="mb-3">Report Panel</h3>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="manualEntry-tab" data-toggle="tab" href="#manualEntry" role="tab" aria-controls="manualEntry" aria-selected="true">Manual Entry</a>
                                    <a className="nav-item nav-link" id="QR-codeScan-tab" data-toggle="tab" href="#QR-codeScan" role="tab" aria-controls="QR-codeScan" aria-selected="false">QR Code Scan</a>
                                </div>
                            </nav>
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="manualEntry" role="tabpanel" aria-labelledby="manualEntry-tab">

                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="throughID-tab" data-toggle="tab" href="#throughID" role="tab" aria-controls="throughID" aria-selected="true">Through ID</a>
                                            <a className="nav-item nav-link" id="throughDate-tab" data-toggle="tab" href="#throughDate" role="tab" aria-controls="throughDate" aria-selected="false">Through Date</a>
                                            <a className="nav-item nav-link" id="throughToken-tab" data-toggle="tab" href="#throughToken" role="tab" aria-controls="throughToken" aria-selected="false">Through Token</a>
                                            <a className="nav-item nav-link" id="throughTime-tab" data-toggle="tab" href="#throughTime" role="tab" aria-controls="throughTime" aria-selected="false">Through Time</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">

                                        <div className="tab-pane fade show active" id="throughID" role="tabpanel" aria-labelledby="throughID-tab">

                                            <div className="container">

                                                <form onSubmit={this.ManualEntryThrougID}>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-3 col-sm-12 d-grid mb-3">
                                                            <div>
                                                                Candidate ID
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-9 col-md-9 col-sm-12 mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm rounded-0"
                                                                name="ID"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="col-12 d-grid mb-3">
                                                            <button className="btn btns" type='submit'>Search</button>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>

                                        </div>

                                        <div className="tab-pane fade" id="throughDate" role="tabpanel" aria-labelledby="throughDate-tab">
                                            <h4 className="text-center my-4">Please select a date</h4>
                                            <div className="px-lg-5 px-md-4 px-sm-0">
                                                <input
                                                    type="date"
                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                    onChange={this.getDataThroughDate}
                                                />
                                            </div>

                                            <div className="Alldata pt-4 container-fluid">
                                                {
                                                    this.state.getAllThroughDate.map( ( data, index ) => {

                                                        return (

                                                            <>
                                                                <div className="row">
                                                                    <div className="col-lg-1 col-md-1 col-sm-12 d-grid pr-0 pt-2 pb-1" key={ index }>
                                                                        <div className="col-12 px-0"> <span className="d-mobile-block">Result No. <b>{ index }</b></span> <span className="d-mobile-none"> { index } </span> </div>
                                                                    </div>
                                                                    <div className="col-lg-11 col-md-11 colsm-12 d-grid border-top border-left border-right pt-2 pb-1">
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-12"> <b>{data.candidate_name}</b> </div>
                                                                            <div className="col-lg-5 col-md-6 col-sm-12"> <b>Passport No.</b> {data.candidate_passport} </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-12"> <b onClick={ () => { this.getCandidate( data.candidate_passport ) } } className="text-primary" style={ { 'cursor' : 'pointer' } }>View Details</b> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>

                                                        )

                                                    } )
                                                }
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="throughToken" role="tabpanel" aria-labelledby="throughToken-tab">
                                            <h4 className="text-center my-4">Please enter a valid token No.</h4>
                                            <div className="px-lg-5 px-md-4 px-sm-0">
                                                <form onSubmit={this.getDataThroughToken}>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        placeholder="Token"
                                                        onChange={this.onChangeHandler}
                                                        name="Token"
                                                    />
                                                    <button className="btn btn-sm btns btn-block">
                                                        Search
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="throughTime" role="tabpanel" aria-labelledby="throughTime-tab">
                                            <h4 className="text-center my-4">Please select shift</h4>
                                            <div className="px-lg-5 px-md-4 px-sm-0">
                                                <select 
                                                    name="" 
                                                    className="form-control form-control-sm rounded-0" 
                                                    onChange={this.getDataThroughShift}
                                                >
                                                    <option value="nothing" selected>Please select shif</option>
                                                    <option value="DayShift">Day</option>
                                                    <option value="NightShift">Night</option>
                                                </select>
                                            </div>

                                            <div className="Alldata pt-4 container-fluid">
                                                {
                                                    this.state.getAllThroughShift.map( ( data, index ) => {

                                                        return (

                                                            <>
                                                                <div className="row">
                                                                    <div className="col-lg-1 col-md-1 col-sm-12 d-grid pr-0 pt-2 pb-1" key={ index }>
                                                                        <div className="col-12 px-0"> <span className="d-mobile-block">Result No. <b>{ index }</b></span> <span className="d-mobile-none"> { index } </span> </div>
                                                                    </div>
                                                                    <div className="col-lg-11 col-md-11 colsm-12 d-grid border-top border-left border-right pt-2 pb-1">
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-12"> <b>{data.candidate_name}</b> </div>
                                                                            <div className="col-lg-5 col-md-6 col-sm-12"> <b>Passport No.</b> {data.candidate_passport} </div>
                                                                            <div className="col-lg-3 col-md-6 col-sm-12"> <b onClick={ () => { this.getCandidate( data.candidate_passport ) } } className="text-primary" style={ { 'cursor' : 'pointer' } }>View Details</b> </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>

                                                        )

                                                    } )
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className="tab-pane fade" id="QR-codeScan" role="tabpanel" aria-labelledby="QR-codeScan-tab">
                                    Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
					            </div>
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