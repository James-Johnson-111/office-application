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
                <BackDark close={this.props.close} show={this.props.show} />
                <div className="Modal" style={ { 'transform' : this.props.show ? 'rotate(0) scale(1)' : 'rotate(180deg) scale(0)', 'top' : this.props.top } }>
                    {this.props.children}
                </div>
            </>

        );

    }

};

export default Modal;