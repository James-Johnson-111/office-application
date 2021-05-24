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
            SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>,
            SByDateTxt: <h5 className="text-uppercase mb-0 py-3 sebyda">Search By Date</h5>,
            SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5>,
            showModal: false,
            showData: 6

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

            if( event.target.value.length > 3 )
            {

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

            }

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

    modalCall = () => {

        if( this.state.showModal )
        {

            this.setState( { showModal: false } );

        }else
        {

            this.setState( { showModal: true } );

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
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#1A2476' } }>Passport</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#f59b28', 'fontSize' : '12px' } } title={ data.candidate_passport }> { data.candidate_passport.length < 16 ? data.candidate_passport : data.candidate_passport.substring(0, 15) + '...' } </p>
                                                                            </div>
                                                                            <div className="border w-50 text-center" style={ { 'borderRadius' : '0 20px 0 0' } }>
                                                                                <p className="mb-1 font-weight-bold" style={ { 'color' : '#1A2476' } }>Profession</p>
                                                                                <p className="mb-0 font-weight-bold" style={ { 'color' : '#40CFCD', 'fontSize' : '12px' } } title={ data.candidate_profession }> { data.candidate_profession.length < 15 ? data.candidate_profession : data.candidate_profession.substring(0, 10) + '...' } </p>
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