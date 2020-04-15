/**
 * Class.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    students: { type: 'json', defaultsTo: [] },
    tutor: {
      model: 'User'
    },
    isActive: { type: 'number', defaultsTo: 1 },
    title: { type: 'string' },
    desc: { type: 'string' },
    meeting: { model: 'Meeting' }
  },

};

