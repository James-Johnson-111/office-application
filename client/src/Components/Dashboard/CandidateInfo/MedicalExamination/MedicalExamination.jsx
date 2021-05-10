import react, { Component } from 'react';

import './MedicalExamination.css';
import $ from 'jquery';
import Loading from '../../../UI/Loading/Loading';
// import axios from '../../../axios-instance';
import axios from '../../../../axios-instance';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MedicalExamination extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            buttonDisabled: true,
            loading: true,
            Candidate: {
                height: null,
                weight: null,
                bmi: null,
                bp1: null,
                bp2: null,
                pulse: null,
                pr: null,
                unaidedDistantRtEye: null,
                unaidedDistantLtEye: null,
                aidedDistantRtEye: null,
                aidedDistantLtEye: null,
                aidedNearRtEye: null,
                aidedNearLtEye: null,
                unaidedNearRtEye: null,
                unaidedNearLtEye: null,
                colorVision:null,
                RightEar: null,
                LeftEar: null
            }

        }

    }

    componentDidMount()
    {
        
        this.setState( { loading: false } );

    }

    onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        let setValues = {
            ...this.state.Candidate,
            [name]: value
        };

        this.setState( { Candidate: setValues } );

    }

    MedicalExaminationSubmittion = ( event ) => {

        event.preventDefault();
        this.setState( { loading: true } );

        const formsData = new FormData();
        formsData.append('Token', Cookies.get('tokenNo') );
        formsData.append('height', this.state.Candidate.height );
        formsData.append('weight', this.state.Candidate.weight );
        formsData.append('bmi', this.state.Candidate.bmi );
        formsData.append('bp1', this.state.Candidate.bp1 );
        formsData.append('bp2', this.state.Candidate.bp2 );
        formsData.append('pulse', this.state.Candidate.pulse );
        formsData.append('pr', this.state.Candidate.pr );
        formsData.append('unaidedDistantRtEye', this.state.Candidate.unaidedDistantRtEye );
        formsData.append('unaidedDistantLtEye', this.state.Candidate.unaidedDistantLtEye );
        formsData.append('aidedDistantRtEye', this.state.Candidate.aidedDistantRtEye );
        formsData.append('aidedDistantLtEye', this.state.Candidate.aidedDistantLtEye );
        formsData.append('unaidedNearRtEye', this.state.Candidate.unaidedNearRtEye );
        formsData.append('unaidedNearLtEye', this.state.Candidate.unaidedNearLtEye );
        formsData.append('aidedNearRtEye', this.state.Candidate.aidedNearRtEye );
        formsData.append('aidedNearLtEye', this.state.Candidate.aidedNearLtEye );
        formsData.append('colorVision', this.state.Candidate.colorVision );
        formsData.append('RightEar', this.state.Candidate.RightEar );
        formsData.append('LeftEar', this.state.Candidate.LeftEar );
        formsData.append('Insertor', Cookies.get('LoginID') );

        axios.post( '/exam1', formsData ).then( response => {
            console.log( response.data );

            if( response.data[0] == "Candidate Data Not Found" )
            {
                this.setState( { loading: false } );

                toast.dark("Candidate Data Not Found", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

            }else
            {
                this.setState( { loading: false } );

                toast.dark("Medical Examination 1 data inserted successfully", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });
                
                $('input.form-control').val('');

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


    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="MedicalExamination">
                    <form className="MedicalExamination-form" onSubmit={this.MedicalExaminationSubmittion}>
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="genralInfo-tab" data-toggle="tab" href="#genralInfo" role="tab" aria-controls="nav-home" aria-selected="true">General Information</a>
                                <a className="nav-item nav-link" id="eyeInfo-tab" data-toggle="tab" href="#eyeInfo" role="tab" aria-controls="nav-profile" aria-selected="false">Eye Information</a>
                                <a className="nav-item nav-link" id="earInfo-tab" data-toggle="tab" href="#earInfo" role="tab" aria-controls="nav-profile" aria-selected="false">Ear Information</a>
                            </div>
                        </nav>
                        <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="genralInfo" role="tabpanel" aria-labelledby="genralInfo-tab">
                                <div className="container-fluid">
                                    <div className="row">


                                        {/* 
                                                
                                                *********************************
                                                *  General content start        *
                                                *                               *
                                                *********************************

                                                */}

                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-text-height"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                placeholder="Height (in cm)"
                                                name="height"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-dumbbell"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                placeholder="Weight (in Kgs)"
                                                name="weight"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-broadcast-tower"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                placeholder="BMI"
                                                name="bmi"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-heart-broken"></i>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm rounded-0 text-center"
                                                    placeholder="B.P"
                                                    name="bp1"
                                                    onChange={this.onChangeHandler}
                                                />
                                                <div className="d-grid px-2 font-weight-bold">
                                                    <small>/</small>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm rounded-0 text-center"
                                                    placeholder="B.P"
                                                    name="bp2"
                                                    onChange={this.onChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-wave-square"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                placeholder="Pulse (per min)"
                                                name="pulse"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-heart-broken"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                placeholder="PR (per min)"
                                                name="pr"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>

                                        {/* 
                                                
                                                *********************************
                                                *  General content End          *
                                                *                               *
                                                *********************************

                                                */}
                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade" id="eyeInfo" role="tabpanel" aria-labelledby="eyeInfo-tab">
                                <div className="container-fluid">
                                    <div className="row">

                                        {/* 
                                                
                                                *********************************
                                                *  Eye content start            *
                                                *                               *
                                                *********************************

                                                */}

                                        <div className="col-lg-12 col-md-12 text-center col-sm-12 d-grid mb-3">
                                            <h5 className="font-weight-bold mb-0 pb-0">Visual Acuity</h5>
                                        </div>

                                        {/* 
                                                
                                                *****************************************
                                                *                                       *
                                                *                                       *
                                                * Unaided Eye section start             *
                                                *****************************************

                                                */}

                                        <div className="col-lg-12 col-md-12 text-center col-sm-12 d-grid mb-3">
                                            <h6 className="font-weight-bold mb-0 pb-0">UnAided</h6>
                                        </div>
                                        <div className="col-lg-4 offset-4 text-center">
                                            <p>Rt.Eye</p>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            <p>Lt.Eye</p>
                                        </div>
                                        <div className="col-4 d-grid">
                                            <p className="mb-0">Distant</p>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="unaidedDistantRtEye"
                                                defaultValue="/6"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="unaidedDistantLtEye"
                                                defaultValue="/6"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4 d-grid">
                                            <p className="mb-0">Near</p>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="unaidedNearRtEye"
                                                defaultValue="20/"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="unaidedNearLtEye"
                                                defaultValue="20/"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        {/* 
                                                
                                                *****************************************
                                                *                                       *
                                                *                                       *
                                                * Unaided Eye section End               *
                                                *****************************************

                                                */}

                                        {/* 
                                                
                                                *****************************************
                                                *                                       *
                                                *                                       *
                                                * Aided Eye section start               *
                                                *****************************************

                                                */}

                                        <div className="col-lg-12 col-md-12 text-center col-sm-12 d-grid my-3">
                                            <h6 className="font-weight-bold mb-0 pb-0">Aided</h6>
                                        </div>
                                        <div className="col-lg-4 offset-4 text-center">
                                            <p>Rt.Eye</p>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                            <p>Lt.Eye</p>
                                        </div>
                                        <div className="col-4 d-grid">
                                            <p className="mb-0">Distant</p>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="aidedDistantRtEye"
                                                defaultValue="/6"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="aidedDistantLtEye"
                                                defaultValue="/6"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4 d-grid">
                                            <p className="mb-0">Near</p>
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="aidedNearRtEye"
                                                defaultValue="20/"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 text-center"
                                                name="aidedNearLtEye"
                                                defaultValue="20/"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>

                                        {/* 
                                                
                                                *****************************************
                                                *                                       *
                                                *                                       *
                                                * Aided Eye section End                 *
                                                *****************************************

                                                */}


                                        {/* 
                                                
                                                *****************************************
                                                *                                       *
                                                *                                       *
                                                * Colour Vision End                     *
                                                *****************************************

                                                */}

                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="earInfo" role="tabpanel" aria-labelledby="earInfo-tab">
                                <div className="container-fluid">
                                    <div className="row">


                                        {/* 
                                                
                                                *********************************
                                                *  Hearing content start        *
                                                *                               *
                                                *********************************

                                                */}

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <p className="mb-0 mt-3 ml-3">Rt.Ear</p>
                                        </div>

                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-assistive-listening-systems"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                name="RightEar"
                                                placeholder="Right Ear"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>

                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <p className="mb-0 mt-3 ml-3">Lt.Ear</p>
                                        </div>
                                        <div className="d-flex justify-content-center mb-3 w-100">
                                            <div className="d-grid mr-2">
                                                <i className="las la-assistive-listening-systems"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0"
                                                name="LeftEar"
                                                placeholder="Left Ear"
                                                onChange={this.onChangeHandler}
                                            />
                                        </div>

                                        {/* 
                                                
                                                *********************************
                                                *  Hearing content End          *
                                                *                               *
                                                *********************************

                                                */}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-sm w-50"
                            // disabled={ this.state.buttonDisabled ? 'disabled' : null }
                            >Submit</button>
                        </div>
                    </form>
                </div>
                <ToastContainer autoClose={3000} />
            </>

        );

    }

}

export default MedicalExamination;