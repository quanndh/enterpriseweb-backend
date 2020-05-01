module.exports = {


  friendlyName: 'Assign user to class',


  description: '',


  inputs: {
    students: { type: 'ref' },
    // classId: { type: 'number' },
    tutorId: { type: 'number' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { tutorId, students } = inputs;

      let tutorInfo = await User.findOne(tutorId);
      let studentList = "";
      let studentMail = [];

      for (let i = 0; i < students.length; i++) {
        let studentInfo = await User.findOne(students[i])
        studentList += `<li>${studentInfo.fullName} - ${studentInfo.email}</li>`
        studentMail.push(studentInfo.email)
        await Class.create({
          title: `Guild from ${tutorInfo.fullName}`,
          desc: `Place for ${studentInfo.fullName} discuss with tutor`,
          tutor: tutorId,
          students: [students[i]],
          isActive: 1
        })
      }

      let data = {
        email: tutorInfo.email,
        subject: "New student assigned",
        content: `
          <p>Dear mr/mrs,</p>
          <p>We want to inform you that you are assigned to ${students.length} new students.</p>
          <ul>${studentList}</ul>
         `
      }

      await ActionLog.create({ owner: this.req.user.id, action: `Assign new student to tutor: ${tutorInfo.fullName}`, role: this.req.user.role })
      if(process.env.NODE_ENV !== "production"){
        sails.helpers.common.sendMail(data)

        data = {
          email: studentMail,
          subject: "New tutor assigned",
          content: `
          <p>Dear mr/mrs,</p>
          <p>We want to inform you that you are assigned to new tutor: ${tutorInfo.fullName} - ${tutorInfo.email}.</p>
         `
        }
        sails.helpers.common.sendMail(data)
      }
    
      return exits.success({
        code: 0,
        message: 'Allcation has been successfully applied',
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        error: error
      })
    }

  }


};
