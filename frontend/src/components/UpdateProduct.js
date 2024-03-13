import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/read/${id}`);
      if (res.status === 200) {
        setProductData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/update/${id}`,
        productData
      );
      if (res.status === 200) {
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
                        value={productData.title || ""}
                        name="title"
                        onChange={handleInputChanges}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Brand"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.brand || ""}
                        name="brand"
                        onChange={handleInputChanges}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Category"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.category || ""}
                        name="category"
                        onChange={handleInputChanges}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Description"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.description || ""}
                        name="description"
                        onChange={handleInputChanges}
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
                        value={productData.discountPercentage || ""}
                        name="discountPercentage"
                        onChange={handleInputChanges}
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
                        value={productData.images || ""}
                        name="images"
                        onChange={handleInputChanges}
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
                        value={productData.price || ""}
                        name="price"
                        onChange={handleInputChanges}
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
                        value={productData.rating || ""}
                        name="rating"
                        onChange={handleInputChanges}
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
                        value={productData.stock || ""}
                        name="stock"
                        onChange={handleInputChanges}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Thumbnail"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.thumbnail || ""}
                        name="thumbnail"
                        onChange={handleInputChanges}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default UpdateProduct;
