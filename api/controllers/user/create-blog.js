module.exports = {


  friendlyName: 'Create blog',


  description: '',


  inputs: {
    content: { type: 'string' },
    file: { type: 'ref' },
    image: { type: 'ref' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { content, file, image } = inputs;
      if (!content || content === "") return exits.fail({
        code: 1,
        message: 'Content required'
      })
      let newBlog = {
        owner: this.req.user.id,
        content,
        file: file ? file : [],
        image: image ? image : []
      }
      await Blog.create(newBlog)
      return exits.success({
        code: 0,
        message: 'Blog created successfully'
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
