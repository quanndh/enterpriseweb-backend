const moment = require('moment')
module.exports = {


  friendlyName: 'Get unactive student',


  description: '',


  inputs: {

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let now = moment()
      let unactiveTime = now.subtract(10, "days")
      unactiveTime = unactiveTime.endOf('day').valueOf()
      let users = await User.find({ lastActivity: { "<": unactiveTime }, role: 4 })
      return exits.success({
        code: 0,
        data: users
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        error
      })
    }

  }


};
