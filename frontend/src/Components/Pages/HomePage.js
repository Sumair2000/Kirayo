import React from 'react'
import Banner from '../Banner/Banner'
import Navbar1 from '../Navbar/Navbar1'
const HomePage = (props) => {
  return (
    <>
      <Navbar1 showAlert={props.showAlert}/>
      <Banner/>
    </>
  )
}

export default HomePage
