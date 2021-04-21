import axios from 'axios';

const instance = axios.create( { baseURL: 'https://office-server.herokuapp.com/' } );

export default instance;