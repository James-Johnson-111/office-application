import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './404Error.css';
// import errImg from 'https://image.freepik.com/free-vector/error-404-concept-landing-page_52683-13616.jpg';

class Error extends Component {

    render()
    {

        return(

            <div className='Error d-grid w-100 vh-100'>
                <div className="Error-inner d-flex justify-content-center">
                    <div className="text-center">
                        <h1 className="text-uppercase">WE ARE SORRY, PAGE NOT FOUND</h1>
                        <h4>
                            THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME <br/>
                            CHANGED OR ITS TEMPORARLY UNAVAILABLE
                        </h4>
                        <Link to='/'>
                            <button className='btn btns mt-4'>Go To Home</button>
                        </Link>
                    </div>
                </div>
            </div>

        );

    }

}

export default Error;