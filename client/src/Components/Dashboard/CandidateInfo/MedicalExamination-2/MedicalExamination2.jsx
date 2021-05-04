import react, { Component } from 'react';

import './MedicalExamination2.css';
import $ from 'jquery';
import Loading from '../../../UI/Loading/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MedicalExamination2 extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            buttonDisabled: true,
            loading: true,

            Exam2: {

                generalAppearance: null,
                cardioVascular: null,
                respiratory: null,
                ent: null,
                Abdomen: null,
                hernia: null,
                hydrocele: null,
                exremities: null,
                back: null,
                skin: null,
                cns: null,
                deformities: null,
                speech: null,
                behaviour: null,
                orientation: null,
                memory: null,
                concentration: null,
                mood: null,
                thoughts: null,
                others: null

            }

        }

    }

    componentDidMount()
    {

        $('div.options-tabs').slideUp(0);

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

    onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = {
            ...this.state.Exam2,
            [name]: value
        }

        this.setState( { Exam2: setValues } );

    }

    exam2Submittion = ( event ) => {

        event.preventDefault();
        this.setState( { loading: true } );
        const formsData = new FormData();
        formsData.append( 'Token', Cookies.get('tokenNo') );
        formsData.append( 'generalAppearance', this.state.Exam2.generalAppearance );
        formsData.append( 'cardioVascular', this.state.Exam2.cardioVascular );
        formsData.append( 'respiratory', this.state.Exam2.respiratory );
        formsData.append( 'ent', this.state.Exam2.ent );
        formsData.append( 'Abdomen', this.state.Exam2.Abdomen );
        formsData.append( 'hernia', this.state.Exam2.hernia );
        formsData.append( 'hydrocele', this.state.Exam2.hydrocele );
        formsData.append( 'exremities', this.state.Exam2.exremities );
        formsData.append( 'back', this.state.Exam2.back );
        formsData.append( 'skin', this.state.Exam2.skin );
        formsData.append( 'cns', this.state.Exam2.cns );
        formsData.append( 'deformities', this.state.Exam2.deformities );
        formsData.append( 'speech', this.state.Exam2.speech );
        formsData.append( 'behaviour', this.state.Exam2.behaviour );
        formsData.append( 'orientation', this.state.Exam2.orientation );
        formsData.append( 'memory', this.state.Exam2.memory );
        formsData.append( 'concentration', this.state.Exam2.concentration );
        formsData.append( 'mood', this.state.Exam2.mood );
        formsData.append( 'thoughts', this.state.Exam2.thoughts );
        formsData.append( 'others', this.state.Exam2.others );
        formsData.append( 'inserter', Cookies.get('LoginID') );

        axios.post( '/medicalexamination2entry', formsData ).then( response => {

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

                toast.dark("Medical Examination 2 data inserted successfully", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });

                $('input.form-control').val('');

            }

        } )

    }
    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="MedicalExamination2">
                    <form className="MedicalExamination2-form" onSubmit={this.exam2Submittion}>
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

                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            {/* <p className="mb-0">GENERAL APPEARANCE</p> */}
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mb-2 rounded-0"
                                                name="generalAppearance"
                                                placeholder="GENERAL APPEARANCE"
                                                onChange={this.onChangeHandler}
                                            />

                                            {/* <p className="mb-0">CARDIOVASCULAR</p> */}
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mb-2 rounded-0"
                                                name="cardioVascular"
                                                placeholder="CARDIOVASCULAR"
                                                onChange={this.onChangeHandler}
                                            />

                                            {/* <p className="mb-0">RESPIRATORY</p> */}
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mb-2 rounded-0"
                                                name="respiratory"
                                                placeholder="RESPIRATORY"
                                                onChange={this.onChangeHandler}
                                            />

                                            {/* <p className="mb-0">ENT</p> */}
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mb-3 rounded-0"
                                                name="ent"
                                                placeholder="ENT"
                                                onChange={this.onChangeHandler}
                                            />

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            <div className="text-right" style={{ 'cursor': 'pointer' }}>
                                                <p className="border-bottom open_GESTRO_tab tab-btns font-weight-bold" id="GESTRO">GASTRO INTESTINAL</p>
                                                <div className="GESTRO_tab options-tabs text-left">
                                                    <nav>
                                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                            <a className="nav-item nav-link active" id="ABDOMEN-tab" data-toggle="tab" href="#ABDOMEN" role="tab" aria-controls="nav-home" aria-selected="true">ABDOMEN <sub>(Mass, Tenderness)</sub> </a>
                                                            <a className="nav-item nav-link" id="HERNIA-tab" data-toggle="tab" href="#HERNIA" role="tab" aria-controls="nav-profile" aria-selected="false">HERNIA</a>
                                                        </div>
                                                    </nav>
                                                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                        <div className="tab-pane fade show active" id="ABDOMEN" role="tabpanel" aria-labelledby="ABDOMEN-tab">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0"
                                                                name="Abdomen"
                                                                placeholder="ABDOMEN"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="tab-pane fade" id="HERNIA" role="tabpanel" aria-labelledby="HERNIA-tab">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0"
                                                                name="hernia"
                                                                placeholder="HERNIA"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="border-bottom open_GENITOURINARY_tab tab-btns font-weight-bold" id="GENITOURINARY">GENITOURINARY</p>
                                                <div className="GENITOURINARY_tab options-tabs text-left">
                                                    <div className='pb-3 px-3 px-sm-0'>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm mb-3 rounded-0"
                                                            name="hydrocele"
                                                            placeholder="HYDROCELE"
                                                            onChange={this.onChangeHandler}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="border-bottom open_MUSCULOSKELETAL_tab tab-btns font-weight-bold" id="MUSCULOSKELETAL">MUSCULOSKELETAL</p>
                                                <div className="MUSCULOSKELETAL_tab options-tabs text-left">
                                                    <nav>
                                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                            <a className="nav-item nav-link active" id="EXTREMITIES-tab" data-toggle="tab" href="#EXTREMITIES" role="tab" aria-controls="nav-home" aria-selected="true">EXTREMITIES</a>
                                                            <a className="nav-item nav-link" id="BACK-tab" data-toggle="tab" href="#BACK" role="tab" aria-controls="nav-profile" aria-selected="false">BACK</a>
                                                        </div>
                                                    </nav>
                                                    <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                        <div className="tab-pane fade show active" id="EXTREMITIES" role="tabpanel" aria-labelledby="EXTREMITIES-tab">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm mb-3 rounded-0"
                                                                name="exremities"
                                                                placeholder="EXTREMITIES"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                        <div className="tab-pane fade" id="BACK" role="tabpanel" aria-labelledby="BACK-tab">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm rounded-0"
                                                                name="back"
                                                                placeholder="BACK"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            {/* <p className="mb-1">SKIN</p> */}
                                            <input
                                                type="text"
                                                placeholder="SKIN"
                                                className="form-control form-control-sm mb-3 rounded-0"
                                                name="skin"
                                                onChange={this.onChangeHandler}
                                            />
                                            {/* <p className="mb-1">C.N.S</p> */}
                                            <input
                                                type="text"
                                                placeholder="C.N.S"
                                                className="form-control form-control-sm mb-3 rounded-0"
                                                name="cns"
                                                onChange={this.onChangeHandler}
                                            />
                                            {/* <p className="mb-1">DEFORMITIES</p> */}
                                            <input
                                                type="text"
                                                placeholder="DEFORMITIES"
                                                className="form-control form-control-sm mb-3 rounded-0"
                                                name="deformities"
                                                onChange={this.onChangeHandler}
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
                                                    {/* <p className="mb-1 text-left">Speech</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="SPEECH"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="speech"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                    {/* <p className="mb-1 text-left">Behaviour</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="BEHAVIOuR"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="behaviour"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>

                                                <p className="border-bottom tab-btns" id="Cognition">Cognition</p>

                                                <div className="Cognition_tab options-tabs">
                                                    {/* <p className="mb-1 text-left">Orientation</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="ORIENTAION"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="orientation"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                    {/* <p className="mb-1 text-left">Memory</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="MEMORY"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="memory"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                    {/* <p className="mb-1 text-left">Concentration</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="CONCENTRATION"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="concentration"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>

                                                <p className="border-bottom tab-btns" id="Mood">Mood</p>

                                                <div className="Mood_tab options-tabs">
                                                    {/* <p className="mb-1 text-left">Mood</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="MOOD"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="mood"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>

                                                <p className="border-bottom tab-btns" id="Thoughts">Thoughts</p>

                                                <div className="Thoughts_tab options-tabs">
                                                    {/* <p className="mb-1 text-left">Thoughts</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="THOUGHTS"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="thoughts"
                                                        onChange={this.onChangeHandler}
                                                    />
                                                </div>

                                                <p className="border-bottom tab-btns" id="OTHERS">OTHERS</p>

                                                <div className="OTHERS_tab options-tabs">
                                                    {/* <p className="mb-1 text-left">OTHERS</p> */}
                                                    <input
                                                        type="text"
                                                        placeholder="OTHERS"
                                                        className="form-control form-control-sm mb-3 rounded-0"
                                                        name="others"
                                                        onChange={this.onChangeHandler}
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

export default MedicalExamination2;