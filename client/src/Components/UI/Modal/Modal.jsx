import React, { Component } from 'react';
import BackDark from './BackDark/BackDark';

import './Modal.css';

class Modal extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            modalRel: 'modal-rel d-grid hide-rel',
            modalCSS: 'Modal hide-modal'
        }

    }

    render()
    {

        return(

            <>
                <div className={this.props.show ? 'modal-rel d-grid show-rel' : this.state.modalRel}>
                    <BackDark close={this.props.close} show={this.props.show} />
                    <div className="d-flex justify-content-center">
                        <div className={this.props.show ? 'Modal show-modal' : this.state.modalCSS}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>

        );

    }

};

export default Modal;