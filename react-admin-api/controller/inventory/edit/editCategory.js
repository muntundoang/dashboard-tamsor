const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const item = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!item) {
      throw { message: "ID category not found" };
    } else if (item.name === name) {
      throw { message: "Edited name were same from the previous one" };
    }
    const edited = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    res.status(200).json({ message: `Category name edited from ${item.name} to ${edited.name}` });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
