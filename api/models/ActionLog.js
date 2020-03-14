/**
 * ActionLog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    action: { type: 'string' },
    owner: { model: 'User' },
    role: { type: 'number' }
  },

};

