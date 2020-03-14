/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  ROLE: {
    ADMIN: 1,
    USER: 2,
    TUTOR: 3,
    STUDENT: 4
  },
  attributes: {
    email: { type: 'string' },
    password: { type: 'string' },
    fullName: { type: 'string' },
    role: { type: 'number' },
    avatar: { type: 'string' },
    phone: { type: 'string' },
    birthYear: { type: 'number' },
    classes: { type: 'json', defaultsTo: [] }
  },

};

