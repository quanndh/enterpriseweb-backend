module.exports = {


  friendlyName: 'Create blog',


  description: '',


  inputs: {
    content: { type: 'string' },
    file: { type: 'ref' },
    image: { type: 'ref' },
    classId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { content, file, image, classId } = inputs;
      if (!content || content === "") return exits.fail({
        code: 1,
        message: 'Content required'
      })
      let classInfo = await Class.findOne(classId)
      let newBlog = {
        owner: this.req.user.id,
        content,
        file: file ? file : [],
        image: image ? image : [],
        class: classId
      }
      let blog = await Blog.create(newBlog).fetch()
      blog = await Blog.findOne(blog.id).populate('owner')

      if (blog.file.length) {
        for (let j = 0; j < blog.file.length; j++) {
          let file = await FileUpload.findOne({ serverFileName: blog.file[j] })
          file.fullPath = 'http://localhost:1337/other/' + file.serverFileName
          delete file.size;
          delete file.fileType;
          delete file.status;
          blog.file[j] = file;
        }
      }

      let comments = await Comment.find({ blogId: blog.id }).sort('createdAt DESC').populate('owner')
      delete blog.owner.password;
      comments = comments.map(c => {
        delete c.owner.password
        return c
      })
      blog.comments = comments;

      await ActionLog.create({ owner: this.req.user.id, action: 'Create a new post in ' + classInfo.title })
      return exits.success({
        code: 0,
        message: 'Blog created successfully',
        data: blog
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
