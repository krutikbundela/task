import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductdetails } from "../Redux/productSlice";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Rating,
  Divider,
  Paper,
} from "@mui/material";
import Loader from "./Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { ProductDetails, isLoading, isError } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchProductdetails(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading product details.</div>;
  }

  return (
    <>
      <Box m={2}>
        <Typography
          align="center"
          variant="h3"
          components="h3"
          sx={{
            color: "#1976d3",
            fontWeight: "500",
          }}
        >
          {`Product Details`}
        </Typography>
        <Divider
          sx={{ width: "20%", borderBottomWidth: 10, margin: "1rem auto" }}
        />
      </Box>

      <Box m={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { sm: "column", xs: "column", md: "row", xl: "row" },
            border: "1px solid black",
          }}
        >
          <Box
            sx={{
              flex: "1",
              //   width: { sm: "100%", xs: "100%", md: "50%", xl: "50%" },
              height: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
            }}
          >
            <Paper
              elevation="5"
              sx={{ margin: "10px 0px", width: "90%", height: "90%" }}
            >
              <img
                src={ProductDetails?.image || ""}
                alt="product image"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Paper>
          </Box>

          <Box
            sx={{
              flex: "1",
            //   width: { sm: "100%", xs: "100%", md: "50%", xl: "50%" },
            paddingLeft:"10px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
              border: "1px solid black",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
              {ProductDetails.title}
            </Typography>
            <Typography mt={1} variant="body1" color="textSecondary">
              Product ID: {ProductDetails.id}
            </Typography>

            <Box mt={2} display="flex" alignItems="center">
              <Rating
                value={ProductDetails.rating?.rate}
                readOnly
                size="large"
              />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                ({ProductDetails.rating?.count} reviews)
              </Typography>
            </Box>

            <Box
              mt={4}
              sx={{
                width: "90%",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                Description
              </Typography>
              <Typography variant="body1">
                {ProductDetails.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", marginTop: 2 }}>
              <Typography variant="h6">Price: </Typography>
              <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
                ${ProductDetails.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetails;
