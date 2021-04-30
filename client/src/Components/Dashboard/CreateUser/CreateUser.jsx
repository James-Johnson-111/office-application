import react, { Component } from 'react';

import './CreateUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from '../../../axios-instance';
import axios from 'axios';
import * as passwordHash from 'password-hash';
import Loading from '../../UI/Loading/Loading';
import $ from 'jquery';

class CreateUser extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            userInfo: {
                loginID: null,
                loginPass: null,
                params: null
            },
            loading: true
        }

    }

    componentDidMount()
    {

        this.setState( { loading: false } );
        $('.eye-btn').on( 'click', () => {

            if( $('input.password').attr('type') == 'text' )
            {

                $('input.password').attr('type', 'password');

            }else
            {

                $('input.password').attr('type', 'text');

            }

        } );

        $('input').on( 'change', () => {

            if( $(this).length < 3 )
            {

                setTimeout( () => {

                    toast.dark("Login ID must be greateor than 3 characters", {
                        position: 'bottom-right',
                        progressClassName: 'success-progress-bar',
                        autoClose: 3000,
                    });
    
                }, 500 );

            }

        } );

    }

    onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = {

            ...this.state.userInfo,
            [name]: value

        }
        this.setState( { userInfo: setValues } );

    }

    userCreation = ( event ) => {
        
        this.setState( { loading: true } );
        event.preventDefault();

        let loginID = this.state.userInfo.loginID;
        let log = loginID.toLowerCase();
        
        if(log == 'admin')
        {

            this.setState( { loading: false } );

            toast.dark("Admin Already Exists", {
                position: 'top-center',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });
        }
        else
        {

            let HashPass = passwordHash.generate(this.state.userInfo.loginPass);

            const Data = {
                loginID: this.state.userInfo.loginID,
                loginPass: HashPass,
                params: this.state.userInfo.params
            }
    
            axios.post( '/createuser', Data ).then( response => {

                this.setState( { loading: false } );

                toast.dark("User has been created suucessfully", {
                    position: 'bottom-right',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });
    
               setTimeout( () => {

                    this.props.history.push('/dashboard');

               }, 1000 );
    
            } ).catch( error => {

                this.setState( { loading: false } );
    
                toast.dark("Network Error 500 please check your network connection", {
                    position: 'top-center',
                    progressClassName: 'success-progress-bar',
                    autoClose: 3000,
                });
    
            } );

        }

    }

    render()
    {

        return(

            <>
                <Loading show={this.state.loading} />
                <div className="CreateUser d-grid">
                    <div className="CreateUser-inner d-flex justify-content-center">
                        <div className="CreateUser-content">
                            <form onSubmit={this.userCreation}>
                                <h3 className="mb-3">Create User</h3>
                                <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="User Login ID"
                                    name="loginID"
                                    onChange={this.onChangeHandler} required
                                />
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-sm rounded-0 password"
                                        placeholder="User Password"
                                        name="loginPass"
                                        onChange={this.onChangeHandler} required
                                    />
                                    <button type='button' className="btn btn-sm px-3 eye-btn">
                                        <i className="lar la-eye"></i>
                                    </button>
                                </div>
                                <select name="params" className="form-control form-control-sm rounded-0 mb-3" onChange={this.onChangeHandler} required>
                                    <option value="">Authority</option>
                                    <option value="Default">Default</option>
                                    <option value="C2">C2</option>
                                    <option value="C3">C3</option>
                                    <option value="C4">C4</option>
                                </select>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-sm px-5 btns">Create</button>
                                    <ToastContainer autoClose={3000} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default CreateUser;