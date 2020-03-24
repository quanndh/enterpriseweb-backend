const moment = require('moment')

module.exports = {


  friendlyName: 'Delete comment',


  description: '',


  inputs: {
    commentId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { commentId } = inputs;
      await Comment.updateOne(commentId).set({
        isDelete: 1
      })
      await ActionLog.create({ owner: this.req.user.id, action: 'Delete a comment' })
      await User.updateOne(this.req.user.id).set({
        lastActivity: moment().valueOf()
      })
      return exits.success({
        code: 0,
        message: 'Comment was successfully deleted'
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
