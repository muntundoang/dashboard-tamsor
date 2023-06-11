const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await prisma.stock.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw { error: "id not found" };
    }

    product.category = product.category.name;

    res
      .status(200)
      .json({ message: "Tes Get One Product Category", product });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
