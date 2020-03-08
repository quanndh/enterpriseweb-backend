const bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Check',


  description: 'Check password.',


  inputs: {
    password: { type: 'string', required: true },
    hashPassword: { type: 'string', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let { password, hashPassword } = inputs;
    let a = await bcrypt.compare(password, hashPassword)
    return a;
  }


};

