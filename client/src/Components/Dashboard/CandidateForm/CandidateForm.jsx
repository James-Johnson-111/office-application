import react, { Component } from 'react';

import './CandidateForm.css';
import axios from '../../../axios-instance';
import Modal from '../../UI/Modal/Modal';
import Cookies from 'js-cookie';
import Webcam from 'react-webcam';
// import img from '/images/avatar6.png';

class CandidateForm extends Component {

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
                Passport: null
            },
            Insertor: null,
            Editor: null,
            showModal: false,
            ShowCamera: false,
            candidateImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
            image: null,
            imageName: null
        }

    }

    componentDidMount()
    {

        if( Cookies.get( 'LoginID' ) != null )
        {

            this.setState( { Editor: Cookies.get( 'LoginID' ), Insertor: Cookies.get( 'LoginID' ) } );

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

        const FormsData = new FormData();

        FormsData.append( 'Name', this.state.candidateInfo.Name );
        FormsData.append( 'Age', this.state.candidateInfo.Age );
        FormsData.append( 'Nationality', this.state.candidateInfo.Nationality );
        FormsData.append( 'Gander', this.state.candidateInfo.Gander );
        FormsData.append( 'MStatus', this.state.candidateInfo.MStatus );
        FormsData.append( 'Profession', this.state.candidateInfo.Profession );
        FormsData.append( 'Passport', this.state.candidateInfo.Passport );
        FormsData.append( 'Insertor', this.state.Insertor );
        FormsData.append( 'Editor', this.state.Editor );
        FormsData.append( 'Image', this.state.image );
        FormsData.append( 'ImageName', this.state.imageName );

        axios.post( '/setcandidate', FormsData, { 

            headers: { 'content-type': 'multipart/form-data' } 

        } ).then( response => {

            console.log( response.data );
            this.props.history.push('/candidatereport');

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

            <div className="CandidateForm d-grid">
                <Modal show={this.state.ShowCamera} close={this.cameraModalCall}>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        width='100%'
                        ref='webcam'
                        videoConstraints={videoConstraints}
                    />
                    <button className="btn btns btn-block mt-3" onClick={this.takePhoto}>Click</button>
                </Modal>
                <Modal show={this.state.showModal} close={this.modalCall}>
                    <div>
                        <input
                            type="file"
                            className="form-control form-control-sm d-none"
                            onChange={this.onImageUpload}
                            name="userImage"
                            ref={fileInput => this.fileInput = fileInput}
                        />
                        <div className="btn-group w-100"
                            onClick={() => this.fileInput.click()}
                        >
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 w-75"
                                placeholder="Profile Image"
                            // defaultValue={this.state.UserInfo.userImage == null ? '' : 'Image Selected'}
                            />
                            <button className="btn btn-sm mb-3 w-25 border"><small>Upload</small></button>
                        </div>
                    </div>
                    <h3 className="text-center my-3">
                        OR
                    </h3>
                    <div>
                        <button className="btn btn-sm btn-block btns"  onClick={this.cameraModalCall}>Take a SnapShot</button>
                    </div>
                </Modal>
                <div className="CandidateForm-inner d-flex justify-content-center">
                    <div className="CandidateForm-content">
                        <form onSubmit={this.CandidateDataEntry} encType="multipart/form-data">
                            <div className="user_image">
                                {/* 
                                    { window.location.origin + '/images/avatar2.png' }
                                */}
                                <img 
                                    className="rounded-circle"
                                    id="usr_img"
                                    src={ this.state.candidateImg } width="100px" height="100px" />
                            </div>
                            <h3 className="my-3 text-center">Candidate Info</h3>
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Name"
                                onChange={this.onChangeHandler}
                                name="Name"
                            />
                            <input
                                type="number"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Age"
                                onChange={this.onChangeHandler}
                                name="Age"
                            />
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Nationality"
                                onChange={this.onChangeHandler}
                                name="Nationality"
                            />
                            <select name="Gander" className="form-control form-control-sm mb-3 rounded-0" onChange={this.onChangeHandler}>
                                <option value="">Candidate  Gender</option>
                                <option value="Male">Male</option>
                                <option value="FeMale">FeMale</option>
                            </select>
                            <select name="MStatus" className="form-control form-control-sm mb-3 rounded-0" onChange={this.onChangeHandler}>
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
                            />
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3 rounded-0"
                                placeholder="Candidate Passport NO."
                                onChange={this.onChangeHandler}
                                name="Passport"
                            />
                            <button className="btn btn-sm btn-block btns mb-3" onClick={this.modalCall}>Profile Image</button>
                            <div className="text-center">
                                <button type="submit" className="btn btn-sm px-5 btns">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}

export default CandidateForm;