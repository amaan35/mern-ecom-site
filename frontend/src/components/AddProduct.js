import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  AppBar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    discountPercentage: "",
    images: "",
    price: "",
    rating: "",
    stock: "",
    thumbnail: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:3001/create", productData);
      if (res.status === 200) {
        console.log("Product added");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ paddingTop: "50px" }}
      >
        <Paper
          elevation={3}
          style={{
            width: 550,
          }}
        >
          <Grid
            //sx={gridStyle}
            container
            direction="column"
            alignItems="center"
            gap={3}
          >
            <br />
            <Grid item>
              <Typography variant="h5">Add product</Typography>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={3}>
                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <Grid item>
                      <TextField
                        label="Title"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.title}
                        name="title"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Brand"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.brand}
                        name="brand"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Category"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.category}
                        name="category"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Description"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.description}
                        name="description"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Discount Percentage"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.discountPercentage}
                        name="discountPercentage"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <Grid item>
                      <TextField
                        label="Image link"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.images}
                        name="images"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Price"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.price}
                        name="price"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Rating"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.rating}
                        name="rating"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Stock"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.stock}
                        name="stock"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Thumbnail"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.thumbnail}
                        name="thumbnail"
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default AddProduct;
