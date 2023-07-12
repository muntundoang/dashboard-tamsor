const { PrismaClient } = require("@prisma/client");
const { comparePasswordWithHash } = require("../../../middleware/bcrypt");
const { payloadTokenGenerate } = require("../../../middleware/jwt");
const prisma = new PrismaClient();

module.exports = async function (req, res) {
  try {
    const { username, password } = req.body;

    const userLogin = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // -------------- User Check --------------
    if (userLogin === null) {
      throw { error: "username / password did not match" };
    }
    // ----------------------------------------

    // -------------- Password Check --------------
    let resPasswordCompare = comparePasswordWithHash(
      password,
      userLogin.password
    );
    if (!resPasswordCompare) {
      throw { error: "username / password did not match" };
    }
    // --------------------------------------------

    // -------------- Token Generate --------------
    userLogin.valid = true;
    let { access_token } = payloadTokenGenerate(userLogin.id);
    delete userLogin.id;
    delete userLogin.password;
    delete userLogin.username;
    res.status(200).json({ user: userLogin, access_token });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
