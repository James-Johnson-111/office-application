import axios from 'axios';

const instance = axios.create( { baseURL: 'https://192.168.10.116:5000/' } );
// const instance = axios.create( { baseURL: 'https://office-server.herokuapp.com/' } );

export default instance;