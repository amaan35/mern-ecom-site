import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const product = props.product;

  const handleUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/delete/${id}`);
      if (res.status === 200) {
        console.log("product deleted");
        props.fetchProducts();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 345,
          height: 550,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardHeader title={product.title} />
        <CardMedia
          component="img"
          height="194"
          image={product.images}
          alt="Product image"
        />
        <CardContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="text.primary">
                {product.rating}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body1" color="text.primary">
                {product.price} $
              </Typography>
              <Typography variant="body1" color="text.primary">
                Price discount: {product.discountPercentage}%
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" gap={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleUpdate(product._id)}
            >
              Update
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
