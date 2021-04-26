import react, { Component } from 'react';

import './MedicalExamination.css';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';

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
                bp: null,
                pulse: null,
                pr: null,
                unaidedDistantRtEye: null,
                unaidedDistantLtEye: null,
                aidedDistantRtEye: null,
                aidedDistantLtEye: null,
            }

        }

    }

    componentDidMount()
    {
        
        this.setState( { loading: false } );

    }

    onChangeHandler = ( event ) => {

        // event.preventDefault();
        const { name, value } = event.target;
        let setValues = {
            ...this.state.Candidate,
            [name]: value
        };

        this.setState( { Candidate: setValues } );

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="MedicalExamination d-grid">
                    <div className="MedicalExamination-inner d-flex justify-content-center">
                        <div className="MedicalExamination-content">
                            <form className="MedicalExamination-form">
                                <h3 className="mb-3">Medical Examination</h3>
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

                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>Height</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        placeholder="cm"
                                                        name="height"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>
                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>Weight</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        placeholder="Kgs"
                                                        name="weight"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>
                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>BMI</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="bmi"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>

                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>B.P</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                        defaultValue="/"
                                                        name="bp"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>
                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>Pulse</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        placeholder="/min"
                                                        name="pulse"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>
                                                <div className="col-lg-1 col-md-3 col-sm-3 d-grid">
                                                    <p>PR</p>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        placeholder="/min"
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

                                                <div className="col-lg-4 col-md-12 text-center col-sm-12 d-grid">
                                                    <h5 className="font-weight-bold">Visual Acuity</h5>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *  the following distant coloumn     *
                                                *  will only seen on mobile screen   *
                                                * small distant start                *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid outer-col distant-sm bg-mobile-block">
                                                    <h6 className="font-weight-bold">Distant</h6>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * small distant End                  *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid outer-col">
                                                    <p className="font-weight-bold">UnAided</p>
                                                    <div className="row">
                                                        <div className="col-6 font-weight-bold">
                                                            <p>Rt.Eye</p>
                                                        </div>
                                                        <div className="col-6 font-weight-bold">
                                                            <p>Lt.Eye</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *  the following distant coloumn     *
                                                *  will only seen on mobile screen   *
                                                * small distant start                *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid distant-unaided-sm">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="unaidedDistantRtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="unaidedDistantLtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * small distant End                  *
                                                **************************************

                                                */}



                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid outer-col">
                                                    <p className="font-weight-bold">Aided</p>
                                                    <div className="row">
                                                        <div className="col-6 font-weight-bold">
                                                            <p>Rt.Eye</p>
                                                        </div>
                                                        <div className="col-6 font-weight-bold">
                                                            <p>Lt.Eye</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *  the following distant coloumn     *
                                                *  will only seen on mobile screen   *
                                                * small distant start                *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid distant-aided-sm">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="aidedDistantRtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="aidedDistantLtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * small distant End                  *
                                                **************************************

                                                */}

                                                {/* 
                                                
                                                **************************************
                                                *  the following distant coloumn     *
                                                *  will only seen on large screen    *
                                                * large distant start                *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid outer-col distant-lg">
                                                    <p className="font-weight-bold">Distant</p>
                                                </div>
                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid distant-aided-lg">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="unaidedDistantRtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="unaidedDistantLtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid distant-unaided-lg">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="aidedDistantRtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="aidedDistantLtEye"
                                                                defaultValue="/6"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * large distant End                  *
                                                **************************************

                                                */}

                                                {/* 
                                                
                                                **************************************
                                                *  the following Near coloumn        *
                                                *                                    *
                                                * Near start                         *
                                                **************************************

                                                */}


                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid outer-col bg-mobile-block">
                                                    <p className="font-weight-bold">Near</p>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *  the following Near coloumn        *
                                                *  will only seen on mobile screen   *
                                                * small Near start                   *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid outer-col near-sm">
                                                    <p className="font-weight-bold">UnAided</p>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * small Near End                     *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="loginID"
                                                                defaultValue="20/"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="loginID"
                                                                defaultValue="20/"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* 
                                                
                                                **************************************
                                                *  the following Near coloumn        *
                                                *  will only seen on mobile screen   *
                                                * small Near start                   *
                                                **************************************

                                                */}

                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid outer-col near-sm">
                                                    <p className="font-weight-bold">Aided</p>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * small Near End                     *
                                                **************************************

                                                */}


                                                <div className="col-lg-4 col-md-6 text-center col-sm-6 d-grid">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="loginID"
                                                                defaultValue="20/"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0 text-center"
                                                                name="loginID"
                                                                defaultValue="20/"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 
                                                
                                                **************************************
                                                *                                    *
                                                *                                    *
                                                * Near End                           *
                                                **************************************

                                                */}

                                                {/* 
                                                
                                                *****************************************
                                                *  the following Colour Vision coloumn  *
                                                *                                       *
                                                * Colour Vision start                   *
                                                *****************************************

                                                */}


                                                <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid ColourVision-col outer-col">
                                                    <p className="font-weight-bold">Colour Vision</p>
                                                </div>
                                                <div className="col-lg-2 col-md-4 text-center col-sm-4 d-grid">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <input
                                                                type="radio"
                                                                className=" mr-1"
                                                                name="loginID"
                                                            />
                                                            <span>Normal</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-4 text-center col-sm-4 d-grid">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <input
                                                                type="radio"
                                                                className=" mr-1"
                                                                name="loginID"
                                                            />
                                                            <span>Doubtful</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-4 text-center col-sm-4 d-grid">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <input
                                                                type="radio"
                                                                className=" mr-1"
                                                                name="loginID"
                                                            />
                                                            <span>Defective</span>
                                                        </div>
                                                    </div>
                                                </div>


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

                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <p className="font-weight-bold">Rt.Ear</p>
                                                </div>


                                                {/* 
                                                
                                                ******************************************
                                                *  The following column will disappear   *
                                                *  on mobile screens                     *
                                                *  column start                          *
                                                ******************************************

                                                */}


                                                <div className="col-lg-6 col-md-6 col-sm-6 d-mobile-none">
                                                    <p className="font-weight-bold">Lt.Ear</p>
                                                </div>


                                                {/* 
                                                
                                                ******************************************
                                                *                                        *
                                                *                                        *
                                                *  column end                            *
                                                ******************************************

                                                */}

                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="loginID"
                                                    />
                                                </div>

                                                {/* 
                                                
                                                ******************************************
                                                *  The following column will appear      *
                                                *  on mobile screens                     *
                                                *  column start                          *
                                                ******************************************

                                                */}

                                                <div className="col-lg-6 col-md-6 col-sm-6 d-mobile-block">
                                                    <p className="font-weight-bold">Lt.Ear</p>
                                                </div>

                                                {/* 
                                                
                                                ******************************************
                                                *                                        *
                                                *                                        *
                                                *  column end                            *
                                                ******************************************

                                                */}

                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="loginID"
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
                                        className="btn btns w-50"
                                    // disabled={ this.state.buttonDisabled ? 'disabled' : null }
                                    >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default MedicalExamination;