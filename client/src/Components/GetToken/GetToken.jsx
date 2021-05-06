import react, { Component, useRef } from 'react';

import './GetToken.css';
import * as passwordHash from 'password-hash';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../UI/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PasswordHash from 'password-hash';
import QRcode from 'qrcode';
import print from 'print-js'

class GetToken extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            getTokenContent: null,
            initialNumber: 0,
            loading: true
        }

    }

    componentDidMount()
    {

        let content = <> <form onSubmit={this.getToken}>
                <h3 className="mb-3 font-weight-bold text-uppercase text-center">press button & get your token</h3>
                <div className="text-center">
                    <button type="submit" className="btn btn-sm w-50">Get Token</button>
                </div>
            </form> 
        </>
        this.setState( { loading: false, getTokenContent: content } );

    }

    getToken = ( event ) => {

        event.preventDefault();
        let initialNumber = this.state.initialNumber;
        let addition = initialNumber + 1;
        this.setState( { initialNumber: addition } );
        let token = addition.toString();
        let getLenth = token.length;
        let tokenTXT = null;
        if( getLenth == 1 )
        {
            tokenTXT = '000' + token;
        }

        if( getLenth == 2 )
        {
            tokenTXT = '00' + token;
        }

        if( getLenth == 3 )
        {
            tokenTXT = '0' + token;
        }

        if( getLenth == 4 )
        {
            tokenTXT = token;
        }
        let hashedTokenNo = PasswordHash.generate(tokenTXT);
        let Url = 'localhost:3000/#/welcomecandidate/' + hashedTokenNo;
        QRcode.toDataURL(Url).then( response => {
            
            var fullTime = null;

            const date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var fullTimes = hours + ':' + minutes + ' ' + ampm;
            fullTime = fullTimes.toString();

            let content = null;
            content = <>
                {/* <Token response={response} tokenTXT={tokenTXT} fullTime={fullTime} /> */}
                <div className="container-fluid" id="tokenContent">
                    <div className="row">
                        <div className="col-6">
                            <img src={response} width="100%" />
                        </div>
                        <div className="col-6 text-center d-grid">
                            <div>
                                <h5 className="text-uppercase font-weight-bold">Labofficial</h5>
                                <h4 className="text-uppercase font-weight-bold" style={{ 'fontFamily': 'Exo', 'fontSize': '40px' }}>{tokenTXT}</h4>
                                <h6 className="text-uppercase font-weight-bold" style={{ 'fontFamily': 'Exo' }}> {fullTime} </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            this.setState({ getTokenContent: content });

            setTimeout( () => {

                // var backup = document.body.innerHTML;
                // var Pcontent = document.getElementById('tokenContent').innerHTML;
                // document.body.innerHTML = Pcontent;
                // var newow = document.body.style.width;
                // var newoh = document.body.style.height;
                // document.body.style.width="2cm";
                // document.body.style.height="1cm";
                window.print();
                // document.body.style.width = newow;
                // document.body.style.height = newoh;
                // document.body.innerHTML = backup;
                // print(
                //     {
                //         printable: 'tokenContent',
                //         type: 'html',
                //         targetStyles: ['*'],
                //         header: 'PrintJS - Print Form With Customized Header'
                //     }
                // )

            }, 1000 )
            setTimeout(() => {

                content = <>
                    <form onSubmit={this.getToken}>
                        <h3 className="mb-3 font-weight-bold text-uppercase text-center">press button & get your token</h3>
                        <div className="text-center">
                            <button type="submit" className="btn btn-sm w-50">Get Token</button>
                        </div>
                    </form>
                </>

                this.setState({ getTokenContent: content });
            }, 30000)
            
        } )

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="GetToken d-grid" id="tokenPage">
                    <div className="GetToken-inner d-flex justify-content-center" id="frame">
                        <div className="GetToken-content" id="content">
                            {this.state.getTokenContent}
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />
            </>

        );

    }

}

// const Example = () => {
//     const componentRef = useRef();
//     const HandlePrint = useReactToPrint(
//         {
//             content: () => componentRef.current
//         }
//     )

//     return (
//         <>
            
//         </>
//     )
// }

export default GetToken;