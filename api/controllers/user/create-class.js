module.exports = {


  friendlyName: 'Create class',


  description: '',


  inputs: {
    title: { type: 'string' },
    desc: { type: 'string' },
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { title, desc } = inputs
      if (!title || !desc) return exits.fail({
        code: 1,
        message: 'Not enough information'
      })

      let createdClass = await Class.create({ title, desc }).fetch();
      await ActionLog.create({ owner: this.req.user.id, action: `Create class: "${createdClass.title}"` })
      return exits.success({
        code: 0,
        data: createdClass,
        message: 'New class created'
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
