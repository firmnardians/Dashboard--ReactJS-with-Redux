import axios from "axios";

const baseURL = "https://devtest-api-beo.hop.cash/v1";
const generalURL = `${baseURL}/api/data/general`;
const locationURL = `${baseURL}/api/data/location`;
const businessURL = `${baseURL}/api/data/business`;

export const generalPost = __data => {
  return axios.post(generalURL, __data);
};

export const locationPost = __data => {
  return axios.post(locationURL, __data);
};

export const businessPost = __data => {
  return axios.post(businessURL, __data);
};
