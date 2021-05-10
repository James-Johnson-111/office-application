import react, { Component } from 'react';

import './BackDark.css';

class BackDark extends Component {

    constructor( props )
    {

        super( props );

    }

    render()
    {

        return(

            <div 
                className="BackDark" 
                style={ { 'display' : this.props.show ? 'block' : 'none' } }
                onClick={this.props.close}
                ></div>

        );

    }

};

export default BackDark;