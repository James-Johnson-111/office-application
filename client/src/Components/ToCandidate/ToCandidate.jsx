import React, { Component } from 'react';
import Webcam from 'react-webcam';

import Loading from '../UI/Loading/Loading';
import Modal from '../UI/Modal/Modal';
import './ToCandidate.css';
import cameraImg from '../../images/pngtree-camera-icon-vector-png-image_1747970.jpg';
import axios from '../../axios-instance';
import $ from 'jquery';

class ToCandidate extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            candidateInfo: {
                Name: null,
                Age: null,
                Nationality: null,
                Gander: null,
                MStatus: null,
                Profession: null,
                Passport: null,
                PlaceOfIssue: null,
                TrevellingTo: null
            },
            showModal: false,
            ShowCamera: false,
            candidateImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
            image: null,
            imageName: null,
            loading: true,
            camera: false,
            token: null
        }

    }

    componentDidMount()
    {

        navigator.getUserMedia( { video: true }, () => { this.setState( { camera: true } ); }, () => { this.setState( { camera: false } ); } );

        let URL = window.location.href.split('/').pop();
        let getOriginalToken = URL.substring(6, 10);
        const formsData = new FormData();
        formsData.append('token', getOriginalToken);

        axios.post( '/gettoken', formsData ).then( response => {

            if( response.data.length === 0 )
            {
                this.props.history.push('/error');
            }else
            {
                this.setState( { token: response.data[0].token } );
            }

        } ) 

        this.setState( { loading: false } );

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
        this.setState( { candidateImg: screenshot } );
        this.setState( { ShowCamera: false } );

        let block = screenshot.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = this.b64toBlob(realData, contentType);

        // this.onImageUpload( blob );

        let Name = this.state.candidateInfo.Name;
        let subName = Name.substring(0,2);

        let Profession = this.state.candidateInfo.Profession;
        let subProfession = Profession.substring(0,3);

        let Passport = this.state.candidateInfo.Passport;
        let subPassport = Passport.substring(0,4);

        let ImageCurrentName = subName + subProfession + subPassport;

        this.setState( { image: blob, imageName: ImageCurrentName } );

    }

    onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = {

            ...this.state.candidateInfo,
            [name]: value

        }
        this.setState( { candidateInfo: setValues } );

    }

    CandidateDataEntry = ( event ) => {

        event.preventDefault();
        
        this.setState({ loading: true });

        const FormsData = new FormData();

        FormsData.append('Name', this.state.candidateInfo.Name);
        FormsData.append('Age', this.state.candidateInfo.Age);
        FormsData.append('Nationality', this.state.candidateInfo.Nationality);
        FormsData.append('Gander', this.state.candidateInfo.Gander);
        FormsData.append('MStatus', this.state.candidateInfo.MStatus);
        FormsData.append('Profession', this.state.candidateInfo.Profession);
        FormsData.append('Passport', this.state.candidateInfo.Passport);
        FormsData.append('Image', this.state.image);
        FormsData.append('ImageName', this.state.imageName);
        FormsData.append('placeofissue', this.state.candidateInfo.PlaceOfIssue);
        FormsData.append('travellingto', this.state.candidateInfo.TrevellingTo);
        FormsData.append('token', this.state.token);

        axios.post('/databycandidate', FormsData, {

            headers: { 'content-type': 'multipart/form-data' }

        }).then(response => {

            this.setState({ loading: false });
            alert("Data inserted successfully, Thank you");
            $('.ToCandidate-content').html( "<h6 className='text-center'>Thank you for filling the form</h6>" );

        }).catch( err => {

            this.setState({ loading: false });
            
        } )

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

                this.setState( { candidateImg: reader.result } );

            }

        }

        reader.readAsDataURL( event.target.files[0] );

        let Name = this.state.candidateInfo.Name;
        let subName = Name.substring(0,2);

        let Profession = this.state.candidateInfo.Profession;
        let subProfession = Profession.substring(0,3);

        let Passport = this.state.candidateInfo.Passport;
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
                <Modal show={this.state.ShowCamera} close={this.cameraModalCall}>
                    {
                        this.state.camera ?
                            <>
                                <Webcam
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    width='100%'
                                    ref='webcam'
                                    videoConstraints={videoConstraints}
                                />
                                <button className="btn btn-sm btn-block mt-3" onClick={this.takePhoto}>Click</button>
                            </>
                            :
                            <h1 className="text-center">Camera Not Found</h1>
                    }
                </Modal>
                <Modal show={this.state.showModal} close={this.modalCall}>
                    {(this.state.candidateInfo.Name != null) && (this.state.candidateInfo.Profession != null) && this.state.candidateInfo.Passport != null ?
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
                                        <img alt="camera" className="rounded" style={{ 'cursor': 'pointer' }} onClick={this.cameraModalCall} src={cameraImg} width="100%" />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <h3 className="text-center">Please fill the form first.</h3>
                    }
                </Modal>
                <div className="w-100 d-grid ToCandidate">
                    <div className="d-flex justify-content-center ToCandidate-inner">
                        <div className="ToCandidate-content" id="ToCandidate-content">
                            <div className="user_img text-center w-100 mb-4">
                                <img
                                    src={this.state.candidateImg}
                                    width="120"
                                    height="120"
                                    className="rounded-circle user_img"
                                    onClick={this.modalCall}
                                    style={{ 'cursor': 'pointer' }}
                                    alt="candidate img"
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-signature"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Candidate Name"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Name"
                                    defaultValue={this.state.candidateInfo.Name}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="lab la-draft2digital"></i>
                                </div>
                                <input
                                    type="number"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Candidate Age"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Age"
                                    defaultValue={this.state.candidateInfo.Age}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-globe-europe"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Candidate Nationality"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Nationality"
                                    defaultValue={this.state.candidateInfo.Nationality}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-mercury"></i>
                                </div>
                                <select name="Gander" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler}
                                    required>
                                    <option >Candidate Gender</option>
                                    <option>Male</option>
                                    <option>FeMale</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-ring"></i>
                                </div>
                                <select name="MStatus" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler}
                                    required>
                                    <option>Marital Status</option>
                                    <option>Married</option>
                                    <option>UnMarried</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-hand-holding-usd"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Candidate Profession"
                                    onChange={this.onChangeHandler}
                                    name="Profession"
                                    defaultValue={this.state.candidateInfo.Profession}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-id-card"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Candidate Passport NO."
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Passport"
                                    defaultValue={this.state.candidateInfo.Passport}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-map-marker"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Place Of Issue"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="PlaceOfIssue"
                                    defaultValue={this.state.candidateInfo.PlaceOfIssue}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <div className="d-grid mr-2">
                                    <i className="las la-plane-departure"></i>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-sm rounded-0"
                                    placeholder="Trevelling To"
                                    onChange={this.onChangeHandler}
                                    name="TrevellingTo"
                                    defaultValue={this.state.candidateInfo.TrevellingTo}
                                />
                            </div>
                            <div className="text-center">
                                <button onClick={this.CandidateDataEntry} className="btn btn-sm w-50">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );

    }

}

export default ToCandidate;