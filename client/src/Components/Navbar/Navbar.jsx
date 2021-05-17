import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {

    constructor( props )
    {

        super( props );
        // this.state

    }

    render()
    {

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Cart</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }
}

export default Navbar;