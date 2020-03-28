module.exports = {


  friendlyName: 'Join',


  description: 'Join calling.',


  inputs: {
    meetingId: { type: 'number' },
    data: { type: 'ref' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let req = this.req, res = this.res;
      if (!req.isSocket) {
        return res.badRequest();
      }
      let { meetingId, data } = inputs;
      let meetingInfo = await Meeting.findOne(meetingId);
      meetingInfo.peers.push({ userId: this.req.user.id, data })
      await Meeting.updateOne(meetingId).set({
        peers: meetingInfo.peers
      })
      sails.sockets.blast('calling', {
        msg: 'calling',
        data: {
          userId: this.req.user.id,
          meetingId,
          peers: meetingInfo.peers
        }
      }, req);
      return exits.success({
        code: 0,
        message: 'Called',
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
