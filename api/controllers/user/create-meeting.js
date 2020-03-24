const moment = require('moment')

module.exports = {


  friendlyName: 'Create meeting',


  description: '',


  inputs: {
    classId: { type: 'number' },
    title: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { classId, title } = inputs;
      let classInfo = await Class.findOne(classId);
      if (classInfo.meeting) return exits.fail({
        code: 1,
        message: 'Class already has meeting'
      })
      let meeting = await Meeting.create({ creater: this.req.user.id, classId, title }).fetch();
      await Class.updateOne(classId).set({
        meeting: meeting.id
      })
      await ActionLog.create({ owner: this.req.user.id, action: "Open a meeting" })
      await User.updateOne(this.req.user.id).set({
        lastActivity: moment().valueOf()
      })
      return exits.success({
        code: 0,
        message: 'Meeting created',
        data: meeting
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
