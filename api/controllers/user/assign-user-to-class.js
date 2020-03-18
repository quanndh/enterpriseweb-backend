module.exports = {


  friendlyName: 'Assign user to class',


  description: '',


  inputs: {
    students: { type: 'ref' },
    classId: { type: 'number' },
    tutorId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { tutorId, classId, students } = inputs;

      let assignClass = await Class.findOne(classId).populate('tutor')
      let tutor;
      let updatedClass;
      if (tutorId) {
        tutor = await User.findOne(tutorId)

        updatedClass = await Class.updateOne(classId).set({
          tutor: tutor.id
        })
      }

      let studentEmails = [];
      if (students) {
        students = students.filter(s => !assignClass.students.includes(s));
        let updateStudents = await User.find({ id: { 'in': students } });
        for (let i = 0; i < updateStudents.length; i++) {
          studentEmails.push(updateStudents[i].email)
        }
        assignClass.students = assignClass.students.concat(students);
        updatedClass = await Class.updateOne(classId).set({
          students: assignClass.students
        })
      }

      let url = `http://localhost:3000/classes/${updatedClass.id}`

      let data = {
        email: tutorId ? tutor.email : studentEmails,
        subject: "New assigned class",
        content: `
          <p>Dear mr/mrs,</p>
          <p>We want to inform you that you are now assigned to class <strong>${updatedClass.title}</strong>.</p>
          <p>Link to your class: <a href="${url}">${url}</a></p>
         `
      }

      await ActionLog.create({ owner: this.req.user.id, action: `Assign new people to class ${updatedClass.title}`, role: this.req.user.role })
      await sails.helpers.common.sendMail(data)

      return exits.success({
        code: 0,
        message: 'Class has been successfully updated',
        data: updatedClass
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
