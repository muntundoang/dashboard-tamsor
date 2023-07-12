const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
    process.env.YOUR_CLIENT_ID,
    process.env.YOUR_CLIENT_SECRET,
    process.env.YOUR_REDIRECT_URL,
);

module.exports = async function (req, res) {
  try {
    const { code, scope } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log("tokens ==> ", tokens);

    res.send(req.query);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
