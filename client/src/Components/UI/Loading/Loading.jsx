import react, { Component } from 'react';

import './Loading.css';
import Loader from '../../../images/1488.gif';

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
                style={ { 'display' : this.props.show ? 'grid' : 'none' } }
                >
                <div className="loading-inner d-flex justify-content-center">
                    <div className="text-center">
                        <img src={Loader} width="70" />
                        <p>labofficial.com</p>
                    </div>
                </div>
            </div>

        );

    }

};

export default Loading;