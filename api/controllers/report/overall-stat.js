module.exports = {


  friendlyName: 'Overall stat',


  description: '',


  inputs: {

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let users = await User.count();
      let classes = await Class.count();
      let meeting = await Meeting.count();
      return exits.success({
        code: 0,
        data: { users, classes, meeting }
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        error
      })
    }

  }


};
