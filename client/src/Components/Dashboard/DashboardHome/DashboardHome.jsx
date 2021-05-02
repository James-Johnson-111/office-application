import Cookies from 'js-cookie';
import react, { Component } from 'react';

import './DashboardHome.css';
import Loading from '../../UI/Loading/Loading';

class DashboardHome extends Component {

    constructor( props )
    {

        super( props );
        this.state = {

            loading: true

        }

    }

    componentDidMount()
    {

        this.setState( { loading: false } );

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="DashboardHome d-grid w-100 vh-100">
                    <div className='DashboardHome-inner d-flex justify-content-center'>
                        <h1 className="font-weight-bold text-center">Welcome To Dashboard <br/> <span>{ Cookies.get('LoginID') }</span> </h1>
                    </div>
                </div>
            </>

        );

    }

}

export default DashboardHome;