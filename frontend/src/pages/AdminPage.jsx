import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import NavBar from "../components/NavBar.jsx";
import AddProduct from "../components/AddProduct.jsx";
import UpdateProduct from "../components/UpdateProduct.jsx";

const AdminPage = () => {
  const [currentView, setCurrentView] = useState("addProduct");

  const renderView = () => {
    switch (currentView) {
      case "addProduct":
        return <AddProduct />;
      case "updateProduct":
        return <UpdateProduct />;
      default:
        return <AddProduct />;
    }
  };

  return (
    <>
      <NavBar />
      <Grid container direction="row" style={{ padding: "20px" }}>
        <Grid item xs={2}>
          <Button 
            variant="contained" 
            onClick={() => setCurrentView("addProduct")}
            style={{ marginBottom: "10px" }}
          >
            Add Product
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setCurrentView("updateProduct")}
          >
            Update Product
          </Button>
        </Grid>
        <Grid item xs={10}>
          {renderView()}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPage;