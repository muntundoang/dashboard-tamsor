const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const arr = req.body;
    const transaction = await prisma.$transaction(
      arr.map((e) => {
        const item = prisma.stock.findUnique({
          where: {
            id: e.id,
          },
        });
        if (!item) {
          throw { message: "ID Product not found" };
        }
        let edited = prisma.stock.update({
          where: {
            id: e.id,
          },
          data: {
            currentStock: e.currentStock,
          },
          include: {
            category: true,
          },
        });
        edited.category = edited.category.name;
        if (edited.currentStock <= edited.safetyStock) {
          edited.needRestock = true;
        } else {
          edited.needRestock = false;
        }
        return edited
      })
    );
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
