import react, { Component } from 'react';

import './CandidateForm.css';
// import axios from '../../../axios-instance';
import axios from 'axios';
import Modal from '../../UI/Modal/Modal';
import Cookies from 'js-cookie';
import Webcam from 'react-webcam';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CandidateForm extends Component {

    constructor( props )
    {

        super( props );
        this.state = {
            candidateInfo: {
                Id: null,
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
            Insertor: null,
            Editor: null,
            showModal: false,
            ShowCamera: false,
            candidateImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
            image: null,
            imageName: null,
            modalHeight: null,
            loading: true
        }

    }

    componentDidMount()
    {

        let url = window.location.href;
        let token = url.split('/').pop();
        this.setState( { tokenNO: token } );

        if( Cookies.get( 'LoginID' ) != null )
        {

            this.setState( { Editor: Cookies.get( 'LoginID' ), Insertor: Cookies.get( 'LoginID' ) } );

        }

        let modalHeight = null;
        let halfheight = null;

        modalHeight = $('.Modal').outerHeight();
        halfheight = modalHeight / 2;
        
        this.setState( { modalHeight: halfheight } );
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
        if( ( this.state.candidateInfo.Name.length > 2 ) && ( this.state.candidateInfo.Nationality.length > 2 ) && ( this.state.candidateInfo.PlaceOfIssue.length > 2 ) )
        {

            this.setState({ loading: true });

            const FormsData = new FormData();

            FormsData.append('Name', this.state.candidateInfo.Name);
            FormsData.append('Age', this.state.candidateInfo.Age);
            FormsData.append('Nationality', this.state.candidateInfo.Nationality);
            FormsData.append('Gander', this.state.candidateInfo.Gander);
            FormsData.append('MStatus', this.state.candidateInfo.MStatus);
            FormsData.append('Profession', this.state.candidateInfo.Profession);
            FormsData.append('Passport', this.state.candidateInfo.Passport);
            FormsData.append('Insertor', this.state.Insertor);
            FormsData.append('Editor', this.state.Editor);
            FormsData.append('Image', this.state.image);
            FormsData.append('ImageName', this.state.imageName);
            FormsData.append('placeofissue', this.state.candidateInfo.PlaceOfIssue);
            FormsData.append('travellingto', this.state.candidateInfo.TrevellingTo);
            FormsData.append('token', this.state.tokenNO);

            axios.post('/setcandidate', FormsData, {

                headers: { 'content-type': 'multipart/form-data' }

            }).then(response => {

                this.setState({ loading: false });
                this.props.history.push('/MedicalExamination/' + Cookies.get('tokenNo'));

            })

        }else
        {

            toast.dark("Welcome Back " + Cookies.get('LoginID'), {
                position: 'top-right',
                progressClassName: 'success-progress-bar',
                autoClose: 3000,
            });

        }

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
                <div className="CandidateForm d-grid">
                    <Modal show={this.state.ShowCamera} close={this.cameraModalCall} top={this.state.modalHeight}>
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            width='100%'
                            ref='webcam'
                            videoConstraints={videoConstraints}
                        />
                        <button className="btn btns btn-block mt-3" onClick={this.takePhoto}>Click</button>
                    </Modal>
                    <Modal show={this.state.showModal} close={this.modalCall} top={this.state.modalHeight}>
                        <div>
                            <input
                                type="file"
                                className="form-control form-control-sm d-none"
                                onChange={this.onImageUpload}
                                name="userImage"
                                required
                                ref={fileInput => this.fileInput = fileInput}
                            />
                            <div className="btn-group w-100"
                                onClick={() => this.fileInput.click()}
                            >
                                <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 w-75"
                                    placeholder="Profile Image"
                                />
                                <button className="btn btn-sm mb-3 w-25 border"><small>Upload</small></button>
                            </div>
                        </div>
                        <h3 className="text-center my-3">
                            OR
                    </h3>
                        <div>
                            <button className="btn btn-sm btn-block btns" onClick={this.cameraModalCall}>Take a SnapShot</button>
                        </div>
                    </Modal>
                    <div className="CandidateForm-inner d-flex justify-content-center">
                        <div className="CandidateForm-content">
                            <form onSubmit={this.CandidateDataEntry} encType="multipart/form-data">
                                <div className="user_image">
                                    <img
                                        className="rounded-circle"
                                        id="usr_img"
                                        src={this.state.candidateImg} width="100px" height="100px" />
                                </div>
                                <h3 className="my-3 text-center">Candidate Info</h3>
                                <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="Candidate Name"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Name"
                                    value={this.state.candidateInfo.Name}
                                />
                                <input
                                    type="number"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="Candidate Age"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Age"
                                    value={this.state.candidateInfo.Age}
                                />
                                <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="Candidate Nationality"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="Nationality"
                                    value={this.state.candidateInfo.Nationality}
                                />
                                <select name="Gander" className="form-control form-control-sm mb-3 rounded-0" onChange={this.onChangeHandler}
                                required>
                                    <option value="">Candidate  Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="FeMale">FeMale</option>
                                </select>
                                <select name="MStatus" className="form-control form-control-sm mb-3 rounded-0" onChange={this.onChangeHandler}
                                required>
                                    <option value="">Marital Status</option>
                                <option value="Married">Married</option>
                                <option value="UnMarried">UnMarried</option>
                            </select>
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Profession"
                                onChange={this.onChangeHandler}
                                name="Profession"
                                value={this.state.candidateInfo.Profession}
                            />
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Passport NO."
                                onChange={this.onChangeHandler}
                                required
                                name="Passport"
                                value={this.state.candidateInfo.Passport}
                            />
                            <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="Place Of Issue"
                                    onChange={this.onChangeHandler}
                                    required
                                    name="PlaceOfIssue"
                                    value={this.state.candidateInfo.PlaceOfIssue}
                                />
                            <input
                                    type="text"
                                    className="form-control form-control-sm mb-3 rounded-0"
                                    placeholder="Trevelling To"
                                    onChange={this.onChangeHandler}
                                    name="TrevellingTo"
                                    value={this.state.candidateInfo.TrevellingTo}
                                />
                            <button className="btn btn-sm btn-block btns mb-3" onClick={this.modalCall}>Profile Image</button>
                            <div className="text-center">
                                <button type="submit" className="btn btn-sm px-5 btns">Next</button>
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

export default CandidateForm;