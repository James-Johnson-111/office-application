import react, { Component } from 'react';

import './Loading.css';
import Loader from '../../../images/827.gif';

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
                    <div className="loading-content">
                        <form onSubmit={this.userLogin}>
                            <h3 className="mb-3 font-weight-bold">Please Wait</h3>
                            <img src={Loader} width="50" />
                        </form>
                    </div>
                </div>
            </div>

        );

    }

};

export default Loading;