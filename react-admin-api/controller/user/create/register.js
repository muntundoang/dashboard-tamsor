const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../../../middleware/bcrypt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
    try {
        const {
            email,
            name,
            contact,
            birthday,
            address,
            photo,
            username,
            role,
            password,
        } = req.body

        const newDate = new Date(birthday);

        const userCreate = await prisma.user.create({
            data: {
                name,
                email,
                contact,
                birthday: newDate,
                address,
                photo,
                username,
                password: hashPassword(password),
                role,
            }
        })
        console.log(userCreate)
        res.status(200).json({message: 'User Created'})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}