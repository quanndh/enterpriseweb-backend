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

      await Class.create({ title, desc })
      return exits.success({
        code: 0,
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
