import React, { Component } from 'react';

import './CandidateForm.css';
import axios from '../../../../axios-instance';
import Modal from '../../../UI/Modal/Modal';
import Cookies from 'js-cookie';
import Webcam from 'react-webcam';
import $ from 'jquery';
import Loading from '../../../UI/Loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cameraImg from '../../../../images/pngtree-camera-icon-vector-png-image_1747970.jpg';

class CandidateForm extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            candidateInfo: {
                candidate_id: null,
                candidate_name: null,
                candidate_age: null,
                candidate_nationality: null,
                candidate_gender: null,
                candidate_marital_status: null,
                candidate_profession: null,
                candidate_passport: null,
                place_of_issue: null,
                travelling_to: null
            },
            Insertor: null,
            Editor: null,
            showModal: false,
            ShowCamera: false,
            candidateImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
            image: null,
            imageName: null,
            loading: true,
            tokens: null,
            filled: false,
            camera: false
        }

    }

    componentDidMount()
    {

        navigator.getUserMedia( { video: true }, () => { this.setState( { camera: true } ); }, () => { this.setState( { camera: false } ); } );
        const formsData = new FormData();
        formsData.append('counter', Cookies.get('LoginID'));
        axios.post('/getalltokens', formsData).then( response => {

            if( response.data.length !== 0 )
            {

                this.setState({ tokens: [response.data] });

                Cookies.set('tokenNo', this.state.tokens[0].token);
                const forsmData = new FormData();
                forsmData.append('token', this.state.tokens[0].token);
                axios.post('/getcurrentcandidate', forsmData).then(response => {


                    if (response.data.length === 0) {

                        this.props.filledData([{ token_no: this.state.tokens[0].token !== undefined ? this.state.tokens[0].token : 'Not Found', candidate_name: 'Not Found' }]);
                        this.setState( { filled: false } );

                    } else {

                        this.props.filledData(response.data);
                        this.setState({ candidateInfo: response.data[0], candidateImg: "images/candidates/" + response.data[0].candidate_image, filled: true });

                        this.setState({ image: response.data[0].candidate_image, imageName: this.state.candidateImg, filled: true });

                    }

                }).catch(error => {

                })

            }

        } ).catch( err => {

            console.log( err );

        } );

        if( Cookies.get( 'LoginID' ) !== null )
        {

            this.setState( { Editor: Cookies.get( 'LoginID' ), Insertor: Cookies.get( 'LoginID' ), candidateInfo: this.props.filledData } );

        }

        this.setState( { loading: false } );

    }

    nextCandidate = () => {
        const formsData = new FormData();
        formsData.append('counter', Cookies.get('LoginID'));
        axios.post('/getalltokens', formsData).then( response => {

            if( response.data.length !== 0 )
            {

                this.setState({ tokens: [response.data] });
                Cookies.set('tokenNo', this.state.tokens[0].token);

                const forsmData = new FormData();
                forsmData.append('token', this.state.tokens[0].token);
                axios.post('/getcurrentcandidate', forsmData).then(response => {

                    if (response.data.length === 0) {

                        this.props.filledData([{ token_no: this.state.tokens[0].token !== undefined ? this.state.tokens[0].token : 'Not Found', candidate_name: 'Not Found' }]);
                        this.setState( { filled: false } );

                    } else {

                        this.props.filledData(response.data);
                        this.setState({ candidateInfo: response.data[0], candidateImg: "images/candidates/" + response.data[0].candidate_image, filled: true });

                        this.setState({ image: response.data[0].candidate_image, imageName: this.state.candidateImg, filled: true });

                    }

                }).catch(error => {

                })

            }

        } ).catch( err => {

            console.log( err );

        } );
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

        let Name = this.state.candidateInfo.candidate_name;
        let subName = Name.substring(0,3);

        let Profession = this.state.candidateInfo.candidate_profession;
        let subProfession = Profession.substring(0,4);

        let Passport = this.state.candidateInfo.candidate_passport;
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

        if ( this.state.image === null )
        {
            this.props.error("Please Take The Candidate Photo");
            return false;
        }
        
        this.setState({ loading: true });

        const FormsData = new FormData();

        FormsData.append('id', this.state.candidateInfo.candidate_id);
        FormsData.append('Name', this.state.candidateInfo.candidate_name);
        FormsData.append('Age', this.state.candidateInfo.candidate_age);
        FormsData.append('Nationality', this.state.candidateInfo.candidate_nationality);
        FormsData.append('Gander', this.state.candidateInfo.candidate_gender);
        FormsData.append('MStatus', this.state.candidateInfo.candidate_marital_status);
        FormsData.append('Profession', this.state.candidateInfo.candidate_profession);
        FormsData.append('Passport', this.state.candidateInfo.candidate_passport);
        FormsData.append('Insertor', this.state.Insertor);
        FormsData.append('Editor', this.state.Editor);
        FormsData.append('Image', this.state.image);
        FormsData.append('ImageNotImg', this.state.image);
        FormsData.append('ImageName', this.state.imageName);
        FormsData.append('placeofissue', this.state.candidateInfo.place_of_issue);
        FormsData.append('travellingto', this.state.candidateInfo.travelling_to);
        FormsData.append('token', this.state.tokens[0].token);
        FormsData.append('filled', this.state.filled ? 'filled' : 'notfilled' );

        axios.post('/setcandidate', FormsData, {

            headers: { 'content-type': 'multipart/form-data' }

        }).then(response => {
            
            const setValues = {

                ...this.state.candidateInfo,
                candidate_id: null,
                candidate_name: null,
                candidate_age: null,
                candidate_nationality: null,
                candidate_gender: null,
                candidate_marital_status: null,
                candidate_profession: null,
                candidate_passport: null,
                place_of_issue: null,
                travelling_to: null
    
            }
            this.setState( { candidateInfo: setValues } );
            
            $('input').val('');
            $('img.user_img').attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU');

            this.setState({ loading: false });
            this.props.error(response.data);

            this.props.filledData([{ token_no: 'Call The Next One', candidate_name: 'Call The Next One' }]);

        }).catch( err => {

            this.setState({ loading: false });
            this.props.error("Network Error 500");
            
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

        let Name = this.state.candidateInfo.candidate_name;
        let subName = Name.substring(0,2);

        let Profession = this.state.candidateInfo.candidate_profession;
        let subProfession = Profession.substring(0,3);

        let Passport = this.state.candidateInfo.candidate_passport;
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
                    {this.state.candidateInfo.candidate_name != null && this.state.candidateInfo.candidate_profession != null && this.state.candidateInfo.candidate_passport != null ?
                        <>
                            <div className="container-fluid">
                                <p className="text-center"><small><b>SELECT THE WAY YOU WANT TO UPLOAD IMAGE</b></small></p>
                                <div className="row">
                                    {/* <div className="col-6">
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
                                    </div> */}
                                    <div className="col-12 text-center">
                                        <img alt="camera" className="rounded w-50 mx-auto" style={{ 'cursor': 'pointer' }} onClick={this.cameraModalCall} src={cameraImg} width="100%" />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <h3 className="text-center">Please fill the form first.</h3>
                    }
                </Modal>
                <div className="CandidateForm" style={ { 'position' : this.props.position, 'top' : this.props.position === 'absolute' ? 'calc( 50vh - 60vh )' : null, 'left' : this.props.position === 'absolute' ? 'calc( 35% - 30% )' : null } }>

                    <form onSubmit={ this.CandidateDataEntry }>
                        
                    <div className="user_img text-center w-100 mb-4">
                            <img
                                alt="Candidate img"
                                src={this.state.candidateImg}
                                width="120"
                                height="120"
                                className="rounded-circle user_img"
                                onClick={this.modalCall}
                                style={{ 'cursor': 'pointer' }}
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
                                pattern="[a-zA-Z][a-zA-Z\s]*"
                                title="Name only contains letters"
                                minLength="3"
                                name="candidate_name"
                                value={this.state.candidateInfo.candidate_name}
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
                                pattern="^[0-9]+$"
                                title="Age only contains numbers"
                                name="candidate_age"
                                value={this.state.candidateInfo.candidate_age}
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
                                pattern="[a-zA-Z][a-zA-Z\s]*"
                                title="Nationality only contains letters"
                                minLength="2"
                                name="candidate_nationality"
                                value={this.state.candidateInfo.candidate_nationality}
                            />
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="d-grid mr-2">
                                <i className="las la-mercury"></i>
                            </div>
                            <select name="candidate_gender" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler}
                                required>
                                <option >Candidate Gender</option>
                                <option selected={this.state.candidateInfo.candidate_gender === 'Male' ? true : false}>Male</option>
                                <option selected={this.state.candidateInfo.candidate_gender === 'FeMale' ? true : false}>FeMale</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <div className="d-grid mr-2">
                                <i className="las la-ring"></i>
                            </div>
                            <select name="candidate_marital_status" className="form-control form-control-sm rounded-0" onChange={this.onChangeHandler}
                                required>
                                <option>Marital Status</option>
                                <option selected={this.state.candidateInfo.candidate_marital_status === 'Married' ? true : false} >Married</option>
                                <option selected={this.state.candidateInfo.candidate_marital_status === 'Single' ? true : false}>Single</option>
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
                                name="candidate_profession"
                                required
                                pattern="[a-zA-Z][a-zA-Z\s]*"
                                title="Profession only contains letters"
                                minLength="3"
                                value={this.state.candidateInfo.candidate_profession}
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
                                pattern="^[0-9]+$"
                                title="Passport only contains numbers"
                                minLength="3"
                                name="candidate_passport"
                                value={this.state.candidateInfo.candidate_passport}
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
                                pattern="[a-zA-Z][a-zA-Z\s]*"
                                title="Place of Issue only contains letters"
                                minLength="3"
                                name="place_of_issue"
                                value={this.state.candidateInfo.place_of_issue}
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
                                name="travelling_to"
                                required
                                pattern="[a-zA-Z][a-zA-Z\s]*"
                                title="Place of Issue only contains letters"
                                minLength="3"
                                value={this.state.candidateInfo.travelling_to}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-sm w-50">Submit</button>
                        </div>
                        
                    </form>

                </div>
                <ToastContainer autoClose={3000} />
            </>

        );

    }

}

export default CandidateForm;