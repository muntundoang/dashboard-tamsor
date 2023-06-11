const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        const { name } = req.body
        const category = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(200).json({message: 'Tes Add Product Category', category})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}