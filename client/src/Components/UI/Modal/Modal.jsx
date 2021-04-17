import react, { Component } from 'react';
import BackDark from './BackDark/BackDark';

import './Modal.css';

class Modal extends Component {

    constructor( props )
    {

        super( props );

    }
    
    // componentDidMount()
    // {
    //     let modalHeight = null;
    //     let halfheight = null;

    //     setInterval( function() {

    //         modalHeight = $('.Modal').outerHeight();
    //         halfheight = modalHeight / 2;

    //     }, 1000 );

    //     $('.Modal').attr( 'className', 'top: calc(50vh - ' + halfheight + ')');

    // }

    render()
    {

        return(

            <>
                <BackDark close={this.props.close} show={this.props.show} />
                <div className="Modal" style={ { 'transform' : this.props.show ? 'rotate(0) scale(1)' : 'rotate(180deg) scale(0)', } }>
                    {this.props.children}
                </div>
            </>

        );

    }

};

export default Modal;