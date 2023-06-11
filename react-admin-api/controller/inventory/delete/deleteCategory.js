const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    const item = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!item) {
      throw { error: "ID category not found" };
    }
    const data = await prisma.category.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: `Category ${item.name} has been deleted` });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
