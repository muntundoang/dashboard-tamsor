const { PrismaClient } = require("@prisma/client");
const { readPayloadToken } = require("../../middleware/jwt");
const { dateToString } = require("../../middleware/timeConvert")
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  const { access_token } = req.body;

  try {
    let user;
    let absen
    if (!access_token === false) {
      const { data } = readPayloadToken(access_token);
      user = await prisma.user.findUnique({
        where: {
          id: data,
        },
        include: {
          absen: true
        }
      });
      delete user.id;
      delete user.password;
      delete user.username;
      user.valid = true

      user.absen.sort(function(a,b){
        const sort = b.createdAt - a.createdAt
        return sort;
      });

      absen = user.absen.map((e) => {
        e.createdAt = dateToString(e.createdAt)
        e.updatedAt = dateToString(e.updatedAt)
        return e
      })

    }
    res.status(200).json({user, absen});
  } catch (error) {
    console.log("<===== error auth =====> \n", error);
    res.send(error);
  }
};
