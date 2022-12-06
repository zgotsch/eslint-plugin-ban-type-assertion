/**
 * @fileoverview An eslint rule to ban certain Typescript type assertions
 * @author Zach Gotsch
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "An eslint rule to ban certain Typescript type assertions",
      recommended: false,
      url: "todo",
    },
    schema: [], // no options
  },
  create: function (context) {
    return {
      // callback functions
    };
  },
};
