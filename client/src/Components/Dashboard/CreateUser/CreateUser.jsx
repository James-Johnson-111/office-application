import react, { Component } from 'react';

import './CreateUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axios-instance';
import * as passwordHash from 'password-hash';

class CreateUser extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            userInfo: {
                loginID: null,
                loginPass: null,
                params: null
            }
        }

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

        event.preventDefault();

        let loginID = this.state.userInfo.loginID;
        let log = loginID.toLowerCase();
        
        if(log == 'admin')
        {
            toast.dark("Admin Already Exists", {
                position: 'bottom-right',
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
    
               this.props.history.replace('/login');
    
            } ).catch( error => {
    
                console.log( error );
    
            } );

        }

    }

    render()
    {

        return(

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
                                onChange={this.onChangeHandler}
                            />
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="User Password"
                                name="loginPass"
                                onChange={this.onChangeHandler}
                            />
                            <select name="params" className="form-control form-control-sm rounded-0 mb-3" onChange={this.onChangeHandler}>
                                <option value="">Authority</option>
                                <option value="Default">Default</option>
                                <option value="C2">C2</option>
                                <option value="C3">C3</option>
                                <option value="C4">C4</option>
                            </select>
                            <div className="text-center">
                                <button type="submit" className="btn btn-sm px-5 btns">Create</button>
                                <ToastContainer autoClose={3000}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}

export default CreateUser;