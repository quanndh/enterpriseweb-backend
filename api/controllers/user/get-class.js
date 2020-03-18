module.exports = {


  friendlyName: 'Get class',


  description: '',


  inputs: {
    userId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { userId } = inputs;
      let userInfo = await User.findOne(userId);
      if (!userInfo) return exits.fail({
        code: 404,
        message: 'User not found'
      })
      let classes;
      if (userInfo.role === 3) classes = await Class.find({ tutor: userInfo.id, isActive: 1 }).populate('tutor')
      else classes = await Class.find({ students: { 'contains': userInfo.id }, isActive: 1 }).populate('tutor')

      for (let i = 0; i < classes.length; i++) {
        let blogs = await Blog.find({ class: classes[i].id });
        classes[i].articles = blogs
      }
      return exits.success({
        code: 0,
        data: classes
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
