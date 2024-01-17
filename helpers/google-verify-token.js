const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

async function googleVerifyToken(token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID ?? ''
  });

  const payload = ticket.getPayload();
  return payload;
}

module.exports = googleVerifyToken