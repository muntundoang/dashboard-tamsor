// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URL
);

module.exports = async function (req, res) {
  try {
    const scopes = ["https://www.googleapis.com/auth/calendar"];

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
