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
  },
  isHigher: {
    FALSE: 0,
    TRUE: 1
  },
  attributes: {
    email: { type: 'string' },
    password: { type: 'string' },
    fullName: { type: 'string' },
    role: { type: 'number' },
    isHigher: { type: 'number' },
  },

};

