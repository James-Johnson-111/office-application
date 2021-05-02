import react, { Component } from 'react';

import Cookies from 'js-cookie';

class Logout extends Component {

    componentDidMount()
    {

        if( Cookies.get('LognID') !== undefined || Cookies.get('LoginID') !== null )
        {

            Cookies.remove('LoginID');
            this.props.history.push('/login');

        }else
        {

            this.props.history.push('/login');

        }

    }

    render()
    {

        return(

            <>
            </>

        )

    }

}

export default Logout;