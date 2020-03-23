module.exports = {


  friendlyName: 'Leave',


  description: 'Leave meeting.',


  inputs: {
    meetingId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let req = this.req;
      let res = this.res;
      if (!req.isSocket) {
        return res.badRequest({ status: 'NOT_SOCKET_REQUEST' });
      }
      let { meetingId } = inputs;
      let meeting = await Meeting.findOne(meetingId);
      if (!meeting || meeting.isClose === 1) return exits.fail({
        code: 1,
        message: 'Meeting is not available'
      })
      meeting.participants = meeting.participants.filter(user => user !== this.req.user.id)
      await Meeting.updateOne(meetingId).set({
        participants: meeting.participants
      })
      let online = [];
      let leaveUser = await User.findOne(this.req.user.id);
      delete leaveUser.password

      for (let i = 0; i < meeting.participants.length; i++) {
        let user = await User.findOne(meeting.participants[i])
        delete user.password
        meeting.participants[i] = user
      }
      sails.sockets.blast('leave-meeting', {
        msg: 'leave-meeting',
        data: meeting,
        newUser: leaveUser
      }, req);
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
