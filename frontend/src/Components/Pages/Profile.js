import React from 'react'
import Navbar from '../Navbar/Navbar'
import {  useSelector} from 'react-redux'
import {EditProfile} from "../EditProfile/EditProfile"

const Profile = (props) => {
  
  return (
    <div>
      <Navbar showAlert={props.showAlert}/>
      <EditProfile/>
    </div>
  )
}

export default Profile
