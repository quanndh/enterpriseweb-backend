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

      let blogs = await Blog.find({ class: classId, isDelete: 0 }).sort('createdAt DESC').populate('owner')

      for (let i = 0; i < blogs.length; i++) {
        let comments = await Comment.find({ blogId: blogs[i].id, isDelete: 0 }).sort('createdAt DESC').populate('owner')
        delete blogs[i].owner.password;
        comments = comments.map(c => {
          delete c.owner.password
          return c
        })
        comments.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
        blogs[i].comments = comments;
        if (blogs[i].file.length) {
          for (let j = 0; j < blogs[i].file.length; j++) {
            let file = await FileUpload.findOne({ serverFileName: blogs[i].file[j] })
            file.fullPath = 'http://localhost:1337/other/' + file.serverFileName
            delete file.size;
            delete file.fileType;
            delete file.status;
            blogs[i].file[j] = file;
          }
        }
      }
      classInfo.blogs = blogs;

      if (classInfo.meeting) {
        let meeting = await Meeting.findOne({ id: classInfo.meeting, isClose: 0 });
        for (let i = 0; i < meeting.participants.length; i++) {
          let user = await User.findOne(meeting.participants[i])
          delete user.password
          meeting.participants[i] = user
        }
        classInfo.meeting = meeting;
      } else {
        classInfo.meeting = {}
      }

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
