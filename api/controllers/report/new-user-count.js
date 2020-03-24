const moment = require('moment')

module.exports = {


  friendlyName: 'New user count',


  description: '',


  inputs: {

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let date = moment();
      let startTime, endTime;
      let data = { date: [], data: [] };
      for (let i = 0; i < 10; i++) {
        if (i > 0) {
          date = date.subtract(1, "days")
        }
        startTime = date.startOf('day').valueOf()
        endTime = date.endOf('day').valueOf()
        let user = await User.count({ createdAt: { '>': startTime, '<': endTime } })
        data.date.unshift(date.endOf('day').format('DD-MM'))
        data.data.unshift(user)
      }
      return exits.success({
        code: 0,
        data
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
