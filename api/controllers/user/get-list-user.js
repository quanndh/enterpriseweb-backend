module.exports = {


  friendlyName: 'Get list user',


  description: '',


  inputs: {
    // skip: { type: "number" },
    // limit: { type: "number" },
    // searchString: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      // let { skip, limit, searchString } = inputs;
      let query = {
        role: { '!=': 1 },
        // fullName: { "contains": searchString ? searchString : "" }
      };

      let users = await User.find(query)
      users = users.map(u => {
        delete u.password
        return u
      })
      for (let i = 0; i < users.length; i++) {
        let messages = await ChatMessage.count({ sender: users[i].id })
        users[i].messages = messages
      }
      // let total = await User.count(query)
      return exits.success({
        code: 0,
        data: users,
        // total
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
