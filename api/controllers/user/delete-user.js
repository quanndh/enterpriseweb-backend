module.exports = {


  friendlyName: 'Delete user',


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
      let classes = await Class.find({
        or: [
          { tutor: userId },
          { students: { contains: userId } }
        ]
      })

      for (let i = 0; i < classes.length; i++) {
        if (classes[i].tutor === userId) {
          await Class.updateOne(classes[i].id).set({
            tutor: null
          })
        } else {
          let userIndex = classes[i].students.indexOf(userId);
          classes[i].students.splice(userIndex, 1)
          await Class.updateOne(classes[i].id).set({
            students: classes[i].students
          })
        }
      }

      await User.destroyOne(userId)
      return exits.success({
        code: 0,
        message: "User deleted successfully"
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }


  }


};
