const moment = require('moment')

module.exports = {


  friendlyName: 'Meeting time',


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
      let meetingTime;
      let data = { date: [], data: [] };
      for (let i = 0; i < 10; i++) {
        meetingTime = 0
        if (i > 0) {
          date = date.subtract(1, "days")
        }
        startTime = date.startOf('day').valueOf()
        endTime = date.endOf('day').valueOf()
        let meeting = await Meeting.find({ createdAt: { '>': startTime, '<': endTime }, isClose: 1 })
        for (let j = 0; j < meeting.length; j++) {
          meetingTime += moment(meeting[j].updatedAt).diff(moment(meeting[j].createdAt), 'hours')
        }
        data.date.unshift(date.endOf('day').format('DD-MM'))
        data.data.unshift(meetingTime)
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
