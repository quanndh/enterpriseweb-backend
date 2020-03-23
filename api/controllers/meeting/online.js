module.exports = {


  friendlyName: 'Online',


  description: 'Online meeting.',


  inputs: {
    meetingId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { meetingId } = inputs;
      let meetingInfo = await Meeting.findOne(meetingId);
      let online = []
      for (let i = 0; i < meetingInfo.participants.length; i++) {
        let user = await User.findOne(meetingInfo.participants[i])
        delete user.password
        online.push(user)
      }
      return exits.success({
        code: 0,
        data: online
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        err: error
      })
    }

  }


};
