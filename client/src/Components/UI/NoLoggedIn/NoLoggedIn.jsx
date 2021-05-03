import react, { Component } from 'react'
import { Link } from 'react-router-dom';

import './NoLoggedIn.css';

class NoLoggedIn extends Component {

    constructor( props )
    {

        super( props );

    }

    render()
    {

        return(

            <div className='NoLoggedIn d-grid'>
                <div className='NoLoggedIn-inner text-center d-flex justify-content-center'>
                    <div>
                        <h1 className="font-weight-bold">You are not logged in!</h1>
                        <h2>Please Login first</h2>
                        <Link to='/login'>
                            <button className="btn btns px-5 mt-3">Login</button>
                        </Link>
                    </div>
                </div>
            </div>

        );

    }

};

export default NoLoggedIn;