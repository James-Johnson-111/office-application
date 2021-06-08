import React, { Component } from 'react';

import './ReportPanel.css';
import axios from '../../../axios-instance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../UI/Loading/Loading';
import Modal from '../../UI/Modal/Modal';
import Cookies from 'js-cookie';

class ReportPanel extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            getTime: {
                time1: null,
                time2: null
            },
            loading: true,
            getAllCandidates: [],
            detailsData: [],
            report: [],
            SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>,
            SByDateTxt: <h5 className="text-uppercase mb-0 py-3 sebyda">Search By Date</h5>,
            SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5>,
            showModal: false,
            showData: 6,
            showReportModal: false

        }

    }

    componentDidMount()
    {

        this.setState( {loading: false } );
        window.addEventListener( 'scroll', () => {

            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if ( scrollTop + clientHeight >= scrollHeight )
            {
                
                this.showMore();

            }

        } );

    }

    showMore = () => {

        setTimeout( () => {

            let three = 3;
            let cards = this.state.showData + three;
            this.setState({ showData: cards });

        }, 300 );

    }

    getDate = ( value ) => {

        let getSplit = value.split('-');
        let year = getSplit[0];
        let month = getSplit[1];
        let date = getSplit[2];
        let startWithZero = date.startsWith('0');

        if( startWithZero )
        {
            date = date.substring(1,2);
        }

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

            ...this.state.getTime,
            [name]: value

        }
        this.setState( { getTime: setValues } );
        this.getDataThroughTime();

    }

    getDataThroughDate = ( event ) => {

        this.setState( { loading: true } );
        const { value } = event.target;

        if( Cookies.get('Params') === 'Category 1' )
        {

            const formsData = new FormData();
            formsData.append('date', this.getDate(value));
            formsData.append('logger', Cookies.get('LoginID') );

            axios.post('/getdatathroughdate', formsData).then(response => {

                this.setState({ loading: false });
                this.setState({ getAllCandidates: response.data });

                if (this.state.getAllCandidates.length === 0) {

                    toast.dark("No Record Found", {
                        position: 'bottom-center',
                        progressClassName: 'success-progress-bar',
                        autoClose: 3000,
                    });

                }

            }).catch(error => {

                this.setState({ loading: false });

                toast.dark("Network Error 500 please check your network connection", {
                    position: 'bottom-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            })

        }else
        {
            this.setState( { loading: false } );

            toast.dark("Access denied, you don't have permission for access", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        }

    }

    getDataThroughToken = ( event ) => {

        if( Cookies.get('Params') === 'Category 1' )
        {

            // if( event.target.value.length > 3 )
            // {

                setTimeout( () => {

                    this.setState({ loading: true });
                    const formsData = new FormData();
                    formsData.append('token', event.target.value);
                    axios.post('/gettokendata', formsData).then(response => {
        
                        this.setState({ loading: false });
                        for (let key in response.data) {

                            this.setState({ getAllCandidates: [response.data[key]] });

                        }

                        if (this.state.getAllCandidates.length === 0) {

                            toast.dark("No Record Found", {
                                position: 'bottom-center',
                                progressClassName: 'success-progress-bar',
                                autoClose: 3000,
                            });
    
                        }
        
                    }).catch(err => {
        
                        this.setState({ loading: false });
                        toast.dark("Network Error 500 please check your network connection", {
                            position: 'top-center',
                            progressClassName: 'success-progress-bar',
                            autoClose: 3000,
                        });
        
                    });
        
                }, 1000 );

            // }

        }else
        {

            toast.dark("Access denied, you don't have permission for access", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        }

    }

    getDataThroughTime = ( ) => {

        this.setState( { loading: true } );
        
        if( this.state.getTime.time1 != null || this.state.getTime.time2 != null )
        {

            if( Cookies.get('Params') === 'Category 1' )
            {

                const formsData = new FormData();
                formsData.append('time1', this.state.getTime.time1);
                formsData.append('time2', this.state.getTime.time2);
                formsData.append('logger', Cookies.get('LoginID') );

                axios.post('/getcandidatethroughtime', formsData).then(response => {

                    this.setState({ loading: false });
                    this.setState({ getAllCandidates: response.data });

                    if (this.state.getAllCandidates.length === 0) {

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
    
                toast.dark("Access denied, you don't have permission for access", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });
    
            }

        }else
        {

            this.setState( { loading: false } );

        }

    }

    ChangeToTextField = ( whichOne ) => {

        let txt = null;
        if( whichOne === 'SByToken' )
        {
            txt = <> <input type="text" className="form-control form-control-sm rounded-0 SbyTDSInput" placeholder="Token NO." onChange={ this.getDataThroughToken } /> </>
            this.setState( { SByTokenTxt: txt, SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne === 'SByDate' )
        {
            txt = <> <input type="date" className="form-control form-control-sm rounded-0 SbyTDSInput" onChange={this.getDataThroughDate} /> </>
            this.setState( { SByDateTxt: txt, SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne === 'SByShift' )
        {
            
            txt =   <> 
                        <div className="d-flex justify-content-center">
                            <select name="time1" className="form-control form-control-sm mr-1 SbyTDSInput" onChange={ this.onChangeHandler }>
                                <option defaultValue="01:00 am">01:00 am</option>
                                <option defaultValue="02:00 am">02:00 am</option>
                                <option defaultValue="03:00 am">03:00 am</option>
                                <option defaultValue="04:00 am">04:00 am</option>
                                <option defaultValue="05:00 am">05:00 am</option>
                                <option defaultValue="06:00 am">06:00 am</option>
                                <option defaultValue="07:00 am">07:00 am</option>
                                <option defaultValue="08:00 am">08:00 am</option>
                                <option defaultValue="09:00 am">09:00 am</option>
                                <option defaultValue="10:00 am">10:00 am</option>
                                <option defaultValue="11:00 am">11:00 am</option>
                                <option defaultValue="12:00 pm">12:00 pm</option>
                                <option defaultValue="01:00 pm">01:00 pm</option>
                                <option defaultValue="02:00 pm">02:00 pm</option>
                                <option defaultValue="03:00 pm">03:00 pm</option>
                                <option defaultValue="04:00 pm">04:00 pm</option>
                                <option defaultValue="05:00 pm">05:00 pm</option>
                                <option defaultValue="06:00 pm">06:00 pm</option>
                                <option defaultValue="07:00 pm">07:00 pm</option>
                                <option defaultValue="08:00 pm">08:00 pm</option>
                                <option defaultValue="09:00 pm">09:00 pm</option>
                                <option defaultValue="10:00 pm">10:00 pm</option>
                                <option defaultValue="11:00 pm">11:00 pm</option>
                                <option defaultValue="12:00 am">12:00 am</option>
                            </select>
                            <select name="time2" className="form-control form-control-sm ml-1 SbyTDSInput" onChange={ this.onChangeHandler }>
                                <option defaultValue="01:00 am">01:00 am</option>
                                <option defaultValue="02:00 am">02:00 am</option>
                                <option defaultValue="03:00 am">03:00 am</option>
                                <option defaultValue="04:00 am">04:00 am</option>
                                <option defaultValue="05:00 am">05:00 am</option>
                                <option defaultValue="06:00 am">06:00 am</option>
                                <option defaultValue="07:00 am">07:00 am</option>
                                <option defaultValue="08:00 am">08:00 am</option>
                                <option defaultValue="09:00 am">09:00 am</option>
                                <option defaultValue="10:00 am">10:00 am</option>
                                <option defaultValue="11:00 am">11:00 am</option>
                                <option defaultValue="12:00 pm">12:00 pm</option>
                                <option defaultValue="01:00 pm">01:00 pm</option>
                                <option defaultValue="02:00 pm">02:00 pm</option>
                                <option defaultValue="03:00 pm">03:00 pm</option>
                                <option defaultValue="04:00 pm">04:00 pm</option>
                                <option defaultValue="05:00 pm">05:00 pm</option>
                                <option defaultValue="06:00 pm">06:00 pm</option>
                                <option defaultValue="07:00 pm">07:00 pm</option>
                                <option defaultValue="08:00 pm">08:00 pm</option>
                                <option defaultValue="09:00 pm">09:00 pm</option>
                                <option defaultValue="10:00 pm">10:00 pm</option>
                                <option defaultValue="11:00 pm">11:00 pm</option>
                                <option defaultValue="12:00 am">12:00 am</option>
                            </select>
                        </div> 
                    </>
            this.setState( { SByShiftTxt: txt, SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>, SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5> } );
        }

    }

    showDetails = ( index ) => {

        this.setState( { detailsData: [this.state.getAllCandidates[index]] } );
        this.modalCall();

    }

    getReport = ( index ) => {

        const Data = new FormData();
        Data.append('ID', this.state.getAllCandidates[index].candidate_id);
        axios.post( '/getcandidatereport', Data ).then( response => {

            this.setState( { report: response.data } );

        } ).catch( err => {

            console.log( err );

        } )
        this.reportModal();

    }

    printReport = () => {

        let printContents = document.getElementById("report");
        let originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents.innerHTML;

        window.print();

        document.body.innerHTML = originalContents;

    }

    modalCall = () => {

        if( this.state.showModal )
        {

            this.setState( { showModal: false } );

        }else
        {

            this.setState( { showModal: true } );

        }

    }

    reportModal = () => {

        if( this.state.showReportModal )
        {

            this.setState( { showReportModal: false } );

        }else
        {

            this.setState( { showReportModal: true } );

        }

    }

    render()
    {

        return(

            <>
                <Modal show={this.state.showModal} close={this.modalCall} wid="60%">
                    {
                        this.state.detailsData.map((data, index) => {

                            return (
                                <>
                                    <div className="candidateDetails" key={ index }>
                                        <div className="usrBackImg">
                                            <div className="usrImg" style={ { 'backgroundImage' : "url('images/candidates/" + data.candidate_image + "')" } }></div>
                                        </div>
                                        <div className='otherDetails'>
                                            <h2 className="text-center font-weight-bolder"> { data.candidate_name } </h2>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="text-left">
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Passport</h6>
                                                                <p> {data.candidate_passport} </p>
                                                            </div>
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Profession</h6>
                                                                <p> {data.candidate_profession} </p>
                                                            </div>
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Gender</h6>
                                                                <p> {data.candidate_gender} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="text-left">
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Marital Status</h6>
                                                                <p> {data.candidate_marital_status} </p>
                                                            </div>
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Age</h6>
                                                                <p> {data.candidate_age} </p>
                                                            </div>
                                                            <div className="mb-3">
                                                                <h6 className="font-weight-bold">Nationality</h6>
                                                                <p> {data.candidate_nationality} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                                                        <button className='btn btn-sm w-75' onClick={ this.modalCall }>close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )

                        })
                    }
                </Modal>
                <Modal show={this.state.showReportModal} close={this.reportModal} wid="60%">
                    {
                        this.state.report.map(
                            ( val, index ) => {
                                return (

                                    <>
                                        <div className="report" id="report" key={ index }>
                        <div className="name d-flex justify-content-between align-items-center border p-2">
                            <div className="d-flex justify-content-center align-items-center w-50">
                                <h4 className="text-uppercase">detailed candidate report</h4>
                            </div>
                            <div className="text-right w-50">
                                <h4>image</h4>
                            </div>
                        </div>
                        <div className="center_info d-flex justify-content-between align-items-center border p-2">
                            <div className="w-75">
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">Medical Center Name: </p>
                                    <p className="mb-0">Seaboard Logistics</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">Address: </p>
                                    <p className="mb-0">LS-5, ST-8, SECTOR-10, NORTH KARACHI</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <div className="d-flex justify-content-start align-items-center w-100">
                                        <p className="font-weight-bold mb-0 mr-1">Phone: </p>
                                    <p className="mb-0">03303744620</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center w-100">
                                        <p className="font-weight-bold mb-0 mr-1">Fax: </p>
                                    <p className="mb-0">abc123456</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">Email: </p>
                                    <p className="mb-0">usman.umer0335@gmail.com</p>
                                </div>
                            </div>
                            <div className="w-25">
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1 text-uppercase">g.h.c code no: </p>
                                    <p className="mb-0">abc123456</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">GCC Slip NO: </p>
                                    <p className="mb-0">abc123456</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">Date Examined: </p>
                                    <p className="mb-0">abc123456</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <p className="font-weight-bold mb-0 mr-1">Report Expiry Date: </p>
                                    <p className="mb-0">abc123456</p>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-10 col-md-8 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <h4 className="mb-0 text-uppercase text-center">candidate information</h4>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">Name </p>
                                                <p className="mb-0 border w-50">{ val.candidate_name.length > 13 ? val.candidate_name.substring(0, 12) : val.candidate_name }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">Age </p>
                                                <p className="mb-0 border w-50">{ val.candidate_age.length > 13 ? val.candidate_age.substring(0, 12) : val.candidate_age }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">Nationality </p>
                                                <p className="mb-0 border w-50">{ val.candidate_nationality.length > 13 ? val.candidate_nationality.substring(0, 12) : val.candidate_nationality }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">gender </p>
                                                <p className="mb-0 border w-50">{ val.candidate_gender.length > 13 ? val.candidate_gender.substring(0, 12) : val.candidate_gender }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">marital status </p>
                                                <p className="mb-0 border w-50">{ val.candidate_marital_status.length > 13 ? val.candidate_marital_status.substring(0, 12) : val.candidate_marital_status }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">profession </p>
                                                <p className="mb-0 border w-50">{ val.candidate_profession.length > 13 ? val.candidate_profession.substring(0, 12) : val.candidate_profession }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">passport NO </p>
                                                <p className="mb-0 border w-50">{ val.candidate_passport.length > 13 ? val.candidate_passport.substring(0, 12) : val.candidate_passport }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">place of issue </p>
                                                <p className="mb-0 border w-50">{ val.place_of_issue.length > 13 ? val.place_of_issue.substring(0, 12) : val.place_of_issue }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">travelling to </p>
                                                <p className="mb-0 border w-50">{ val.travelling_to.length > 13 ? val.travelling_to.substring(0, 12) : val.travelling_to }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-12 border d-flex justify-content-center align-items-center" style={ { 'position' : 'relative' } }>
                                    {/* <p className="mb-0">PHOTO</p> */}
                                    <img alt="candidate_image" src={ 'images/candidates/' + val.candidate_image } width="100%" height="100%" style={ { 'position' : 'absolute', 'top' : '0', 'left' : '0' } } />
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-7 col-md-7 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="mb-0 font-weight-bolder text-uppercase">medical examination: <span className="text-capitalize font-weight-normal">general</span></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">height </p>
                                                <p className="mb-0 border text-center w-50">{ val.height.length > 13 ? val.height.substring(0, 12) : val.height }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">weight </p>
                                                <p className="mb-0 border text-center w-50">{ val.weight.length > 13 ? val.weight.substring(0, 12) : val.weight }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">BMI </p>
                                                <p className="mb-0 border text-center w-50">{ val.body_mass_index.length > 13 ? val.body_mass_index.substring(0, 12) : val.body_mass_index }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">B.P </p>
                                                <p className="mb-0 border text-center w-50">{ val.blood_pressure.length > 13 ? val.blood_pressure.substring(0, 12) : val.blood_pressure }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">pulse </p>
                                                <p className="mb-0 border text-center w-50">{ val.pulse.length > 13 ? val.pulse.substring(0, 12) : val.pulse }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize">PR </p>
                                                <p className="mb-0 border text-center w-50">{ val.pr.length > 13 ? val.pr.substring(0, 12) : val.pr }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0 border d-flex justify-content-center align-items-center">
                                            <p className="mb-0 font-weight-bolder text-center">Visual Acuity</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize text-center">Unaided</p>
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize text-center">aided</p>
                                            </div>
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-25 border text-capitalize text-center">Rt.Eye</p>
                                                <p className="font-weight-bold mb-0 w-25 border text-capitalize text-center">Lt.Eye</p>
                                                <p className="font-weight-bold mb-0 w-25 border text-capitalize text-center">Rt.Eye</p>
                                                <p className="font-weight-bold mb-0 w-25 border text-capitalize text-center">Lt.Eye</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0 border">
                                            <p className="mb-0 font-weight-bolder">Distant</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.unaided_distant_rt_eye.length > 13 ? val.unaided_distant_rt_eye.substring(0, 12) : val.unaided_distant_rt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.unaided_distant_lt_eye.length > 13 ? val.unaided_distant_lt_eye.substring(0, 12) : val.unaided_distant_lt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.aided_distant_rt_eye.length > 13 ? val.aided_distant_rt_eye.substring(0, 12) : val.aided_distant_rt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.aided_distant_lt_eye.length > 13 ? val.aided_distant_lt_eye.substring(0, 12) : val.aided_distant_lt_eye }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0 border">
                                            <p className="mb-0 font-weight-bolder">Near</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.unaided_near_rt_eye.length > 13 ? val.unaided_near_rt_eye.substring(0, 12) : val.unaided_near_rt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.unaided_near_lt_eye.length > 13 ? val.unaided_near_lt_eye.substring(0, 12) : val.unaided_near_lt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.aided_near_rt_eye.length > 13 ? val.aided_near_rt_eye.substring(0, 12) : val.aided_near_rt_eye }</p>
                                                <p className="mb-0 w-25 border text-capitalize text-center">{ val.aided_near_lt_eye.length > 13 ? val.aided_near_lt_eye.substring(0, 12) : val.aided_near_lt_eye }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0 border">
                                            <p className="mb-0 font-weight-bolder">Colour Vision</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="mb-0 w-50 border text-capitalize text-center">Normal</p>
                                                <p className="mb-0 w-50 border text-capitalize text-center">Doubtful</p>
                                                <p className="mb-0 w-50 border text-capitalize text-center">Defective</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 px-0 mx-0 border d-flex justify-content-center align-items-center">
                                            <p className="mb-0 font-weight-bolder text-center">Hearing</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 px-0 mx-0">
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize text-center">Rt.Ear</p>
                                                <p className="font-weight-bold mb-0 w-50 border text-capitalize text-center">Lt.Ear</p>
                                            </div>
                                            <div className="d-flex justify-content-start w-100 align-items-center w-100">
                                                <p className="mb-0 w-50 border text-capitalize text-center">{ val.right_ear.length > 13 ? val.right_ear.substring(0, 12) : val.right_ear }</p>
                                                <p className="mb-0 w-50 border text-capitalize text-center">{ val.left_ear.length > 13 ? val.left_ear.substring(0, 12) : val.left_ear }</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="font-weight-bold mb-0 w-100 text-uppercase text-left">medical examination: <span className="text-capitalize">systemic</span></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">general appearance</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.general_appearance.length > 13 ? val.general_appearance.substring(0, 12) : val.general_appearance }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">cardiovascular</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.cardio_vascular.length > 13 ? val.cardio_vascular.substring(0, 12) : val.cardio_vascular }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">respiratory</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.respiratory.length > 13 ? val.respiratory.substring(0, 12) : val.respiratory }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">ent</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.ent.length > 13 ? val.ent.substring(0, 12) : val.ent }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">gastro intestinal</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left pl-2">abdomen <sub className="text-capitalize font-weight-normal">mass, tenerness</sub></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.Abdomen.length > 13 ? val.Abdomen.substring(0, 12) : val.Abdomen }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left pl-2">hernia</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.hernia.length > 13 ? val.hernia.substring(0, 12) : val.hernia }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">genitourinary</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left pl-2">hydrocele</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.hydrocele.length > 13 ? val.hydrocele.substring(0, 12) : val.hydrocele }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">musculoskeletal</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left pl-2">extremities</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.exremities.length > 13 ? val.exremities.substring(0, 12) : val.exremities }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left pl-2">back</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.back.length > 13 ? val.back.substring(0, 12) : val.back }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">skin</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.skin.length > 13 ? val.skin.substring(0, 12) : val.skin }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">c.n.s</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.cns.length > 13 ? val.cns.substring(0, 12) : val.cns }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">deformities</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.deformities.length > 13 ? val.deformities.substring(0, 12) : val.deformities }</p>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="mb-0 w-100 text-uppercase text-left font-weight-bolder">mental status examination</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">appearance</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left pl-2">speech</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.speech.length > 13 ? val.speech.substring(0, 12) : val.speech }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left pl-2">behaviour</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.behaviour.length > 13 ? val.behaviour.substring(0, 12) : val.behaviour }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">cognition</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left pl-2">orientation</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.orientation.length > 13 ? val.orientation.substring(0, 12) : val.orientation }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left pl-2">memory</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.memory.length > 13 ? val.memory.substring(0, 12) : val.memory }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left pl-2">concentration</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.concentration.length > 13 ? val.concentration.substring(0, 12) : val.concentration }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">mood</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.mood.length > 13 ? val.mood.substring(0, 12) : val.mood }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">thoughts</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.thoughts.length > 13 ? val.thoughts.substring(0, 12) : val.thoughts }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">OTHERS</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.others.length > 13 ? val.others.substring(0, 12) : val.others }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="font-weight-bold mb-0 w-100 text-uppercase text-left">Investigation</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">chest x-ray</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="font-weight-bold mb-0 w-100 text-uppercase text-center">Laboratory Investigation</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="font-weight-bold mb-0 w-100 text-uppercase text-left">type of lab investigation</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="font-weight-bold mb-0 w-100 text-uppercase text-center">results</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">blood group</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.blood_group.length > 13 ? val.blood_group.substring(0, 12) : val.blood_group }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">hemoglobin</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.hemoglobin.length > 13 ? val.hemoglobin.substring(0, 12) : val.hemoglobin }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">thick film for</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">1.malaria</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.malaria.length > 13 ? val.malaria.substring(0, 12) : val.malaria }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">2.micro filaria</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.micro_filaria.length > 13 ? val.micro_filaria.substring(0, 12) : val.micro_filaria }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left font-weight-bolder">biochemistry</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">r.b.s</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.RBs.length > 13 ? val.RBs.substring(0, 12) : val.RBs }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">l.f.t</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.lft.length > 13 ? val.lft.substring(0, 12) : val.lft }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">creatinine</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.creatinine.length > 13 ? val.creatinine.substring(0, 12) : val.creatinine }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left font-weight-bolder">serology</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">hiv i & ii</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.hivIII.length > 13 ? val.hivIII.substring(0, 12) : val.hivIII }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">hbs ag</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.HbsAg.length > 13 ? val.HbsAg.substring(0, 12) : val.HbsAg }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">anti hcv</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.antiHcv.length > 13 ? val.antiHcv.substring(0, 12) : val.antiHcv }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">vdrl</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.vdrl.length > 13 ? val.vdrl.substring(0, 12) : val.vdrl }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">tpha <sub>(if vdrl positive)</sub></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.tpha.length > 13 ? val.tpha.substring(0, 12) : val.tpha }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left font-weight-bolder">urine</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">sugar</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.sugar.length > 13 ? val.sugar.substring(0, 12) : val.sugar }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">albumin</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.albumin.length > 13 ? val.albumin.substring(0, 12) : val.albumin }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">stool</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">routine</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">helminthes</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.helminthes.length > 13 ? val.helminthes.substring(0, 12) : val.helminthes }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">ova</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.ova.length > 13 ? val.ova.substring(0, 12) : val.ova }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">cyst</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.cyst.length > 13 ? val.cyst.substring(0, 12) : val.cyst }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left">others</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">{ val.others.length > 13 ? val.others.substring(0, 12) : val.others }</p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left" style={ { 'padding' : '9px 0' } }></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left" style={ { 'padding' : '9px 0' } }></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 border">
                                            <p className="mb-0 w-100 text-uppercase text-left" style={ { 'padding' : '9px 0' } }></p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center"></p>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 border">
                                            <p className="mb-0 w-100 text-uppercase text-center font-weight-bolder">vaccination status</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">type</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">status</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-uppercase text-center">date</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">polio</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.polio_status.length > 13 ? val.polio_status.substring(0, 12) : val.polio_status }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.polio_date.length > 13 ? val.polio_date.substring(0, 12) : val.polio_date }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">MMR 1</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.mmr1_status.length > 13 ? val.mmr1_status.substring(0, 12) : val.mmr1_status }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.mmr1_date.length > 13 ? val.mmr1_date.substring(0, 12) : val.mmr1_date }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">MMR 2</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.mmr2_status.length > 13 ? val.mmr2_status.substring(0, 12) : val.mmr2_status }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.mmr2_date.length > 13 ? val.mmr2_date.substring(0, 12) : val.mmr2_date }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">Meningococcal</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.menigococcal_status.length > 13 ? val.menigococcal_status.substring(0, 12) : val.menigococcal_status }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.meningococcal_date.length > 13 ? val.meningococcal_date.substring(0, 12) : val.meningococcal_date }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-left">Covid - 19</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.covid_status.length > 13 ? val.covid_status.substring(0, 12) : val.covid_status }</p>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 border">
                                            <p className="mb-0 w-100 text-capitalize text-center">{ val.covid_date.length > 13 ? val.covid_date.substring(0, 12) : val.covid_date }</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="collg-12 col-md-12 col-sm-12 border pb-5">
                                    <p className="mb-0">REMARKS</p>
                                </div>
                                <div className="collg-12 col-md-12 col-sm-12 border pb-4">
                                    <p className="mb-0 text-capitalize">dear sir/madam,</p>
                                    <p className="mb-0 text-capitalize">mentioned above is the medical report for mr./miss. _________ who is <b>FIT/UNFIT</b> for the above mentioned job according to the GCC Criteria.</p>
                                </div>
                                <div className="collg-12 col-md-12 col-sm-12 border pt-5">
                                    <p className="mb-0 text-center">P.O Box 7431 - 11462, Riyadh | Phone : 092734634234 | Fax : 23487429873 | Email : info@asdk.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                                    </>

                                )
                            }
                        )
                    }
                    <div className="text-center mt-3">
                        <button className="btn btn-sm px-5" onClick={ this.printReport }>Print</button>
                    </div>
                </Modal>
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
                                {/* Empty */}
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid tab-parent">
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="search_options d-grid">
                                            <div className="d-flex justify-content-center tab-container">
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
                                    <Loading show={this.state.loading} position='absolute' />
                                    <div className="container-fluid">
                                        <div className="row">
                                            {
                                                this.state.getAllCandidates.slice(0, this.state.showData).map( ( data, index ) => {

                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                                                            <div className="candidate_info_div">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                                                                        <img
                                                                            src={"images/candidates/" + data.candidate_image}
                                                                            width="100"
                                                                            height='100'
                                                                            alt="candidate img"
                                                                        />
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                                        <h5 className="mb-0 font-weight-bolder" title={ data.candidate_name }>{data.candidate_name.length < 12 ? data.candidate_name : data.candidate_name.substring(0, 9) + '...'}</h5>
                                                                        <p>{data.candidate_nationality}</p>
                                                                        <button className="btn btn-sm btn-block" onClick={ () => this.showDetails( index ) }>View Details</button>
                                                                    </div>
                                                                    <div className="candidate_info_div_bottom w-100 border mt-3">
                                                                        <div className="d-flex justify-content-center">
                                                                            <div className="border w-50 text-center" style={ { 'borderRadius' : '20px 0 0 0' } }>
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#2182C5' } }>Passport</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#00a751', 'fontSize' : '12px' } } title={ data.candidate_passport }> { data.candidate_passport.length < 16 ? data.candidate_passport : data.candidate_passport.substring(0, 15) + '...' } </p>
                                                                            </div>
                                                                            <div className="border w-50 text-center" style={ { 'borderRadius' : '0 20px 0 0' } }>
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#2182C5' } }>Profession</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#00a751', 'fontSize' : '12px' } } title={ data.candidate_profession }> { data.candidate_profession.length < 15 ? data.candidate_profession : data.candidate_profession.substring(0, 10) + '...' } </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex justify-content-center py-2">
                                                                            <div className="text-center px-3">
                                                                                <img
                                                                                    src={ data.user_image === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' : "images/users/" + data.user_image }
                                                                                    width="50"
                                                                                    height='50'
                                                                                    className="shadow-sm"
                                                                                    alt="candidate img"
                                                                                />
                                                                            </div>
                                                                            <div className="d-grid">
                                                                                <div>
                                                                                    <h6 className="mb-0 font-weight-bolder">{data.login_id}</h6>
                                                                                    <p className="mb-0"><small>{data.insert_date}</small> <small><b>at</b></small> <small>{data.inserted_time}</small></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
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
                            <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="search_options d-grid">
                                            <div className="d-flex justify-content-center tab-container">
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
                                    <Loading show={this.state.loading} position='absolute' />
                                    <div className="container-fluid">
                                        <div className="row">
                                            {
                                                this.state.getAllCandidates.slice(0, this.state.showData).map( ( data, index ) => {

                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                                                            <div className="candidate_info_div">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                                                                        <img
                                                                            src={"images/candidates/" + data.candidate_image}
                                                                            width="100"
                                                                            height='100'
                                                                            alt="candidate img"
                                                                        />
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                                                        <h5 className="mb-0 font-weight-bolder" title={ data.candidate_name }>{data.candidate_name.length < 12 ? data.candidate_name : data.candidate_name.substring(0, 9) + '...'}</h5>
                                                                        <p>{data.candidate_nationality}</p>
                                                                        <button className="btn btn-sm btn-block" onClick={ () => this.getReport( index ) }>View Details</button>
                                                                    </div>
                                                                    <div className="candidate_info_div_bottom w-100 border mt-3">
                                                                        <div className="d-flex justify-content-center">
                                                                        <div className="border w-50 text-center" style={ { 'borderRadius' : '20px 0 0 0' } }>
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#2182C5' } }>Passport</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#00a751', 'fontSize' : '12px' } } title={ data.candidate_passport }> { data.candidate_passport.length < 16 ? data.candidate_passport : data.candidate_passport.substring(0, 15) + '...' } </p>
                                                                            </div>
                                                                            <div className="border w-50 text-center" style={ { 'borderRadius' : '0 20px 0 0' } }>
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#2182C5' } }>Profession</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#00a751', 'fontSize' : '12px' } } title={ data.candidate_profession }> { data.candidate_profession.length < 15 ? data.candidate_profession : data.candidate_profession.substring(0, 10) + '...' } </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex justify-content-center py-2">
                                                                            <div className="text-center px-3">
                                                                                <img
                                                                                    src={ data.user_image === undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU' : "images/users/" + data.user_image }
                                                                                    width="50"
                                                                                    height='50'
                                                                                    className="shadow-sm"
                                                                                    alt="candidate img"
                                                                                />
                                                                            </div>
                                                                            <div className="d-grid">
                                                                                <div>
                                                                                    <h6 className="mb-0 font-weight-bolder">{data.login_id}</h6>
                                                                                    <p className="mb-0"><small>{data.insert_date}</small> <small><b>at</b></small> <small>{data.inserted_time}</small></p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
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