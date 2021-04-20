import react, { Component } from 'react';

import './MedicalExamination2.css';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';

class MedicalExamination2 extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            buttonDisabled: true,
            loading: true

        }

    }

    componentDidMount()
    {

        $('div.options-tabs').slideUp();
        $('div.GESTRO_tab').slideDown();

        $('input').on( 'change', function() {

            let values = $('.MedicalExamination2-form');
            console.log($(values).find("input[type='text'][class='form-control']").innerHtml());
            if ($(values).find("input[type='text'][class='form-control']").val() != null) {
                console.log(values);
            }

        } )

        function openClose( name )
        {

            let selector = $(name).attr('id');

            $('div.options-tabs').slideUp();
            $('div.'+selector+'_tab').slideDown();

        }

        $('.tab-btns').on( 'click', function() {

            openClose(this);

        } );

        this.setState( { loading: false } );

    }

    render()
    {

        let load = <Loading />

        if ( !this.state.loading )
        {

            load = (

                <div className="MedicalExamination2-background">
                    <div className="MedicalExamination2 d-grid">
                        <div className="MedicalExamination2-inner d-flex justify-content-center">
                            <div className="MedicalExamination2-content">
                                <form className="MedicalExamination2-form">
                                    <h3 className="mb-3">Medical Examination 2</h3>
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="sysInfo-tab" data-toggle="tab" href="#sysInfo" role="tab" aria-controls="nav-home" aria-selected="true">Systemic Information</a>
                                            <a className="nav-item nav-link" id="mentalSInfo-tab" data-toggle="tab" href="#mentalSInfo" role="tab" aria-controls="nav-profile" aria-selected="false">Mental Status Information</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="sysInfo" role="tabpanel" aria-labelledby="sysInfo-tab">
                                            <div className="container-fluid">
                                                <div className="row">


                                                    {/* 
                                                
                                                *********************************
                                                *  System Content start         *
                                                *                               *
                                                *********************************

                                                */}

                                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                                        <p className="mb-1">GENERAL APPEARANCE</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">CARDIOVASCULAR</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">RESPIRATORY</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">ENT</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                    </div>
                                                    <div className="col-lg-8 col-md-6 col-sm-12">

                                                        <div className="text-right" style={{ 'cursor': 'pointer' }}>
                                                            <p className="border-bottom open_GESTRO_tab tab-btns" id="GESTRO">GESTRO INTESTINAL</p>
                                                            <p className="border-bottom open_GENITOURINARY_tab tab-btns" id="GENITOURINARY">GENITOURINARY</p>
                                                            <p className="border-bottom open_MUSCULOSKELETAL_tab tab-btns" id="MUSCULOSKELETAL">MUSCULOSKELETAL</p>
                                                        </div>
                                                        <div className="GESTRO_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="ABDOMEN-tab" data-toggle="tab" href="#ABDOMEN" role="tab" aria-controls="nav-home" aria-selected="true">ABDOMEN <sub>(Mass, Tenderness)</sub> </a>
                                                                    <a className="nav-item nav-link" id="HERNIA-tab" data-toggle="tab" href="#HERNIA" role="tab" aria-controls="nav-profile" aria-selected="false">HERNIA</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="ABDOMEN" role="tabpanel" aria-labelledby="ABDOMEN-tab">
                                                                    <p className="mb-1">ABDOMEN</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="ABDOMEN"
                                                                    />
                                                                </div>
                                                                <div className="tab-pane fade" id="HERNIA" role="tabpanel" aria-labelledby="HERNIA-tab">
                                                                    <p className="mb-1">HERNIA</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="HERNIA"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="GENITOURINARY_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="HYDROCELE-tab" data-toggle="tab" href="#HYDROCELE" role="tab" aria-controls="nav-home" aria-selected="true">HYDROCELE</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="HYDROCELE" role="tabpanel" aria-labelledby="HYDROCELE-tab">
                                                                    <p className="mb-1">HYDROCELE</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="HYDROCELE"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="MUSCULOSKELETAL_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="EXTREMITIES-tab" data-toggle="tab" href="#EXTREMITIES" role="tab" aria-controls="nav-home" aria-selected="true">EXTREMITIES</a>
                                                                    <a className="nav-item nav-link" id="BACK-tab" data-toggle="tab" href="#BACK" role="tab" aria-controls="nav-profile" aria-selected="false">BACK</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="EXTREMITIES" role="tabpanel" aria-labelledby="EXTREMITIES-tab">
                                                                    <p className="mb-1">EXTREMITIES</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="EXTREMITIES"
                                                                    />
                                                                </div>
                                                                <div className="tab-pane fade" id="BACK" role="tabpanel" aria-labelledby="BACK-tab">
                                                                    <p className="mb-1">BACK</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="BACK"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-12">
                                                        <p className="mb-1">SKIN</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                        <p className="mb-1">C.N.S</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                        <p className="mb-1">DEFORMITIES</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                    </div>

                                                    {/* 
                                                
                                                *********************************
                                                *  System Content End           *
                                                *                               *
                                                *********************************

                                                */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="mentalSInfo" role="tabpanel" aria-labelledby="mentalSInfo-tab">
                                            <div className="container-fluid">
                                                <div className="row">

                                                    {/* 
                                                
                                                **********************************************
                                                *  Mental Status Examination content start   *
                                                *                                            *
                                                **********************************************

                                                */}

                                                    <div className="col-12">
                                                        <div className="text-right" style={{ 'cursor': 'pointer' }}>
                                                            <p className="border-bottom tab-btns" id="Appearance">Appearance</p>

                                                            <div className="Appearance_tab options-tabs">
                                                                <p className="mb-1 text-left">Speech</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Behaviour</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Cognition">Cognition</p>

                                                            <div className="Cognition_tab options-tabs">
                                                                <p className="mb-1 text-left">Orientation</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Memory</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Concentration</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Mood">Mood</p>

                                                            <div className="Mood_tab options-tabs">
                                                                <p className="mb-1 text-left">Mood</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Thoughts">Thoughts</p>

                                                            <div className="Thoughts_tab options-tabs">
                                                                <p className="mb-1 text-left">Thoughts</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="OTHERS">OTHERS</p>

                                                            <div className="OTHERS_tab options-tabs">
                                                                <p className="mb-1 text-left">OTHERS</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* 
                                                
                                                *******************************************
                                                *                                         *
                                                *                                         *
                                                * Mental Status Examination content End   *
                                                *******************************************

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
                </div>

            )

        }

        return(

            <>
                {/* { load } */}
                <div className="MedicalExamination2-background">
                    <div className="MedicalExamination2 d-grid">
                        <div className="MedicalExamination2-inner d-flex justify-content-center">
                            <div className="MedicalExamination2-content">
                                <form className="MedicalExamination2-form">
                                    <h3 className="mb-3">Medical Examination 2</h3>
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="sysInfo-tab" data-toggle="tab" href="#sysInfo" role="tab" aria-controls="nav-home" aria-selected="true">Systemic Information</a>
                                            <a className="nav-item nav-link" id="mentalSInfo-tab" data-toggle="tab" href="#mentalSInfo" role="tab" aria-controls="nav-profile" aria-selected="false">Mental Status Information</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                        <div className="tab-pane fade show active" id="sysInfo" role="tabpanel" aria-labelledby="sysInfo-tab">
                                            <div className="container-fluid">
                                                <div className="row">


                                                    {/* 
                                                
                                                *********************************
                                                *  System Content start         *
                                                *                               *
                                                *********************************

                                                */}

                                                    <div className="col-lg-4 col-md-6 col-sm-12">

                                                        <p className="mb-1">GENERAL APPEARANCE</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">CARDIOVASCULAR</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">RESPIRATORY</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                        <p className="mb-1">ENT</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />

                                                    </div>
                                                    <div className="col-lg-8 col-md-6 col-sm-12">

                                                        <div className="text-right" style={{ 'cursor': 'pointer' }}>
                                                            <p className="border-bottom open_GESTRO_tab tab-btns" id="GESTRO">GESTRO INTESTINAL</p>
                                                            <p className="border-bottom open_GENITOURINARY_tab tab-btns" id="GENITOURINARY">GENITOURINARY</p>
                                                            <p className="border-bottom open_MUSCULOSKELETAL_tab tab-btns" id="MUSCULOSKELETAL">MUSCULOSKELETAL</p>
                                                        </div>
                                                        <div className="GESTRO_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="ABDOMEN-tab" data-toggle="tab" href="#ABDOMEN" role="tab" aria-controls="nav-home" aria-selected="true">ABDOMEN <sub>(Mass, Tenderness)</sub> </a>
                                                                    <a className="nav-item nav-link" id="HERNIA-tab" data-toggle="tab" href="#HERNIA" role="tab" aria-controls="nav-profile" aria-selected="false">HERNIA</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="ABDOMEN" role="tabpanel" aria-labelledby="ABDOMEN-tab">
                                                                    <p className="mb-1">ABDOMEN</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="ABDOMEN"
                                                                    />
                                                                </div>
                                                                <div className="tab-pane fade" id="HERNIA" role="tabpanel" aria-labelledby="HERNIA-tab">
                                                                    <p className="mb-1">HERNIA</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="HERNIA"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="GENITOURINARY_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="HYDROCELE-tab" data-toggle="tab" href="#HYDROCELE" role="tab" aria-controls="nav-home" aria-selected="true">HYDROCELE</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="HYDROCELE" role="tabpanel" aria-labelledby="HYDROCELE-tab">
                                                                    <p className="mb-1">HYDROCELE</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="HYDROCELE"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="MUSCULOSKELETAL_tab options-tabs">
                                                            <nav>
                                                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                                    <a className="nav-item nav-link active" id="EXTREMITIES-tab" data-toggle="tab" href="#EXTREMITIES" role="tab" aria-controls="nav-home" aria-selected="true">EXTREMITIES</a>
                                                                    <a className="nav-item nav-link" id="BACK-tab" data-toggle="tab" href="#BACK" role="tab" aria-controls="nav-profile" aria-selected="false">BACK</a>
                                                                </div>
                                                            </nav>
                                                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                                <div className="tab-pane fade show active" id="EXTREMITIES" role="tabpanel" aria-labelledby="EXTREMITIES-tab">
                                                                    <p className="mb-1">EXTREMITIES</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="EXTREMITIES"
                                                                    />
                                                                </div>
                                                                <div className="tab-pane fade" id="BACK" role="tabpanel" aria-labelledby="BACK-tab">
                                                                    <p className="mb-1">BACK</p>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm rounded-0"
                                                                        placeholder="cm"
                                                                        name="loginID"
                                                                        placeholder="BACK"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-12">
                                                        <p className="mb-1">SKIN</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                        <p className="mb-1">C.N.S</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                        <p className="mb-1">DEFORMITIES</p>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="loginID"
                                                        />
                                                    </div>

                                                    {/* 
                                                
                                                *********************************
                                                *  System Content End           *
                                                *                               *
                                                *********************************

                                                */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="mentalSInfo" role="tabpanel" aria-labelledby="mentalSInfo-tab">
                                            <div className="container-fluid">
                                                <div className="row">

                                                    {/* 
                                                
                                                **********************************************
                                                *  Mental Status Examination content start   *
                                                *                                            *
                                                **********************************************

                                                */}

                                                    <div className="col-12">
                                                        <div className="text-right" style={{ 'cursor': 'pointer' }}>
                                                            <p className="border-bottom tab-btns" id="Appearance">Appearance</p>

                                                            <div className="Appearance_tab options-tabs">
                                                                <p className="mb-1 text-left">Speech</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Behaviour</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Cognition">Cognition</p>

                                                            <div className="Cognition_tab options-tabs">
                                                                <p className="mb-1 text-left">Orientation</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Memory</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                                <p className="mb-1 text-left">Concentration</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Mood">Mood</p>

                                                            <div className="Mood_tab options-tabs">
                                                                <p className="mb-1 text-left">Mood</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="Thoughts">Thoughts</p>

                                                            <div className="Thoughts_tab options-tabs">
                                                                <p className="mb-1 text-left">Thoughts</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                            <p className="border-bottom tab-btns" id="OTHERS">OTHERS</p>

                                                            <div className="OTHERS_tab options-tabs">
                                                                <p className="mb-1 text-left">OTHERS</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-sm mb-3 rounded-0"
                                                                    name="loginID"
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* 
                                                
                                                *******************************************
                                                *                                         *
                                                *                                         *
                                                * Mental Status Examination content End   *
                                                *******************************************

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
                </div>
            </>

        );

    }

}

export default MedicalExamination2;