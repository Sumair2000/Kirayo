import React from "react";
import fbLogo from "../../Images/fb.png";
import instaLogo from "../../Images/insta.png";
import twitterLogo from "../../Images/twitter.png";
import kirayoLogo from "../../Images/logo2flat.png";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./styles.css";
import { dividerClasses } from "@mui/material";

function Footer() {
  return (
    <div className="footerParentDiv my-1">
      <div className="content">
        <div className="logo1">
          <div classNamme="homeLink">
            <a href="/products">
              <img
                border="0"
                alt="kirayoLogo"
                src={kirayoLogo}
                width="46"
                height="46"
              />
              <h4
                style={{
                  fontFamily: "Bubblegum Sans",
                  fontWeight: 600,
                  color: "#E6EEF0",
                  textAlign: "start",
                  cursor: "pointer",
                  paddingTop: 4,
                  fontSize: 34,
                }}
              >
                Kirayo
              </h4>
            </a>
          </div>

          <div className="tagline">
            <p>
              Rent anything from <br /> anywhere at any time.
            </p>
          </div>
        </div>
        <div className="topBG">
          <div className="heading">
            <p>TOP CATEGORIES</p>
          </div>
          <div className="list">
            <ButtonGroup
              orientation="vertical"
              color="warning"
              variant="text"
              aria-label="text button group"
              disableRipple="true"
              disableFocusRipple="true"
              disableElevation="true"
              disabled="true"
            >
              <Button>
                {" "}
                <a href="#">Apparels</a>{" "}
              </Button>
              <Button>
                <a href="#">Tools</a>
              </Button>
              <Button>
                <a href="#">Equipments</a>
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="aboutBG">
          <div className="heading">
            <p>ABOUT KIRAYO</p>
          </div>
          <div className="list">
            <ButtonGroup
              orientation="vertical"
              color="warning"
              variant="text"
              aria-label="text button group"
              disableRipple="true"
              disableFocusRipple="true"
              disableElevation="true"
              disabled="true"
            >
              <Button>
                {" "}
                <a href="#">Our Team</a>{" "}
              </Button>
              <Button>
                <a href="#">Our Story</a>
              </Button>
              <Button>
                <a href="#">How Kirayo works</a>
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>GET IN TOUCH</p>
          </div>
          <div className="contact">
            {/* <ul>
              <li>
                <a href="#">
                  <img
                    border="0"
                    alt="kirayoFB"
                    src= {fbLogo}
                    width="21"
                    height="21"
                    padding= "4"
                  />
                </a>
              </li>
              <li>
              
                <a href="#">
                  <img
                    border="0"
                    alt="kirayoInsta"
                    src={instaLogo}
                    width="16"
                    height="16"
                    padding-right="18"
                  />
                </a>
                  Phone
              </li> <br/> <br/> 
            </ul> */}
            <br />
            
              <ButtonGroup
                variant="text"
                orientation="vertical"
                aria-label="text button group"
                color="warning"
              >
                <Button>
                  {" "}
                  <a href="#">
                    <img
                      border="0"
                      alt="kirayoFB"
                      src={fbLogo}
                      width="21"
                      height="21"
                      padding="4"
                    />
                  </a>{" "}
                </Button>
                <Button>
                  <a href="#">
                    <img
                      border="0"
                      alt="kirayoInsta"
                      src={instaLogo}
                      width="21"
                      height="21"
                    />
                  </a>
                </Button>
                <Button>
                  <a href="#">
                    <img
                      border="0"
                      alt="kirayoTwitter"
                      src={twitterLogo}
                      width="21"
                      height="21"
                    />
                  </a>
                </Button>
              </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="footer">
        <Typography variant="body4" color="#FFFF" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            Kirayo
          </Link>{" "}
          {new Date().getFullYear()}
          {". All rights reserved."}
        </Typography>
      </div>
    </div>
  );
}

export default Footer;