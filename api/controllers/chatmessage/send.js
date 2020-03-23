module.exports = {


  friendlyName: 'Send',


  description: 'Send chatmessage.',


  inputs: {
    content: { type: 'string' },
    sender: { type: 'number' },
    meeting: { type: 'number' }
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

      let { content, sender, meeting } = inputs;
      let newMessage = await ChatMessage.create({ content, sender, meeting }).fetch();
      let message = await ChatMessage.findOne(newMessage.id).populate('sender')
      delete message.sender.password
      sails.sockets.blast('message', {
        msg: 'new message',
        data: message
      }, req);

      return exits.success({ code: 0, data: message });
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        err: error
      })
    }



  }


};
