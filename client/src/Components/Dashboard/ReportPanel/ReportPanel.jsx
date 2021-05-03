import react, { Component } from 'react';

import './ReportPanel.css';
import axios from 'axios';
// import axios from '../../../axios-instance';
import Modal from '../../UI/Modal/Modal';
import $ from "jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../UI/Loading/Loading';
import Cookies, { defaults } from 'js-cookie';

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
            SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5>

        }

    }

    componentDidMount()
    {

        this.setState( {loading: false } );

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

        const formsData = new FormData();
        formsData.append( 'date', this.getDate(value) );

        axios.post( '/getdatathroughdate', formsData ).then( response => {

            this.setState( { loading: false } );
            this.setState( { getAllCandidates: response.data } );

            if( this.state.getAllCandidates == 0 )
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
        setTimeout( () => {

            this.setState({ loading: true });
            const formsData = new FormData();
            formsData.append('token', event.target.value);
            axios.post('/gettokendata', formsData).then(response => {

                switch(response)
                {
                    case response.data.length == 0:
                    case response.data.length < 0:
                        console.log("not found");
                        this.setState({ loading: false });

                        toast.dark("Not Found", {
                            position: 'top-center',
                            progressClassName: 'success-progress-bar',
                            autoClose: 3000,
                        });

                    break;

                    default:
                        this.setState({ loading: false });
                        for (let key in response.data) {

                            this.setState({ getAllCandidates: [response.data[key]] });

                        }

                        this.setState({ showRecordModal: true, loading: false });
                    break;
                    
                }

            }).catch(err => {

                this.setState({ loading: false });
                toast.dark("Network Error 500 please check your network connection", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            });

        }, 1000 )

    }

    getDataThroughTime = ( ) => {

        this.setState( { loading: true } );
        
        if( this.state.getTime.time1 != null || this.state.getTime.time2 != null )
        {

            const formsData = new FormData();
            formsData.append('time1', this.state.getTime.time1);
            formsData.append('time2', this.state.getTime.time2);

            axios.post('/getcandidatethroughtime', formsData).then(response => {

                let len = this.state.getAllCandidates.length;
                this.state.getAllCandidates.splice(0, len);
                console.log(response.data);
                this.setState({ loading: false });
                for( let x in response.data )
                {

                    this.state.getAllCandidates.push(response.data[x]);

                }

                // $('h5.sebyda').trigger('click');

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

    ChangeToTextField = ( whichOne ) => {

        let txt = null;
        if( whichOne == 'SByToken' )
        {
            txt = <> <input type="text" className="form-control form-control-sm rounded-0 SbyTDSInput" placeholder="Token NO." onChange={ this.getDataThroughToken } /> </>
            this.setState( { SByTokenTxt: txt, SByDateTxt: <h5 className="text-uppercase mb-0 py-3">Search By Date</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne == 'SByDate' )
        {
            txt = <> <input type="date" className="form-control form-control-sm rounded-0 SbyTDSInput" onChange={this.getDataThroughDate} /> </>
            this.setState( { SByDateTxt: txt, SByTokenTxt: <h5 className="text-uppercase mb-0 py-3">Search By Token</h5>, SByShiftTxt: <h5 className="text-uppercase mb-0 py-3">Search By Shift</h5> } );
        }

        if( whichOne == 'SByShift' )
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
                                        <p>{ Cookies.get('LoginID') }</p>
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
                                                this.state.getAllCandidates.map( ( data, index ) => {

                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index} onClick={ () => this.showDetails( index ) }>
                                                            <div className="candidate_info_div">
                                                                <div className="row">
                                                                    <div className="col-6 text-center">
                                                                        <img
                                                                            src={"images/" + data.candidate_image}
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
                                        <div className="row">
                                            {
                                                this.state.detailsData.map( ( data, index ) => {

                                                    return (
                                                        <>
                                                            <div className="col-6">
                                                                <div className="row bg-white mr-2 ml-1 p-3">
                                                                    <div className="col-6 text-center">
                                                                        <img
                                                                            src={ 'images/' + data.candidate_image }
                                                                            className="rounded-circle"
                                                                            width="150"
                                                                            height="150"
                                                                        />
                                                                    </div>
                                                                    <div className="col-6 d-grid">
                                                                        <div>
                                                                            <h3 className="mb-0">{data.candidate_name}</h3>
                                                                            <h5>{data.candidate_nationality}</h5>
                                                                        </div>
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