import axios from "axios";
import React from "react";

export const BASE_URL = "http://localhost:8080/";
let token = "";
export const loadToken = async () => {
  axios.get(`${BASE_URL}token`).then((response) => {
    token = response.data;
  });
};
export const getToken = () => {
  return token;
};

var userAccount = localStorage;
export const checkLogin = () => {
  if (localStorage.getItem("user") != null) {
    return true;
  } else {
    return false;
  }
};

export const loginAccount = (id) => {
  localStorage.setItem("user", id);
};
export const userId = () => {
  return localStorage.getItem("user");
};
export const loginRemove = () => {
  localStorage.clear();
};
