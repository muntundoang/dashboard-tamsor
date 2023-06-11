const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        const categoryList = await prisma.category.findMany()
        res.status(200).json({message: 'Tes Get Product Category', categoryList})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}