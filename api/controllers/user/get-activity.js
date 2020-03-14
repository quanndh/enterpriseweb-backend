module.exports = {


  friendlyName: 'Get activity',


  description: '',


  inputs: {
    userId: { type: 'number' },
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { userId } = inputs
      let activity = await ActionLog.find({ owner: userId }).populate('owner').sort('createdAt DESC')
      activity = activity.map(a => {
        delete a.owner.password;
        return a;
      })
      return exits.success({
        code: 0,
        data: activity
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
