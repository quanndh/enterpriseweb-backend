/**
 * Meeting.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: { type: 'string' },
    classId: { model: 'Class' },
    participants: { type: 'json', defaultsTo: [] },
    isClose: { type: 'number', defaultsTo: 0 },
    creater: { model: 'User' },
    peers: { type: 'json', defaultsTo: [] }
  },

};

