module.exports = {


  friendlyName: 'Update class',


  description: '',


  inputs: {
    classId: { type: 'number' },
    isActive: { type: 'number' },
    title: { type: 'string' },
    desc: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { classId, title, desc, isActive } = inputs;
      let updatedClass = await Class.updateOne(classId).set({
        title, desc, isActive
      });
      await ActionLog.create({ owner: this.req.user.id, action: `Update class ${updatedClass.title}` })
      return exits.success({
        code: 0,
        message: `Class updated successfully`,
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
