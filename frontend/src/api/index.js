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

export const fetchPosts = (page) => {
  return axios({
    method: "GET",
    url: `product/getProducts?page=${page}`
  })
}

export const getMyPosts = (id) => {
  return axios({
    method: "GET",
    url: `/product/getMyPosts/${id}`
  })
}

export const getProductByCategory = (cat) => {
  return axios({
    method: "GET",
    url: `/product/?category=${cat}`
  })
}

export const getMyReservation = (id) => {
  return axios({
    method: "GET",
    url: `/product/getMyReservation/${id}`
  })
}

export const getProductBySearch = (search) => {
  return axios({
    method: "GET",
    url: `/product/search/${search}`
  })
}