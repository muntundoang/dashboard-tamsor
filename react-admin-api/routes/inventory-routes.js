const express = require("express");
const { inventory } = require("../controller/index");
let routerInventory = express.Router();

// routerUser.use(authentication)

// Category routes
routerInventory.get("/getCategoryList", inventory.getCategory);
routerInventory.post("/addCategory", inventory.addCategory);
routerInventory.patch("/editCategory/:id", inventory.editCategory);
routerInventory.post("/deleteCategory/:id", inventory.deleteCategory);

// Product Stock routes
routerInventory.post("/addProduct", inventory.addProduct);
routerInventory.get("/getProductList", inventory.getProduct);
routerInventory.patch("/editProduct", inventory.editProduct);
routerInventory.patch('/updateCurrentStock', inventory.updateStock)
routerInventory.post("/deleteProduct/:id", inventory.deleteStock)

module.exports = routerInventory;
