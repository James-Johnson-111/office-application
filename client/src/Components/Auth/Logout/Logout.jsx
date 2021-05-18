import React, { Component } from 'react';

import Cookies from 'js-cookie';

class Logout extends Component {

    componentDidMount()
    {

        if( Cookies.get('LognID') !== undefined || Cookies.get('LoginID') !== null )
        {

            setTimeout( () => {
                Cookies.remove('LoginID');
                this.props.history.push('/login');
            }, 300 );

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