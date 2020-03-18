module.exports = {


  friendlyName: 'Remove student',


  description: '',


  inputs: {
    classId: { type: 'number' },
    studentId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { classId, studentId } = inputs;
      let updateClass = await Class.findOne(classId);
      for (let i = 0; i < updateClass.students.length; i++) {
        if (updateClass.students[i] === studentId) {
          updateClass.students.splice(i, 1);
          break;
        }
      }

      let student = await User.findOne(studentId);
      await User.updateOne(studentId).set({
        classes: student.classes.filter(c => c !== classId)
      })

      await Class.updateOne(classId).set({
        students: updateClass.students
      })
      await ActionLog.create({ owner: this.req.user.id, action: `Remove ${student.fullName} from class ${updateClass.title}` })
      return exits.success({
        code: 0,
        message: "Class update successfully"
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
