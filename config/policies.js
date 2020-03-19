/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'bearer',
  'user/login': true,
  "user/create-user": ['bearer', 'isAdmin'],
  'user/get-list-user': ['bearer', 'isAdmin'],
  'user/assign-user-to-class': ['bearer', 'isAdmin'],
  'file/download-file': true
};
