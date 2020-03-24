module.exports = {


  friendlyName: 'Get list',


  description: '',


  inputs: {

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let classes = await Class.find({}).populate("tutor")
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].tutor) {
          delete classes[i].tutor.password
        }

        for (let j = 0; j < classes[i].students.length; j++) {
          let student = await User.findOne(classes[i].students[j])
          delete student.password
          classes[i].students[j] = student
        }
        let blogs = await Blog.count({ class: classes[i].id })
        classes[i].blogs = blogs;
        let meetings = await Meeting.count({ classId: classes[i].id })
        classes[i].meetings = meetings
      }
      return exits.success({
        code: 0,
        data: classes
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
