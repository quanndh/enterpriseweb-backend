module.exports = {


  friendlyName: 'Get available tutor',


  description: '',


  inputs: {
    classId: { type: 'number' },
    tutorName: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {

      let tutors = await User.find({ role: 3 })
      for (let i = 0; i < tutors.length; i++) {
        tutors[i].meetings = 0;
        let messages = await ChatMessage.count({ sender: tutors[i].id })
        tutors[i].messages = messages

        let pairs = await Class.find({ tutor: tutors[i].id })
        tutors[i].students = [];

        for (let j = 0; j < pairs.length; j++) {
          let studentInfo = await User.findOne(pairs[j].students[0])
          let pairMeeting = await Meeting.count({ classId: pairs[j].id })
          tutors[i].meetings += pairMeeting;
          delete studentInfo.password
          tutors[i].students.push(studentInfo)
        }
      }
      tutors = tutors.map(t => {
        delete t.password;
        return t;
      })
      return exits.success({
        code: 0,
        data: tutors
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
