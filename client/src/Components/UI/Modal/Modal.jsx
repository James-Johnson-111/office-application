import react, { Component } from 'react';
import BackDark from './BackDark/BackDark';
import $ from 'jquery';

import './Modal.css';

class Modal extends Component {

    constructor( props )
    {

        super( props );

    }

    render()
    {

        return(

            <>
                <div className="modal-rel d-grid" style={{ 'zIndex': this.props.show ? '999' : '0' }}>
                    <BackDark close={this.props.close} show={this.props.show} />
                    <div className="d-flex justify-content-center">
                        <div className="Modal" style={{ 'transform': this.props.show ? 'rotate(0) scale(1)' : 'rotate(180deg) scale(0)' }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>

        );

    }

};

export default Modal;