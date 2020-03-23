module.exports = {


  friendlyName: 'Join meeting',


  description: '',


  inputs: {
    meetingId: { type: "number" }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

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
    if (meeting.participants.includes(this.req.user.id)) {
      for (let i = 0; i < meeting.participants.length; i++) {
        let user = await User.findOne(meeting.participants[i])
        delete user.password
        meeting.participants[i] = user
      }
      return exits.success({
        code: 0,
        message: 'Joined meeting',
        data: meeting
      })
    }
    meeting.participants.push(this.req.user.id)
    let updatedMeeting = await Meeting.updateOne(meetingId).set({
      participants: meeting.participants
    })

    for (let i = 0; i < updatedMeeting.participants.length; i++) {
      let user = await User.findOne(updatedMeeting.participants[i])
      delete user.password
      updatedMeeting.participants[i] = user
    }

    let joinUser = await User.findOne(this.req.user.id);
    delete joinUser.password
    sails.sockets.blast('join-meeting', {
      msg: 'join-meeting',
      data: updatedMeeting,
      newUser: joinUser
    }, req);

    await ActionLog.create({ owner: this.req.user.id, action: 'Join meeting ' + meeting.title });
    return exits.success({
      code: 0,
      message: 'Joined meeting',
      data: updatedMeeting
    })

  }


};
