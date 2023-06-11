const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        const productList = await prisma.stock.findMany({
            include: {
                category: true
            }
        })
        const newArr = productList.map((e) => {
            e.category = e.category.name
            if(e.currentStock <= e.safetyStock){
                e.needRestock = true
            } else {
                e.needRestock = false
            }
            return e
        })
        res.status(200).json({message: 'Tes Get Product Category', items: newArr})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}