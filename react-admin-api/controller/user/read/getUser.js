const { PrismaClient } = require("@prisma/client");
const { readPayloadToken } = require("../../../middleware/jwt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const { access_token } = req.body;
    const { data } = readPayloadToken(access_token);
    const { dateToString } = require('../../../middleware/timeConvert')
    const id = data;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        absen: true
      }
    });

    // -------------- User Check --------------
    if (user === null) {
      throw {
        error: "token did not match / User Not Found"
      };
    }
    // ----------------------------------------

    // ------------ Absen Reformat ------------
    const arrAbsen = user.absen.map((e) => {
      e.createdAt = dateToString(e.createdAt)
      e.updatedAt = dateToString(e.updatedAt)
      return e
    })

    // success output data
    res.status(200).json({ user, absen: arrAbsen });
    
  } catch (error) {
    console.log({
        ...error,
        location: "getUser.js",
    });
    res.send(error);
  }
};
