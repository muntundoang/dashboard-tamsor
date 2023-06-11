const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const obj = req.body;
    const data = {
      ...obj,
      isActive: true,
    };
    console.log(data);
    let product = await prisma.stock.create({
      data,
      include: {
        category: true
      }
    });
    product.category = product.category.name
    if(product.safetyStock >= product.currentStock){
        product.needRestock = true
    } else {
        product.needRestock = false
    }
    console.log("addProduct ==> ", product);
    res.status(200).json({ message: "Tes Add Product", product });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
