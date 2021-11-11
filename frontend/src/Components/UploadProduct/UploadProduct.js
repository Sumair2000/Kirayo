import React, { useState,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  Typography,
  Grid,
  Button,
  FormGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  Input,
} from "@mui/material";
import "./styles.css";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import decode from "jwt-decode";

export const UploadProduct = (props) => {

  const location = useLocation();
  const history = useHistory();
  const [Token_Id, setToken_Id] = useState(localStorage.getItem("token"))
  const [Title, setTitle] = useState("");
  const [userId, setuserId] = useState(0);
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState();
  const [Category, setCategory] = useState("");
  const [perGiven, setperGiven] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Name, setName] = useState("")
  const [Images, setImages] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    setName("");
    props.showAlert("Logout Successfully", "success");
  };


  useEffect(() => {
    const token = Token_Id;
    if (token) {
      const { exp, name, id } = decode(token);
      setuserId(id)
      setName(name);
      if (Date.now() >= exp * 1000) {
        handleLogout();
      }
    }
    setToken_Id(localStorage.getItem("token"));
  }, [location]);
  
  const updateImages =  (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !userId ||
      !Name ||
      !Title ||
      !Description ||
      !Price ||
      !Category ||
      !perGiven ||
      !Phone ||
      !Address ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      userId: userId,
      userName: Name,
      title: Title,
      description: Description,
      category: Category,
      price: Price,
      rentType: perGiven,
      images: Images,
      phoneNumber: Phone,
      address: Address,
    };
    Axios.post("/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div
      className="parentDiv"
      style={{ paddingTop: "45px", paddingBottom: "10px" }}
    >
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Typography variant="h4">Anything for rent?</Typography>
        </div>

        <FormGroup>
          {/* DropZone */}
          <FileUpload refreshFunction={updateImages} />
          <br />
          <TextField
            variant="standard"
            required
            fullWidth
            id="title"
            label="AD TITLE"
            name="title"
            value={Title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            variant="standard"
            required
            fullWidth
            id="description"
            label="DESCRIPTION"
            name="description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">
              CHOOSE CATEGORY
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="CHOOSE CATEGORY"
              name="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="input"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="Apparels">Apparels</MenuItem>
              <MenuItem value="Vehicles">Vehicles</MenuItem>
              <MenuItem value="Equipments">Equipments</MenuItem>
              <MenuItem value="Footwear">Footwear</MenuItem>
            </Select>
          </FormControl>
          <br />
          <MuiPhoneNumber
            className="my-2"
            label="PHONE NUMBER"
            variant="standard"
            value={Phone}
            defaultCountry={"pk"}
            onChange={setPhone}
          />
          <br />
          <Grid container className="my-1">
            <Grid item>
              <InputLabel htmlFor="standard-adornment-amount">
                SET A PRICE
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                required={true}
                value={Price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">Rs</InputAdornment>
                }
              />
              {/* <TextField required  fullWidth id="price" label="Price" name="price" value={Price} onChange={(e) => {setPrice(e.target.value)}} variant="standard" /> */}
            </Grid>
            <Grid
              item
              className="mx-2"
              alignItems="stretch"
              style={{ display: "flex" }}
            >
              <FormControl
                className="my-1"
                variant="standard"
                sx={{ m: 2, minWidth: 150 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Rent type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={perGiven}
                  onChange={(e) => {
                    setperGiven(e.target.value);
                  }}
                  label="rent type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                  <MenuItem value="Month">Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            className="my-2"
            variant="standard"
            required
            fullWidth
            id="address"
            label="ADDRESS"
            name="address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button className="my-3" variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </FormGroup>
      </div>
    </div>
  );
};
