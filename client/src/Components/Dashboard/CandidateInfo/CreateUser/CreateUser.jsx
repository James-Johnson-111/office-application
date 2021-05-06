import react, { Component } from 'react';

import './CreateUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from '../../../axios-instance';
import axios from '../../../../axios-instance';
import * as passwordHash from 'password-hash';
import Loading from '../../../UI/Loading/Loading';
import $ from 'jquery';
import Cookies from 'js-cookie';
import Webcam from 'react-webcam';
import Modal from '../../../UI/Modal/Modal';
import cameraImg from '../../../../images/pngtree-camera-icon-vector-png-image_1747970.jpg';

class CreateUser extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            userInfo: {
                loginID: null,
                loginPass: null,
                params: null,
                roles: null
            },
            userImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
            loading: true,
            image: null,
            imageName: null,
            showModal: false,
            ShowCamera: false
        }

    }

    componentDidMount()
    {

        if( Cookies.get('LoginID') === undefined )
        {

            this.props.history.push('/login');

        }else if( Cookies.get('LoginID') !== "Admin" )
        {

            this.props.history.push('/');

        }

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

        let loginRole = this.state.userInfo.roles;
        let role = loginRole.toLowerCase();
        
        if(role == 'admin')
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
            const FormsData = new FormData();
            FormsData.append( 'LoginID', this.state.userInfo.loginID );
            FormsData.append( 'Password', HashPass );
            FormsData.append( 'Params', this.state.userInfo.params );
            FormsData.append( 'Role', this.state.userInfo.roles );
            FormsData.append('Image', this.state.image);
            FormsData.append('ImageName', this.state.imageName);
    
            axios.post( '/createuser', FormsData, {

                headers: { 'content-type': 'multipart/form-data' }
    
            } ).then( response => {

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

    b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
    
        var byteCharacters = atob(b64Data); // window.atob(b64Data)
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
    
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            var byteArray = new Uint8Array(byteNumbers);
    
            byteArrays.push(byteArray);
        }
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    takePhoto = () => {

        var screenshot = this.refs.webcam.getScreenshot();
        this.setState( { userImg: screenshot } );
        this.setState( { ShowCamera: false } );

        let block = screenshot.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = this.b64toBlob(realData, contentType);

        // this.onImageUpload( blob );

        let Name = this.state.userInfo.loginID;
        let subName = Name.substring(0,2);

        let Profession = this.state.userInfo.params;
        let subProfession = Profession.substring(0,3);

        let Passport = this.state.userInfo.roles;
        let subPassport = Passport.substring(0,4);

        let ImageCurrentName = subName + subProfession + subPassport;

        this.setState( { image: blob, imageName: ImageCurrentName } );

    }

    modalCall = ( event ) => {

        event.preventDefault();
        if(this.state.showModal)
        {
            this.setState( { showModal: false } );
        }else
        {
            this.setState( { showModal: true } );
        }

    }

    cameraModalCall = ( event ) => {

        event.preventDefault();

        this.setState( { showModal: false } );

        if(this.state.ShowCamera)
        {

            this.setState( { ShowCamera: false } );

        }else
        {

            this.setState( { ShowCamera: true } );

        }

    }

    onImageUpload = ( event ) => {

        const reader = new FileReader();
        reader.onload = () => {

            if( reader.readyState === 2 )
            {

                this.setState( { userImg: reader.result } );

            }

        }

        reader.readAsDataURL( event.target.files[0] );

        let Name = this.state.userInfo.loginID;
        let subName = Name.substring(0,2);

        let Profession = this.state.userInfo.params;
        let subProfession = Profession.substring(0,3);

        let Passport = this.state.userInfo.roles;
        let subPassport = Passport.substring(0,4);

        let ImageCurrentName = subName + subProfession + subPassport;


        this.setState( { image: event.target.files[0] } );
        this.setState( { imageName: ImageCurrentName } );
        this.setState( { showModal: false } );

    }

    render()
    {

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        }

        return(

            <>
                <Loading show={this.state.loading} />
                <Modal show={this.state.ShowCamera} close={this.cameraModalCall} top={this.state.modalHeight}>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        width='100%'
                        ref='webcam'
                        videoConstraints={videoConstraints}
                    />
                    <button className="btn btn-sm btn-block mt-3" onClick={this.takePhoto}>Click</button>
                </Modal>
                <Modal show={this.state.showModal} close={this.modalCall} top={this.state.modalHeight}>
                    {(this.state.userInfo.loginID) && (this.state.userInfo.params != null) && this.state.userInfo.roles != null ?
                        <>
                            <div className="container-fluid">
                                <p className="text-center"><small><b>SELECT THE WAY YOU WANT TO UPLOAD IMAGE</b></small></p>
                                <div className="row">
                                    <div className="col-6">
                                        <input
                                            type="file"
                                            className="form-control form-control-sm d-none"
                                            onChange={this.onImageUpload}
                                            name="userImage"
                                            required
                                            ref={fileInput => this.fileInput = fileInput}
                                        />
                                        <div className="btn-group w-100 uploadFile d-grid" onClick={() => this.fileInput.click()}>
                                            <div className="d-flex justify-content-center">
                                                <i className="las la-plus la-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <img className="rounded" style={{ 'cursor': 'pointer' }} onClick={this.cameraModalCall} src={cameraImg} width="100%" />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <h3 className="text-center">Please fill the form first.</h3>
                    }
                </Modal>
                <div className="container-fluid pt-4 CreateUser-container">
                    <div className="container-fluid">
                        <div className="row border-bottom">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Create New User</a>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                {/* Empty */}
                            </div>
                        </div>
                    </div>
                    <div className="createuser_back">
                        <div className="CreateUser">
                            <form onSubmit={this.userCreation} encType="multipart/form-data">
                                <div className="user_img text-center w-100 mb-4">
                                    <img
                                        src={this.state.userImg}
                                        width="120"
                                        height="120"
                                        className="rounded-circle user_img"
                                        onClick={this.modalCall}
                                        style={{ 'cursor': 'pointer' }}
                                    />
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="d-grid mr-2">
                                        <i className="las la-sign-in-alt"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm rounded-0"
                                        placeholder="User Login ID"
                                        name="loginID"
                                        onChange={this.onChangeHandler} required
                                    />
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="d-grid mr-2">
                                        <i className="las la-key"></i>
                                    </div>
                                    <div className="input-group">
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
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="d-grid mr-2">
                                        <i className="las la-magic"></i>
                                    </div>
                                    <select name="params" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler} required>
                                        <option value="">Authority</option>
                                        <option value="Default">Default</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                    </select>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="d-grid mr-2">
                                        <i className="las la-user-tag"></i>
                                    </div>
                                    <select name="roles" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler} required>
                                        <option value="">User Role</option>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-sm px-5">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />
            </>

        );

    }

}

export default CreateUser;