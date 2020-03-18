module.exports = {


  friendlyName: 'Get list student',


  description: '',


  inputs: {
    searchString: { type: 'string' },
    classId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { searchString, classId } = inputs;
      let query = { role: 4 }
      if (searchString) query.fullName = { 'contains': searchString }
      let users = await User.find(query)
      let updateClass = await Class.findOne(classId)
      users = users.filter(u => !updateClass.students.includes(u.id))
      users = users.map(u => {
        delete u.password
        return u
      })
      return exits.success({
        code: 0,
        data: users
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
