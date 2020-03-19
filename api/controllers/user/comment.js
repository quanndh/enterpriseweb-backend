module.exports = {


  friendlyName: 'Comment',


  description: 'Comment user.',


  inputs: {
    blogId: { type: 'number' },
    content: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { blogId, content } = inputs;
      if (!blogId || !content) {
        return exits.fail({
          code: 1,
          message: "Not enough information"
        })
      }
      let blog = await Blog.findOne(blogId);
      if (!blog) {
        return exits.fail({
          code: 2,
          message: "Blog not found"
        })
      }
      let newComment = await Comment.create({ blogId, content, owner: this.req.user.id }).fetch();

      await ActionLog.create({ owner: this.req.user.id, action: 'Post a new comment' })
      return exits.success({
        code: 0,
        message: "Success",
        data: newComment
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
