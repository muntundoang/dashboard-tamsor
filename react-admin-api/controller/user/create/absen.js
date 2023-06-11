const { PrismaClient } = require("@prisma/client");
const { readPayloadToken } = require("../../../middleware/jwt");
const { syncDate } = require("../../../middleware/timeConvert")
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const { access_token } = req.body;
    const { data } = readPayloadToken(access_token);
    const id = data;
    let activity = "checkIn";
    let isCheckIn = true;

    let createdAt = syncDate(new Date())

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // -------------- User Check --------------
    if (user === null) {
      throw {
        error: "token did not match / User Not Found",
        location: "absen.js",
      };
    }
    // ----------------------------------------

    // ------------ User Activity -------------
    if (user.isCheckIn) {
      activity = "checkOut";
      isCheckIn = false;
    }
    // ----------------------------------------

    // -------------- User Absen --------------
    const createAbsen = prisma.absen.create({
      data: {
        userId: id,
        activity,
        createdAt,
        updatedAt: createdAt
      },
    });
    // ----------------------------------------

    // User isCheckIn Update
    const userUpdate = prisma.user.update({
      where: {
        id,
      },
      data: {
        isCheckIn,
      },
    });

    // $transaction API
    await prisma.$transaction([createAbsen, userUpdate]);

    // success output data
    if (activity === "checkOut") {
      res.status(200).json({ message: "check out success", isCheckIn });
    } else {
      res.status(200).json({ message: "check in success", isCheckIn });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
