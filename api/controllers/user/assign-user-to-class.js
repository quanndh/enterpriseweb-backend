module.exports = {


  friendlyName: 'Assign user to class',


  description: '',


  inputs: {
    userId: { type: 'number' },
    classId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { userId, classId } = inputs;

      let assignClass = await Class.findOne(classId).populate('tutor')
      let user = await User.findOne(userId)

      if (user.role === 1) return exits.fail({
        code: 3,
        message: 'Invalid user to assign'
      })

      if (user.isHigher) {
        if (assignClass.tutor === user.id) {
          return exits.fail({
            code: 1,
            message: 'Tutor already in this class'
          })
        } else {
          await Class.updateOne(classId).set({
            tutor: userId
          })
        }
      } else {
        if (assignClass.students.includes(userId)) {
          return exits.fail({
            code: 1,
            message: 'Student already in this class'
          })
        } else {
          let students = assignClass.students;
          students.push(userId)
          await Class.updateOne(classId).set({
            students
          })
        }
      }

      let data = {
        email: user.email,
        class: assignClass.title,
        classId: assignClass.id
      }

      await sails.helpers.common.sendMail(data)

      return exits.success({
        code: 0,
        message: 'Class has been successfully updated'
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
