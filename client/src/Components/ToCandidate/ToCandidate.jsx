import react, { Component } from 'react';

import CandidateForm from '../Dashboard/CandidateInfo/CandidateForm/CandidateForm';
import './ToCandidate.css';

class ToCandidate extends Component {

    constructor( props )
    {

        super( props );

    }

    render()
    {

        return(

            <>
                <div className="w-100 d-grid ToCandidate">
                    <div className="d-flex justify-content-center my-5">
                        <CandidateForm position="unset" />
                    </div>
                </div>
            </>

        );

    }

}

export default ToCandidate;