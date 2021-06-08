import axios from 'axios';

const instance = axios.create( { baseURL: 'http://localhost:5000/' } );
// const instance = axios.create( { baseURL: 'https://office-server.herokuapp.com/' } );

export default instance;