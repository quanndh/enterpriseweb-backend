module.exports = {


  friendlyName: 'Get peer',


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
      let { meetingId } = inputs;
      let meetingInfo = await Meeting.findOne(meetingId)
      return exits.success({
        code: 0,
        data: meetingInfo.peers
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
