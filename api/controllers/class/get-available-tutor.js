module.exports = {


  friendlyName: 'Get available tutor',


  description: '',


  inputs: {
    classId: { type: 'number' },
    tutorName: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { classId, tutorName } = inputs;
      let updateClass = await Class.findOne(classId)
      let tutors = await User.find({ role: 3, fullName: { 'contains': tutorName } })
      tutors = tutors.filter(t => t.id !== updateClass.tutor)
      tutors = tutors.map(t => {
        delete t.password;
        return t;
      })
      return exits.success({
        code: 0,
        data: tutors
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
