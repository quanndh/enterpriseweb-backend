module.exports = {


  friendlyName: 'Get list student',


  description: '',


  inputs: {
    searchString: { type: 'string' },
    // classId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { searchString } = inputs;
      let query = { role: 4 }
      if (searchString) query.fullName = { 'contains': searchString }
      let users = await User.find(query)
      let availableStudents = [];
      for (let i = 0; i < users.length; i++) {
        let alreadyClass = await Class.find({ students: { "contains": users[i].id }, isActive: 1 })
        if (!alreadyClass.length) availableStudents.push(users[i]);
      }
      // availableStudents = availableStudents.filter(u => !updateClass.students.includes(u.id))
      availableStudents = availableStudents.map(u => {
        delete u.password
        return u
      })
      return exits.success({
        code: 0,
        data: availableStudents
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
