import react, { Component } from 'react';

import './LaboratoryInvestigation.css';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';
import axios from '../../../axios-instance';

class LaboratoryInvestigation extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            loading: true,
            Investication: {},
            vaccination: {
                Polio: {}
            }

        }

    }

    componentDidMount()
    {

        $('div.options-tabs').slideUp(0);
        $('div.THICKFILMFOR_tab').slideDown();

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

    onChangehandler =( event ) => {

        const { name, value } = event.target;
        const setvalues = {
            ...this.state.Investication,
            [name]: value
        }

        this.setState( { Investication: setvalues } );

    }

    vaccinationChangehandler = ( event ) => {

        const { name, value } = event.target;
        let setValues = {};
        
        setValues = {
            ...this.state.vaccination,
            [name]: value
        }

        this.setState( { vaccination: setValues } );

    }

    onLaboratorySubmittion = ( event ) => {

        event.preventDefault();
        this.setState( { loading: true } );
        const formsData = new FormData();
        formsData.append( 'bloodGroup', this.state.Investication.bloodGroup );
        formsData.append( 'hemoglobin', this.state.Investication.hemoglobin );
        formsData.append( 'malaria', this.state.Investication.malaria );
        formsData.append( 'microFilaria', this.state.Investication.microFilaria );
        formsData.append( 'RBs', this.state.Investication.RBs );
        formsData.append( 'lft', this.state.Investication.lft );
        formsData.append( 'creatinine', this.state.Investication.creatinine );
        formsData.append( 'hivIII', this.state.Investication.hivIII );
        formsData.append( 'HbsAg', this.state.Investication.HbsAg );
        formsData.append( 'antiHcv', this.state.Investication.antiHcv );
        formsData.append( 'vdrl', this.state.Investication.vdrl );
        formsData.append( 'tpha', this.state.Investication.tpha );
        formsData.append( 'sugar', this.state.Investication.sugar );
        formsData.append( 'albumin', this.state.Investication.albumin );
        formsData.append( 'CovidPCR', this.state.Investication.CovidPCR );
        formsData.append( 'CovidAntibodies', this.state.Investication.CovidAntibodies );
        formsData.append( 'helminthes', this.state.Investication.helminthes );
        formsData.append( 'ova', this.state.Investication.ova );
        formsData.append( 'cyst', this.state.Investication.cyst );
        formsData.append( 'others', this.state.Investication.others );

        formsData.append( 'Polio', this.state.vaccination.Polio );
        formsData.append( 'PolioDate', this.getDate(this.state.vaccination.PolioDate) );
        formsData.append( 'MMR1', this.state.vaccination.MMR1 );
        formsData.append( 'MMR1Date', this.getDate(this.state.vaccination.MMR1Date) );
        formsData.append( 'MMR2', this.state.vaccination.MMR2 );
        formsData.append( 'MMR2Date', this.getDate(this.state.vaccination.MMR2Date) );
        formsData.append( 'Meningococcal', this.state.vaccination.Meningococcal );
        formsData.append( 'MeningococcalDate', this.getDate(this.state.vaccination.MeningococcalDate) );
        formsData.append( 'Covid', this.state.vaccination.Covid );
        formsData.append( 'CovidDate', this.getDate(this.state.vaccination.CovidDate) );

        axios.post( '/laboratoryentry', formsData ).then( response => {

            console.log(response.data[0]);

        } ).catch( error => {

            console.log( error );

        } );

    }

    getDate = ( value ) => {

        let getSplit = value.split('-');
        let year = getSplit[0];
        let month = getSplit[1];
        let date = getSplit[2];

        let removeZeroFromMonth = month.substring(1,2);
        let getCorrectMonth = removeZeroFromMonth - 1;

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let getMonthName = monthNames[getCorrectMonth];

        let WhatTheCorrectDate = year + "-" + getMonthName + "-" + date;
        return WhatTheCorrectDate;

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="LaboratoryInvestigation-background">
                    <div className="LaboratoryInvestigation d-grid">
                        <div className="LaboratoryInvestigation-inner d-flex justify-content-center">
                            <div className="LaboratoryInvestigation-content">

                                {/* 
                        ************************************************
                        *  LaboratoryInvestigation content has started *
                        *                                              *
                        * **********************************************
                        */}

                                <div className="container-fluid">
                                    <h3 className="mb-3">
                                        Laboratory Investigation
                            </h3>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 px-0">

                                            <p className="text-uppercase font-weight-bold mb-1">blood group</p>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 mb-3"
                                                name="bloodGroup"
                                                onChange={this.onChangehandler}
                                            />
                                            <p className="text-uppercase font-weight-bold mb-1">hemoglobin</p>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 mb-3"
                                                name="hemoglobin"
                                                onChange={this.onChangehandler}
                                            />

                                            <h6 className="text-uppercase text-center font-weight-bold mb-1">Vaccination Status</h6>
                                            <div className="container-fluid pt-3 pr-5">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-4 font-weight-bold mb-3 text-center">
                                                        Type
                                                </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-4 font-weight-bold mb-3 text-center">
                                                        Status
                                                </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-4 font-weight-bold mb-3 text-center">
                                                        date
                                                </div>

                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        Polio
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select onChange={this.vaccinationChangehandler} name="Polio" className="form-control form-control-sm rounded-0">
                                                            <option value="" selected></option>
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input onChange={this.vaccinationChangehandler} type="date" name="PolioDate" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        MMR 1
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select onChange={this.vaccinationChangehandler} name="MMR1" className="form-control form-control-sm rounded-0">
                                                            <option value="" selected></option>
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input onChange={this.vaccinationChangehandler} type="date" name="MMR1Date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        MMR2
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select onChange={this.vaccinationChangehandler} name="MMR2" className="form-control form-control-sm rounded-0">
                                                            <option value="" selected></option>
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input onChange={this.vaccinationChangehandler} type="date" name="MMR2Date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        Meningococcal
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select onChange={this.vaccinationChangehandler} name="Meningococcal" className="form-control form-control-sm rounded-0">
                                                            <option value="" selected></option>
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input onChange={this.vaccinationChangehandler} type="date" name="MeningococcalDate" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        Covid
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select onChange={this.vaccinationChangehandler} name="Covid" className="form-control form-control-sm rounded-0">
                                                            <option value="" selected></option>
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input onChange={this.vaccinationChangehandler} type="date" name="CovidDate" className="form-control rounded-0 form-control-sm" />

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12">

                                            <div style={{ 'cursor': 'pointer' }}>
                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="THICKFILMFOR">THICK FILM FOR</p>

                                                <div className="THICKFILMFOR_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">malaria</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="malaria"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">micro filaria</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="microFilaria"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="BIOCHEMISTRY">BIOCHEMISTRY</p>

                                                <div className="BIOCHEMISTRY_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">R.B.s</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="RBs"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">l.f.t</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="lft"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">creatinine</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="creatinine"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="SEROLOGY">SEROLOGY</p>

                                                <div className="SEROLOGY_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">hiv I & II</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="hivIII"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">Hbs ag</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="HbsAg"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">anti hcv</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="antiHcv"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">vdrl</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="vdrl"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">tpha <sub>(if vdrl positive)</sub> </p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="tpha"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="URINE">URINE</p>

                                                <div className="URINE_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">sugar</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="sugar"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">albumin</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="albumin"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="COVID">COVID - 19</p>

                                                <div className="COVID_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">Covid PCR</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="CovidPCR"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">Covid Antibodies</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="CovidAntibodies"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="STOOL">STOOL</p>

                                                <div className="STOOL_tab options-tabs">

                                                    <h5 className="text-uppercase font-weight-bold mb-1">routine</h5>

                                                    <p className="text-uppercase font-weight-bold mb-1">helminthes</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="helminthes"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">ova</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="ova"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">cyst</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="cyst"
                                                        onChange={this.onChangehandler}
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">others</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="others"
                                                        onChange={this.onChangehandler}
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                        <div className="text-center col-12 mt-3">
                                            <button onClick={this.onLaboratorySubmittion} className="btn btn-sm btns">submit</button>
                                        </div>
                                    </div>
                                </div>


                                {/* 
                        ************************************************
                        *  LaboratoryInvestigation content end         *
                        *                                              *
                        * **********************************************
                        */}


                            </div>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default LaboratoryInvestigation;