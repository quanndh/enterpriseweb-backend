const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const TWILIO_ACCOUNT_SID = "AC2f37b1a0f1ddcae0c00948a630c30a5c";
const TWILIO_API_KEY = "SK0fd1020aaf1203295b545cf6e2dbc80b";
const TWILIO_API_KEY_SECRET = "xkfB0kBHAIzVXfUfpva4iXPurm0RCR9E"

module.exports = {


  friendlyName: 'Get video token',


  description: '',


  inputs: {
    meetingId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      var token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_KEY_SECRET,
      );
      token.identity = this.req.user.id;
      const grant = new VideoGrant({ room: String(inputs.meetingId) });
      token.addGrant(grant);
      return exits.success({
        code: 0,
        data: token.toJwt(),
        identity: this.req.user.id
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }
  }
};
