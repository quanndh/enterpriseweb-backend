module.exports = {


  friendlyName: 'Get message',


  description: '',


  inputs: {
    meetingId: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { meetingId, skip, limit } = inputs;
      let messages = await ChatMessage.find({ meeting: meetingId }).skip(skip).limit(limit).sort('createdAt DESC').populate('sender')
      return exits.success({
        code: 0,
        message: 'Success',
        data: messages
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }
  }


};
