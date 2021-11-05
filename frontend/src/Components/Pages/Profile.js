import React from 'react'
import Navbar1 from '../Navbar/Navbar1'
import {  useSelector} from 'react-redux'
import {EditProfile} from "../EditProfile/EditProfile"

const Profile = (props) => {
  
  return (
    <div>
      <Navbar1 showAlert={props.showAlert}/>
      <EditProfile/>
    </div>
  )
}

export default Profile
