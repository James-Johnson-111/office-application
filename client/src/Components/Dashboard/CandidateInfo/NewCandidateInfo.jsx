import react, { Component } from 'react';

import './NewCandidateInfo.css';
import Cookies from 'js-cookie';
import axios from 'axios';

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
        }

    }

    componentDidMount()
    {

        this.setState( { ActiveTabName: 'Candidate Information' } );

        if( Cookies.get('tokenNo') != undefined || Cookies.get('tokenNo') != null )
        {

            setInterval( () => {
            
                this.setState({ Token: "Loading", Name: "Loading" });
    
                const formsData = new FormData();
                formsData.append('token', Cookies.get('tokenNo'));
                axios.post('/gettokendata', formsData).then(response => {
    
                    if (response.data[0] == "N") {
    
                        this.setState({ Token: "Not Found", Name: "Not Found" });
    
                    } else {
    
                        this.setState({ Token: Cookies.get('tokenNo'), Name: response.data[0].candidate_name });
    
                    }
    
                }).catch(error => {
    
                    this.setState({ Token: "Not Found", Name: "Not Found" });
    
                })
                
            }, 5 * 1000);

        }

    }

    getVal = ( Val ) => {

        if( Val === 'candidate' )
        {

            this.setState( { ActiveTabName: 'Candidate Information' } );

        }
        if( Val === 'exam1' )
        {

            this.setState( { ActiveTabName: 'First Medical Exam' } );

        }
        if( Val === 'exam2' )
        {

            this.setState( { ActiveTabName: 'Second Medical Exam' } );

        }
        if( Val === 'investigation' )
        {

            this.setState( { ActiveTabName: 'Laboratory Investigation' } );

        }

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


                        <div className="current_candidate_info">
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

                        <div className="form-back d-flex justify-content-lg-end">
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <Candidate />
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
                            <div className="w-50 p-5 errors">
                                <h1> { this.state.ActiveTabName } </h1>
                                {/* <h6>Please fill this form carefully</h6> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )

    }

}

export default NewCandidateInfo;