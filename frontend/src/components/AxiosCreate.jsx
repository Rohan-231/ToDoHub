import axios from "axios";
import {API_URL} from './config.js';

// const SERVER_HOST = "localhost";
// const SERVER_PORT = 5555;
// const SERVER_SOCKET_ADDRESS = "http://" + SERVER_HOST + ":" + SERVER_PORT + "/";
const SERVER_SOCKET_ADDRESS = API_URL;


export const taskcard = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "taskcard"
});

export const tasks = axios.create({
    baseURL: SERVER_SOCKET_ADDRESS + "tasks"
});
