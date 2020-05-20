const bcrypt = require('bcryptjs');
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
  sync: true,
  fn: function (inputs) {
    let { password, hashPassword } = inputs;
    return bcrypt.compareSync(password.toString(), hashPassword.toString())
  }
};

