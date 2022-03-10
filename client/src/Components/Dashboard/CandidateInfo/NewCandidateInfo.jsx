import React, { Component } from 'react';

import './NewCandidateInfo.css';
import Cookies from 'js-cookie';
import axios from '../../../axios-instance';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../UI/Modal/Modal';

import Candidate from './CandidateForm/CandidateForm';
import MedicalExam1 from './MedicalExamination/MedicalExamination';
import MedicalExam2 from './MedicalExamination-2/MedicalExamination2';
import Investigation from './LaboratoryInvestigation/LaboratoryInvestigation';

class NewCandidateInfo extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            ActiveTabName: null,
            Token: 'Not Found',
            Name: 'Not Found',
            screenWidth: '',
            error: null,
            tokens: null,
            firstNum: 0,
            data: null,
            showModal: false
        }

    }

    componentDidMount()
    {

        $(".nav-item.nav-link").first().addClass("active");
        $(".tab-pane").first().addClass("active");
        $(".tab-pane").first().addClass("show");

        this.setState( { ActiveTabName: $(".nav-item.nav-link").first().attr('title') } );
        //Get Screen width for responsive
        setInterval( () => {

            let ScWd = window.outerWidth;
            this.setState({ screenWidth: ScWd });

            if (ScWd > 450) {
                $('.form-back').css('height', '50vh');
            } else {
                $('.form-back').css('height', '75vh');
            }

        }, 1 * 100 );

        function openClose( name )
        {

            let selector = $(name).attr('id');

            $('div.options-tabs').slideUp();
            $('div.'+selector+'_tab').slideDown();

        }

        $('.tab-btns').on( 'click', function() {

            openClose(this);

        } );

        $('#next-btn').on('click', () => {

            $('#next-btn').html('Please Wait');
            setTimeout(() => {
                $('#next-btn').html('Next');
            }, 1000);

        } );

    }

    // componentDidUpdate(prevProps) {

    //     // Typical usage (don't forget to compare props):
    //     if ( prevProps.error !== this.state.error ) 
    //     {

    //         this.setState(
    //             {
    //                 error: null
    //             }
    //         )

    //     }

    // }

    nextCandidate = () => {

        let nextNum = 1 + this.state.firstNum;
        this.setState( { firstNum: nextNum } );
        this.setState({ Token: "Loading", Name: "Loading" });

        const formsData = new FormData();
        formsData.append('token', Cookies.get('tokenNo'));
        axios.post('/getcurrentcandidate', formsData).then(response => {

            if (response.data[0] === "N") {

                this.setState({ Token: "Not Found", Name: "Not Found" });

            } else {

                this.setState({ Token: response.data[0].token_no, Name: response.data[0].candidate_name });

            }

        }).catch(error => {

            this.setState({ Token: "Not Found", Name: "Not Found" });

        })

    }

    getVal = ( Val ) => {

        if( Val === 'candidate' )
        {

            if (this.state.screenWidth > 450) {
                $('.form-back').css('height', '50vh');
            } else {
                $('.form-back').css('height', '75vh');
            }

        }
        if( Val === 'exam1' )
        {

            this.setState( { ActiveTabName: 'First Medical Exam' } );
            if (this.state.screenWidth > 450) {
                $('.form-back').css('height', '35vh');
            } else {
                $('.form-back').css('height', '60vh');
            }

        }
        if( Val === 'exam2' )
        {

            this.setState( { ActiveTabName: 'Second Medical Exam' } );
            if (this.state.screenWidth > 450) {
                $('.form-back').css('height', '45vh');
            } else {
                $('.form-back').css('height', '70vh');
            }

        }
        if( Val === 'investigation' )
        {

            this.setState( { ActiveTabName: 'Laboratory Investigation' } );
            if (this.state.screenWidth > 450) {
                $('.form-back').css('height', '35vh');
            } else {
                $('.form-back').css('height', '50vh');
            }

        }

    }

    modalCall = ( event ) => {

        event.preventDefault();
        if(this.state.showModal)
        {
            this.setState( { showModal: false } );
        }else
        {
            this.setState( { showModal: true } );
        }

    }

    error = ( msg ) => {

        if( this.state.screenWidth > 768 )
        {

            this.setState( { error: msg } );

        }else
        {

            toast.dark( msg , {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 1000,
            });

            setTimeout(() => {
                
                this.setState( { showModal: true } );

            }, 1000);

        }


    }

    datas = ( dta ) => {

        this.setState( { data: dta } );
        this.setState({ Token: this.state.data[0].token_no, Name: this.state.data[0].candidate_name });

    }

    next = () => {
        this.refs.NCandidate.nextCandidate();
    }

    discardToken = () => {

        const formsData = new FormData();
        formsData.append('token', Cookies.get('tokenNo'));
        axios.post('/discardtoken', formsData).then( () => {

            this.next();

        }).catch(() => {

            this.next();

        })

    }

    onTokenChange = ( e ) => {

        this.setState(
            {
                Token: e.target.value
            }
        )

        if ( e.keyCode === 13 )
        {

            axios.post(
                '/GetTokenCandidate',
                {
                    token: this.state.Token
                }
            ).then(
                res => {

                    this.setState({ Token: res.data[0].token_no, Name: res.data[0].candidate_name });
                    Cookies.set('tokenNo', res.data[0].token_no);
                    Cookies.set('CandidateID', res.data[0].candidate_id);
                    this.setState( { error: "Candidate Found" } );

                }
            ).catch(
                err => {

                    this.setState({ Token: "Not Found", Name: "Not Found" });
                    this.setState( { error: "Not Found" } );

                }
            )
            
        }

    }

    render()
    {

        return(

            <>
                <Modal show={this.state.showModal} close={this.modalCall}>
                    <h5 className="text-center">Call The Next Candidate</h5>
                    <div className="text-center">
                        <button onClick={this.next} className="btn btn-sm w-75 mt-3" onFocus={this.modalCall}>next</button>
                    </div>
                </Modal>
                <div className="NewCandidateInfo w-100">
                    <div className="container-fluid NewCandidateInfo-content">
                        <div className="row border-bottom">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            {
                                                Cookies.get('Params') === "C" || Cookies.get('Role') === 'Admin'
                                                ?
                                                <a title="Candidate Information" onFocus={() => this.getVal( 'candidate' )} className="nav-item nav-link tab1" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Candidate</a>
                                                :
                                                null
                                            }
                                            {
                                                Cookies.get('Params') === "E1" || Cookies.get('Role') === 'Admin'
                                                ?
                                                <a title="First Medical Exam" onFocus={() => this.getVal( 'exam1' )} className="nav-item nav-link tab2" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Exam 1</a>
                                                :
                                                null
                                            }
                                            {
                                                Cookies.get('Params') === "E2" || Cookies.get('Role') === 'Admin'
                                                ?
                                                <a title="Second Medical Exam" onFocus={() => this.getVal( 'exam2' )} className="nav-item nav-link tab3" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Exam 2</a>
                                                :
                                                null
                                            }
                                            {
                                                Cookies.get('Params') === "I" || Cookies.get('Role') === 'Admin'
                                                ?
                                                <a title="Laboratory Investigation" onFocus={() => this.getVal( 'investigation' )} className="nav-item nav-link tab4" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Investigation</a>
                                                :
                                                null
                                            }
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                {/* Empty */}
                            </div>
                        </div>


                        <div className="current_candidate_info d-mobile-600-none">
                            <div className="d-flex justify-content-end">
                                <div>
                                    <span className="px-3">
                                        <b>Token NO: </b> 
                                    {/* <span>{this.state.Token}</span> */}
                                    <input 
                                        type="text" 
                                        value={ this.state.Token } 
                                        style={ { outline: 'none', border: "1px solid lightgray" } }
                                        onChange={ this.onTokenChange }
                                        onKeyUp={ this.onTokenChange }
                                        disabled={ Cookies.get('Params') === "C" ? true : false }
                                     />
                                    </span>
                                    <span className="px-3">
                                        <b>Candiate Name: </b> <span>{this.state.Name}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid current_candidate_info_mobile d-mobile-600-block" style={ { 'margin' : '50px 0 0 0', 'fontFamily' : 'Quicksand' } }>
                            <div className="row">
                                <div className="col-6">
                                    <b>Token NO:</b> <br/>
                                    {/* <span>{this.state.Token}</span> */}
                                    <input 
                                        type="text" 
                                        value={ this.state.Token } 
                                        style={ { outline: 'none', border: "1px solid lightgray" } }
                                        onChange={ this.onTokenChange }
                                        onKeyUp={ this.onTokenChange }
                                        disabled={ Cookies.get('Params') === "C" ? true : false }
                                     />
                                </div>
                                <div className="col-6">
                                    <b>Candiate Name:</b> <br/>
                                    <span>{this.state.Name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-back d-flex justify-content-end">
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                {
                                    Cookies.get('Params') === "C" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <Candidate ref='NCandidate' filledData={this.datas} error={this.error} position="absolute" />
                                    </div>
                                    :
                                    null
                                }
                                {
                                    Cookies.get('Params') === "E1" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <MedicalExam1 error={this.error} />
                                    </div>
                                    :
                                    null
                                }
                                {
                                    Cookies.get('Params') === "E2" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        <MedicalExam2 error={this.error} />
                                    </div>
                                    :
                                    null
                                }
                                {
                                    Cookies.get('Params') === "I" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <Investigation error={this.error} />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="w-50 errors">
                                <h1> { this.state.ActiveTabName } </h1>
                                {
                                    this.state.error === null ?
                                    null
                                    :
                                    <h4 className="error_msg"> <i className="las la-exclamation-triangle"></i> { this.state.error } </h4>
                                }
                                {
                                    Cookies.get('Params') === "C" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <div className='d-flex align-items-center'>
                                        <button className="btn btn-sm next-btn mr-3" id="next-btn" onClick={this.next}>
                                            Next
                                            {/* <i className="las la-chevron-circle-right"></i> */}
                                        </button>
                                        <button className="btn btn-sm next-btn" onDoubleClick={this.discardToken}>
                                            Discard
                                            {/* <i className="las la-chevron-circle-right"></i> */}
                                        </button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                                {
                                    Cookies.get('Params') === "C" || Cookies.get('Role') === 'Admin'
                                    ?
                                    <button className="btn btn-sm next-btn-sm" id="next-btn" onClick={this.next}>
                                            <i className="las la-arrow-right la-2x"></i><sub>next</sub>
                                    </button>
                                    :
                                    null
                                }
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />
            </>

        )

    }

}

export default NewCandidateInfo;