import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axios';

const services = new AxiosMockAdapter(axios, {delayResponse: 0});
export default services;
