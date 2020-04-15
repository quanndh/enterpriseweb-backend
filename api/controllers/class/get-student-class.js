module.exports = {


  friendlyName: 'Get student class',


  description: '',


  inputs: {

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let classInfo = await Class.findOne({ students: { "contains": this.req.user.id }, isActive: 1 })
      return exits.success({
        code: 0,
        data: classInfo.id
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }
  }
};
