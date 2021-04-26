import react, { Component } from 'react';

import './ReportPanel.css';
import axios from '../../../axios-instance';
import Modal from '../../UI/Modal/Modal';
import $ from "jquery";

class ReportPanel extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            candidateInfo: {
                ID: null
            },
            candidateReportInfo: {},
            showRecordModal: false,
            modalHeight: null
        }

    }

    componentDidMount()
    {

        $('form').on('submit', function() {

            $('input[type=text][name=ID]').val('');

        } )

        let modalHeight = null;
        let halfheight = null;

        modalHeight = $('.Modal').innerHeight();
        halfheight = modalHeight / 2;
        
        this.setState( { modalHeight: halfheight } );

    }

    ManualChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = {

            ...this.state.candidateInfo,
            [name]: value

        }
        this.setState( { candidateInfo: setValues } );

    }

    ManualEntry = ( event ) => {

        event.preventDefault();
        const formsData = new FormData();

        formsData.append('CandidateID', this.state.candidateInfo.ID);

        axios.post( '/getcandidatereports', formsData ).then( response => {

            if( response.data[0] == undefined )
            {

                console.log( "No Records Found" );

            }else
            {

                console.log( response.data[0] );

                for( let key in response.data )
                {
                    this.setState( { candidateReportInfo: response.data[key] } );
                }

                this.setState( { showRecordModal: true } );

            }

        } );

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
                <div className="ReportPanel">
                    <Modal top={this.state.modalHeight} show={this.state.showRecordModal} close={this.modalToggle}>
                        {Records}
                    </Modal>
                    <div className="ReportPanel-inner d-flex justify-content-center">
                        <div className="ReportPanel-content">
                            <h3 className="mb-3">Report Panel</h3>
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Manual Entry</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">QR Code Scan</a>
                                </div>
                            </nav>
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className="container">

                                        <form onSubmit={this.ManualEntry}>
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
                                                        onChange={this.ManualChangeHandler}
                                                    />
                                                </div>
                                                <div className="col-12 d-grid mb-3">
                                                    <button className="btn btns" type='submit'>Search</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
					            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default ReportPanel;