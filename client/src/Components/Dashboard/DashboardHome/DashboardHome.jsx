import Cookies from 'js-cookie';
import react, { Component } from 'react';

import './DashboardHome.css';

class DashboardHome extends Component {

    constructor( props )
    {

        super( props );

    }

    componentDidMount()
    {

    }

    render()
    {

        return(
                <div className="DashboardHome d-grid w-100 vh-100">
                    <div className='DashboardHome-inner d-flex justify-content-center'>
                        <h1 className="font-weight-bold text-center">Welcome To Dashboard <br/> <span style={ { 'fontFamily': 'OpenSans' } }>{ Cookies.get('LoginID') }</span> </h1>
                    </div>
                </div>

        );

    }

}

export default DashboardHome;