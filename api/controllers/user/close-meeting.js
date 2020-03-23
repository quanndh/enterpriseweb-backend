module.exports = {


  friendlyName: 'Close meeting',


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
      await Meeting.updateOne(meetingId).set({
        isClose: 1
      })
      await Class.updateOne({ meeting: meetingId }).set({
        meeting: null
      });
      await ActionLog.create({ owner: this.req.user.id, action: 'Close meeting' })
      return exits.success({
        code: 0,
        message: 'Meeting closed'
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
