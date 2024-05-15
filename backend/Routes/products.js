import express from "express";
import mongoose from 'mongoose'
import Product from "../Models/products.js";
const router = express.Router();

//Create a new product
router.post("/create", async (req, res) => {
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      images: req.body.images,
    });
  
    await Product.create(newProduct);
    res.send("Product saved to the database!");
  });
  
  // Get the all product list
  router.get("/", async (req, res) => {
    const productList = await Product.find();
    res.send(JSON.stringify(productList));
  });
  
  //Get a single product by id
  router.get("/:id", async (req, res) => {
    const product_id = req.params.id;
    const product = await Product.findById(product_id);
    res.send(JSON.stringify(product));
  });
  
  //Update a product based on the id
  router.put("/update/:id", async (req, res) => {
    const product_id = req.params.id;
    await Product.findByIdAndUpdate(product_id, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      images: req.body.images,
  });
  
  res.send("Product updated successfully!");
  });    
  
  //Delete a product based on the id
  router.delete("/delete/:id", async (req, res) => {
    const product_id = req.params.id;
    await Product.findByIdAndDelete(product_id);
    res.send("Product deleted!");
  });

  export default router;