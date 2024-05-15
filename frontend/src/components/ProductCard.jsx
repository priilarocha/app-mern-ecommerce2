import React, { useState } from "react";
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

const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

const ProductCard = (props) => {

  // Use the useNavigate hook from react-router-dom to get the navigate function
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    // Use the navigate function to go to the update page for the product with the given ID
    navigate("/update/" + id);
  };


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/products/delete/${id}`);
      console.log(response.data);
      // If the server responds with "Product deleted!", call the getProduct function from the props
      // This will likely refresh the list of products
      if (response.data === "Product deleted!") {
        props.getProduct();
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Initialize product state variable with the product prop
  const [product, setProduct] = useState(props.product);

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
                ${product.price}
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