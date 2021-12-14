import React from "react";

import "./styles.css";

function Footer() {
  return (
    <div className="footerParentDiv my-1">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li>Karachi</li>
              <li>Lahore</li>
              <li>Islamabad</li>
              <li>Quetta</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>ABOUT US</p>
          </div>
          <div className="list">
            <ul>
              <li>About Kirayo Group</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Kirayo People</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>KIRAYO</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Other Countries India - South Africa - Indonesia</p>
        <p>Free Classifieds in Pakistan. © 2006-2021 Kirayo</p>
      </div>
    </div>
  );
}

export default Footer;
