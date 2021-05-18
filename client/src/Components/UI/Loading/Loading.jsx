import React, { Component } from 'react';

import './Loading.css';
import Loader from '../../../images/827.gif';

class Loading extends Component {

    render()
    {

        return(

            <div 
                className="loading d-grid" 
                style={ 
                    { 
                        'display' : this.props.show ? 'grid' : 'none', 
                        'position' : this.props.position === undefined ? 'fixed' : this.props.position, 
                        // 'height' : this.props.position === undefined ? '100vh' : '100%' 
                    } 
                }
                >
                <div className="loading-inner d-flex justify-content-center">
                    <div className="loading-content">
                        <form onSubmit={this.userLogin}>
                            <h3 className="mb-3 font-weight-bold">Please Wait</h3>
                            <img alt="pre-loader" src={Loader} width="50" />
                        </form>
                    </div>
                </div>
            </div>

        );

    }

};

export default Loading;