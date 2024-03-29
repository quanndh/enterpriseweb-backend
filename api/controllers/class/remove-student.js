module.exports = {


  friendlyName: 'Remove student',


  description: '',


  inputs: {
    tutorId: { type: 'number' },
    studentId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { tutorId, studentId } = inputs;
      await Class.destroy({ tutor: tutorId, students: { 'contains': studentId } })
      await ActionLog.create({ owner: this.req.user.id, action: `Allocate pair` })
      return exits.success({
        code: 0,
        message: "Allocate successfully"
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
