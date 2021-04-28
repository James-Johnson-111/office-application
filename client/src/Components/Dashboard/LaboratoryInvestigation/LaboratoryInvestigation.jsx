import react, { Component } from 'react';

import './LaboratoryInvestigation.css';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';

class LaboratoryInvestigation extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            loading: true

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
                                                name="something"
                                            />
                                            <p className="text-uppercase font-weight-bold mb-1">hemoglobin</p>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm rounded-0 mb-3"
                                                name="something"
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

                                                        <select name="" className="form-control form-control-sm rounded-0">
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input type="date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        MMR 1
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select name="" className="form-control form-control-sm rounded-0">
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input type="date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        MMR2
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select name="" className="form-control form-control-sm rounded-0">
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input type="date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        Meningococcal
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select name="" className="form-control form-control-sm rounded-0">
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input type="date" className="form-control rounded-0 form-control-sm" />

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 d-grid mb-3">
                                                        Covid
                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <select name="" className="form-control form-control-sm rounded-0">
                                                            <option value="yes">yes</option>
                                                            <option value="no">no</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-lg-4 col-md-12 col-sm-12 text-center d-grid mb-3">

                                                        <input type="date" className="form-control rounded-0 form-control-sm" />

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
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">micro filaria</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="BIOCHEMISTRY">BIOCHEMISTRY</p>

                                                <div className="BIOCHEMISTRY_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">R.B.s</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">l.f.t</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">creatinine</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="SEROLOGY">SEROLOGY</p>

                                                <div className="SEROLOGY_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">hiv I & II</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">Hbs ag</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">anti hcv</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">vdrl</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">tpha <sub>(if vdrl positive)</sub> </p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="URINE">URINE</p>

                                                <div className="URINE_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">sugar</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">albumin</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="COVID">COVID - 19</p>

                                                <div className="COVID_tab options-tabs">

                                                    <p className="text-uppercase font-weight-bold mb-1">Covid PCR</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">Covid Antibodies</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                                <p className="border-bottom tab-btns text-uppercase font-weight-bold" id="STOOL">STOOL</p>

                                                <div className="STOOL_tab options-tabs">

                                                    <h5 className="text-uppercase font-weight-bold mb-1">routine</h5>

                                                    <p className="text-uppercase font-weight-bold mb-1">helminthes</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">ova</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">cyst</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />
                                                    <p className="text-uppercase font-weight-bold mb-1">others</p>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm rounded-0 mb-3"
                                                        name="something"
                                                    />

                                                </div>

                                            </div>

                                        </div>
                                        <div className="text-center col-12 mt-3">
                                            <button className="btn btn-sm btns">submit</button>
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