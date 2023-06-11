const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const obj = req.body;
    const item = await prisma.stock.findUnique({
      where: {
        id: obj.id,
      },
    });

    if (!item) {
      throw { message: "ID Product not found" };
    }
    const edited = await prisma.stock.update({
      where: {
        id: obj.id,
      },
      data: obj,
      include: {
        category: true
      }
    });
    edited.category = edited.category.name
    console.log(edited.currentStock <= edited.safetyStock)
    if(edited.currentStock <= edited.safetyStock){
      edited.needRestock = true
    } else {
      edited.needRestock = false
    }
    res.status(200).json({ message: `Product ${item.name} edited`, edited });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
