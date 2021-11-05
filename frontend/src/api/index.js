import axios from 'axios';

export const login = (loginData) =>  {
  return axios({
    method: "POST",
    url: "/auth/login",
    data: loginData
  })
}

export const signup = (signupData) =>  {
  return axios({
    method: "POST",
    url: "/auth/register",
    data: signupData
  })
}

export const getUserDetails = (id) => {
  return axios({
    method: "GET",
    url: `/user/${id}`,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  })
}