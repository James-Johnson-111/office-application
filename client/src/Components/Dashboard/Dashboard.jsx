// import Cookies from 'js-cookie';
// import react, { Component } from 'react';
// import { Link, NavLink, Route, Switch } from 'react-router-dom';
// import Loading from '../UI/Loading/Loading';
// import CandidateForm from './CandidateForm/CandidateForm';
// import CreateUser from './CreateUser/CreateUser';

// import './Dashboard.css';
// import DashboardHome from './DashboardHome/DashboardHome';
// import LaboratoryInvestigation from './LaboratoryInvestigation/LaboratoryInvestigation';
// import MedicalExamination2 from './MedicalExamination-2/MedicalExamination2';
// import MedicalExamination from './MedicalExamination/MedicalExamination';
// import ReportPanel from './ReportPanel/ReportPanel';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import $ from 'jquery';
// // import axios from '../../axios-instance';
// import axios from 'axios';

// class Dashboard extends Component {

//     constructor( props )
//     {

//         super( props );
//         this.state = {
//             sideBar: false,
//             loading: true,
//             showCandidate_info: false,
//             showCandidate_info_icon: 'las la-cogs la-2x',
//             Token: null,
//             Name:null,
//             Passport: null
//         }

//     }

//     componentDidMount()
//     {

//         let uniqueID = () => {

//             return Math.floor((1 + Math.random()) * 0x10000)
//                 .toString(16)
//                 .substring(1);

//         }
//         Cookies.set( 'tokenNo', uniqueID() );

//         if( Cookies.get('LoginID') === undefined )
//         {

//             this.props.history.push('/login');

//         }else
//         {

//             this.props.history.push('/dashboard');

//         }

//         this.setState( { loading: false } );

//         if( Cookies.get('FirstVisit') != undefined )
//         {

//             setTimeout( () => {

//                 toast.dark("Welcome Back " + Cookies.get('LoginID'), {
//                     position: 'top-right',
//                     progressClassName: 'success-progress-bar',
//                     autoClose: 3000,
//                 });
    
//             }, 1000 );

//         }

//         Cookies.remove('FirstVisit');

//         setInterval( () => {
            
//             if( Cookies.get('LoginID') === undefined || Cookies.get('LoginID') === null )
//             {

//                 this.props.history.push('/login');

//             }
            
//         }, 5 * 1000);

        // setInterval( () => {
            
        //     if( Cookies.get('tokenNo') != undefined || Cookies.get('tokenNo') != null )
        //     {

        //         const formsData = new FormData();
        //         formsData.append( 'token', Cookies.get('tokenNo') );
        //         axios.post( '/gettokendata', formsData ).then( response => { 

        //             if( response.data[0] == "N" )
        //             {
                        
        //                 this.setState( { Token: "Not Found", Name: "Not Found", Passport: "Not Found" } );

        //             }else
        //             {

        //                 this.setState( { Token: Cookies.get('tokenNo'), Name: response.data[0].candidate_name, Passport: response.data[0].candidate_passport } );

        //             }

        //         } )

        //     }
            
        // }, 5 * 1000);

//     }

//     openSideBar = () => {

//         this.setState( { loading: true } );

//         if(this.state.sideBar)
//         {
//             this.setState( { sideBar: false } );
//             this.setState( { loading: false } );
//         }else
//         {
//             this.setState( { sideBar: true } );
//             this.setState( { loading: false } );
//         }

//     }
    
//     render()
//     {

//         let createUser = null;

//         if(Cookies.get('LoginID') != undefined && Cookies.get('LoginID') == 'Admin')
//         {
//             createUser = <Link to='/createuser' className="text-white">Create New User</Link>;
//         }

//         return(
                
//             <>
//                 <Loading show={this.state.loading} />
//                 <button 
//                     className="btn btn-sm current_candidate_btn d-tablet-block"
//                     onClick={ () => {
                                
//                         if( this.state.showCandidate_info )
//                         {

//                             this.setState( { showCandidate_info: false, showCandidate_info_icon: 'las la-cog la-2x' } )

//                         }else
//                         {

//                             this.setState( { showCandidate_info: true, showCandidate_info_icon: 'las la-cogs la-2x' } )

//                         }

//                     } }
//                 >
//                     <i className="las la-cog la-2x"></i>
//                 </button>

//                 <div 
//                     className="settings_div d-tablet-block"
//                     style={{
//                         'height': this.state.showCandidate_info ? '100vh' : '0',
//                     }}
//                 >
//                     <div>
//                         <div className="text-right">
//                             <button
//                                 className="btn btn-sm"
//                                 onClick={() => {

//                                     if (this.state.showCandidate_info) {

//                                         this.setState({ showCandidate_info: false, showCandidate_info_icon: 'las la-cog la-2x' })

//                                     } else {

//                                         this.setState({ showCandidate_info: true, showCandidate_info_icon: 'las la-cogs la-2x' })

//                                     }

//                                 }}
//                             >
//                                 <i className="las la-times la-2x"></i>
//                             </button>
//                         </div>
//                         <div className="settings_div_content w-100">

//                             <div className="tab-content px-3">
//                                 <div className="tab-pane fade show active" id="tab1default">
//                                     <h2 className="font-weight-bold">
//                                         Candidate
//                                     </h2>
//                                     <div className="text-left mb-3">
//                                         <p className="mb-0 font-weight-bold">Token No</p>
//                                         {
//                                             this.state.Token == "Not Found" || this.state.Token == null ?
//                                                 <small>Not Found</small>
//                                                 :
//                                                 <small>{this.state.Token}</small>
//                                         }
//                                     </div>
//                                     <div className="text-left mb-3">
//                                         <p className="mb-0 font-weight-bold">Candidate Name</p>
//                                         {
//                                             this.state.Name == "Not Found" || this.state.Name == null ?
//                                                 <small>Not Found</small>
//                                                 :
//                                                 <small>{this.state.Name}</small>
//                                         }
//                                     </div>
//                                     <div className="text-left mb-3">
//                                         <p className="mb-0 font-weight-bold">Passport No</p>
//                                         {
//                                             this.state.Passport == "Not Found" || this.state.Passport == null ?
//                                                 <small>Not Found</small>
//                                                 :
//                                                 <small>{this.state.Passport}</small>
//                                         }
//                                     </div>
//                                 </div>
//                                 <div className="tab-pane fade" id="tab2default">
//                                     <h1>Other Info</h1>
//                                 </div>
//                                 <div className="tab-pane fade" id="tab3default">
//                                     <h1>Settings</h1>
//                                 </div>
//                             </div>

//                             <div className="d-flex justify-content-center">
//                                 <ul className="nav nav-tabs border-bottom-0 d-block text-center w-75">
//                                     <li className="active">
//                                         <a className="mb-3 text-dark" href="#tab1default" data-toggle="tab">Current Candidate</a>
//                                     </li>
//                                     <li className="w-100">
//                                         <a className="mb-3 text-dark" href="#tab2default" data-toggle="tab">Other Info</a>
//                                     </li>
//                                     <li className="w-100">
//                                         <a className="mb-3 text-dark" href="#tab3default" data-toggle="tab">Settings</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="Dashboard">
//                     <div className="top_bar d-flex justify-content-between">
//                         <div className="d-grid">
//                             <Link to="/dashboard" className="Dashboard_logo">Labonline</Link>
//                         </div>
//                         <div className="d-grid other-grids">
//                             <input type="search" className="form-control" placeholder="search keywords" />
//                         </div>
//                         <div className="d-grid other-grids"></div>
//                         <div className="d-grid other-grids"></div>
//                         <div className="d-grid other-grids">
//                         </div>

//                         <div className="d-grid d-tablet-block">
//                             <button className="btn text-white px-0" onClick={this.openSideBar}>
//                                 <i className="las la-ellipsis-v la-2x"></i>
//                             </button>
//                         </div>
//                         <div className="d-grid other-grids">
//                             {createUser}
//                         </div>
//                     </div>
//                     <div className="side_fixed_bar">
//                         <button className="btn btn-block text-white p-0" onClick={this.openSideBar}>
//                             <i className="las la-bars la-2x"></i>
//                         </button>
//                         <button
//                             className="btn btn-block text-white p-0 candidate_info_btn"
//                             onClick={ () => {
                                
//                                 if( this.state.showCandidate_info )
//                                 {

//                                     this.setState( { showCandidate_info: false, showCandidate_info_icon: 'las la-cogs la-2x' } )

//                                 }else
//                                 {

//                                     this.setState( { showCandidate_info: true, showCandidate_info_icon: 'las la-cog la-2x' } )

//                                 }

//                             } }
//                         >
//                             <i className={this.state.showCandidate_info_icon}></i>

//                             <div 
//                                 className="candidate_info_div" 
//                                 style={ { 
//                                     // 'left' : this.state.showCandidate_info ? '100%' : '-100%', 
//                                     'width' : this.state.showCandidate_info ? '200px' : '0',
//                                     'opacity' : this.state.showCandidate_info ? '1' : '0' 
//                                 } }
//                                 >
//                                     <h5 className="font-weight-bold">
//                                         Candidate
//                                     </h5>
//                                 <div className="text-left mb-3">
//                                     <p className="mb-0 font-weight-bold">Token No</p>
//                                     {
//                                         this.state.Token == "Not Found" || this.state.Token == null ?
//                                         <small>Not Found</small>
//                                         :
//                                         <small>{this.state.Token}</small>
//                                     }
//                                 </div>
//                                 <div className="text-left mb-3">
//                                     <p className="mb-0 font-weight-bold">Candidate Name</p>
//                                     {
//                                         this.state.Name == "Not Found" || this.state.Name == null ?
//                                         <small>Not Found</small>
//                                         :
//                                         <small>{this.state.Name}</small>
//                                     }
//                                 </div>
//                                 <div className="text-left mb-3">
//                                     <p className="mb-0 font-weight-bold">Passport No</p>
//                                     {
//                                         this.state.Passport == "Not Found" || this.state.Passport == null ?
//                                         <small>Not Found</small>
//                                         :
//                                         <small>{this.state.Passport}</small>
//                                     }
//                                 </div>
//                             </div>
//                         </button>

//                         <div className='h-100' style={{ 'display': 'grid', 'alignItems': 'center' }}>
//                             <div>
//                                 <a href="##" className="d-block text-center">
//                                     <i className="lab la-facebook la-2x text-white py-3"></i>
//                                 </a>
//                                 <a href="##" className="d-block text-center">
//                                     <i className="lab la-twitter la-2x text-white py-3"></i>
//                                 </a>
//                                 <a href="##" className="d-block text-center">
//                                     <i className="lab la-instagram la-2x text-white py-3"></i>
//                                 </a>
//                                 <a href="##" className="d-block text-center">
//                                     <i className="lab la-google-drive la-2x text-white py-3"></i>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="side_bar" style={{ 'transform': this.state.sideBar ? 'translateX(0)' : 'translateX(-100%)' }}>
//                         <div className="d-flex justify-content-lg-start">
//                             <button className="btn text-white" onClick={this.openSideBar}>
//                                 <i className="las la-arrow-left"></i>
//                             </button>
//                         </div>
//                         <div className="action_links" onClick={this.openSideBar}>
//                             <Link to={ "/candidateinfo/" + Cookies.get('tokenNo') }>Candidate Info</Link>
//                         </div>
//                         <div className="action_links sub-links" onClick={this.openSideBar}>
//                             <Link to={ '/MedicalExamination/' + Cookies.get('tokenNo') }>MedicalExamination</Link>
//                         </div>
//                         <div className="action_links sub-links" onClick={this.openSideBar}>
//                             <Link to={ '/MedicalExamination2/' + Cookies.get('tokenNo') }>MedicalExamination2</Link>
//                         </div>
//                         <div className="action_links sub-links" onClick={this.openSideBar}>
//                             <Link to={ '/LaboratoryInvestigation/' + Cookies.get('tokenNo') }>Laboratory Investigation</Link>
//                         </div>
//                         <div className="action_links d-tablet-block" onClick={this.openSideBar}>
//                             {createUser}
//                         </div>
//                         <div className="action_links" onClick={this.openSideBar}>
//                             <Link to="/candidatereport">Reports</Link>
//                         </div>
//                         <div className="action_links" onClick={this.openSideBar}>
//                             <Link to="/logout">Logout</Link>
//                         </div>
//                     </div>
//                     <div className="rendering">
//                         <Switch>
//                             <Route exact path='/dashboard' component={DashboardHome} />
//                             <Route exact path='/candidateinfo/:id' component={CandidateForm} />
//                             <Route exact path='/candidatereport' component={ReportPanel} />
//                             <Route exact path='/createuser' component={CreateUser} />
//                             <Route exact path='/MedicalExamination/:id' component={MedicalExamination} />
//                             <Route exact path='/MedicalExamination2/:id' component={MedicalExamination2} />
//                             <Route exact path='/LaboratoryInvestigation/:id' component={LaboratoryInvestigation} />
//                         </Switch>
//                     </div>
//                 </div>
//                 <ToastContainer autoClose={3000} />
//             </>

//         );

//     }

// }

// export default Dashboard;