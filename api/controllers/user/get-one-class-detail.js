module.exports = {


  friendlyName: 'Get one class detail',


  description: '',


  inputs: {
    classId: { type: 'number' },
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { classId } = inputs;
      let classInfo = await Class.findOne(classId).populate('tutor');
      delete classInfo.tutor.password;

      for (let i = 0; i < classInfo.students.length; i++) {
        let student = await User.findOne(classInfo.students[i])
        delete student.password;
        classInfo.students[i] = student
      }

      let blogs = await Blog.find({ class: classId }).sort('createdAt DESC').populate('owner')

      for (let i = 0; i < blogs.length; i++) {
        let comments = await Comment.find({ blogId: blogs[i].id }).sort('createdAt DESC').populate('owner')
        delete blogs[i].owner.password;
        comments = comments.map(c => {
          delete c.owner.password
          return c
        })
        blogs[i].comments = comments;
        if (blogs[i].file.length) {
          for (let j = 0; j < blogs[i].file.length; j++) {
            let file = await FileUpload.findOne({ serverFileName: blogs[i].file[j] })
            delete file.size;
            delete file.fileType;
            delete file.status;
            blogs[i].file[j] = file;
          }
        }
      }
      classInfo.blogs = blogs;

      return exits.success({
        code: 0,
        data: classInfo
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
