import react, { Component } from 'react';

import './NewCandidateInfo.css';
import Cookies from 'js-cookie';
import axios from '../../../axios-instance';
import $ from 'jquery';

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
            data: null
        }

    }

    componentDidMount()
    {

        // axios.get('/getalltokens').then( response => {

        //     this.setState( { tokens: response.data } );

        //     const forsmData = new FormData();
        //     forsmData.append('token', this.state.tokens[0].token);
        //     axios.post('/getcurrentcandidate', forsmData).then(response => {

        //         if (response.data[0] == "N") {
    
        //             this.setState({ Token: "Not Found", Name: "Not Found" });
    
        //         } else {
    
        //             this.setState({ Token: response.data[0].token_no, Name: response.data[0].candidate_name, data: [response.data[0]] });
    
        //         }
    
        //     }).catch(error => {
    
        //         this.setState({ Token: "Not Found", Name: "Not Found" });
    
        //     })

        // } ).catch( err => {

        //     console.log( err );

        // } )

        this.setState( { ActiveTabName: 'Candidate Information' } );
        //Get Screen width for responsive
        let ScWd = window.outerWidth;
        this.setState( { screenWidth: ScWd } );

        if( ScWd > 450 )
        {
            $('.form-back').css('height', '50vh');
        }else
        {
            $('.form-back').css('height', '75vh');
        }

        function openClose( name )
        {

            let selector = $(name).attr('id');

            $('div.options-tabs').slideUp();
            $('div.'+selector+'_tab').slideDown();

        }

        $('.tab-btns').on( 'click', function() {

            openClose(this);

        } );

    }

    nextCandidate = () => {

        let nextNum = 1 + this.state.firstNum;
        this.setState( { firstNum: nextNum } );
        this.setState({ Token: "Loading", Name: "Loading" });

        const formsData = new FormData();
        formsData.append('token', Cookies.get('tokenNo'));
        axios.post('/getcurrentcandidate', formsData).then(response => {

            // console.log(response.data);
            if (response.data[0] == "N") {

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

            this.setState( { ActiveTabName: 'Candidate Information' } );
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

    error = ( msg ) => {

        this.setState( { error: msg } );

    }

    datas = ( dta ) => {

        this.setState( { data: dta } );
        this.setState({ Token: this.state.data[0].token_no, Name: this.state.data[0].candidate_name });

    }

    next = () => {
        this.refs.NCandidate.nextCandidate();
    }

    render()
    {

        return(

            <>
                <div className="NewCandidateInfo w-100">
                    <div className="container-fluid NewCandidateInfo-content">
                        <div className="row border-bottom">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a onFocus={() => this.getVal( 'candidate' )} className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Candidate</a>
                                            <a onFocus={() => this.getVal( 'exam1' )} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Exam 1</a>
                                            <a onFocus={() => this.getVal( 'exam2' )} className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Exam 2</a>
                                            <a onFocus={() => this.getVal( 'investigation' )} className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Investigation</a>
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
                                        <b>Token NO: </b> <span>{this.state.Token}</span>
                                    </span>
                                    <span className="px-3">
                                        <b>Candiate Name: </b> <span>{this.state.Name}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid current_candidate_info_mobile d-mobile-600-block" style={ { 'margin' : '50px 0 100px 0', 'fontFamily' : 'Quicksand' } }>
                            <div className="row">
                                <div className="col-6">
                                    <b>Token NO:</b> <br/>
                                    <span>{this.state.Token}</span>
                                </div>
                                <div className="col-6">
                                    <b>Candiate Name:</b> <br/>
                                    <span>{this.state.Name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-back d-flex justify-content-end">
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <Candidate ref='NCandidate' filledData={this.datas}  error={this.error} position="absolute" />
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <MedicalExam1 />
                                </div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <MedicalExam2 />
                                </div>
                                <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                    <Investigation />
                                </div>
                            </div>
                            <div className="w-50 errors">
                                <h1> { this.state.ActiveTabName } </h1>
                                <button className="btn btn-sm next-btn" onClick={ this.next }>
                                    Next 
                                    <i class="las la-chevron-circle-right"></i>
                                </button>
                                {
                                    this.state.error === null ?
                                    null
                                    :
                                    <h4 className="error_msg"> <i class="las la-exclamation-triangle"></i> { this.state.error } </h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )

    }

}

export default NewCandidateInfo;