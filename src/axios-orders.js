import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-cf7f0.firebaseio.com/'
});

export default instance;