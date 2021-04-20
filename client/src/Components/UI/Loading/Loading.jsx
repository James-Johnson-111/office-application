import react, { Component } from 'react';

import './Loading.css';
import Loader from '../../../images/1494.gif';

class Loading extends Component {

    constructor( props )
    {

        super( props );

    }

    render()
    {

        return(

            <div 
                className="loading d-grid" 
                // style={ { 'display' : this.props.show ? 'grid' : 'none' } }
                >
                <div className="loading-inner d-flex justify-content-center">
                    <img src={Loader} width="50" />
                </div>
            </div>

        );

    }

};

export default Loading;