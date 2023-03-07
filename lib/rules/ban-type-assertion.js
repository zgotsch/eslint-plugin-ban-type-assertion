/**
 * @fileoverview An eslint rule to ban certain Typescript type assertions
 * @author Zach Gotsch
 */

"use strict";

const bannedTypeSchema = {
  type: "object",
  properties: {
    typeName: {
      type: "string",
    },
    message: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: ["typeName"],
};

function checkNode(ruleMap, context, node) {
  const {
    typeAnnotation: {typeName},
  } = node;

  if (typeName == null) {
    return;
  }

  if (typeName.type === "Identifier") {
    if (ruleMap.has(typeName.name)) {
      const message =
        ruleMap.get(typeName.name) ?? `Coercion to the type "${typeName.name}" is banned.`;
      context.report({node, message});
      return;
    }
  }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "An eslint rule to ban certain Typescript type assertions",
      recommended: false,
      url: "https://github.com/zgotsch/eslint-plugin-ban-type-assertion/blob/main/docs/rules/ban-type-assertion.md",
    },
    schema: {
      type: "array",
      minLength: 1,
      uniqueItems: true,
      items: bannedTypeSchema,
    },
  },
  create: function (context) {
    const rules = context.options;
    const ruleMap = rules.reduce((acc, rule) => {
      return acc.set(rule.typeName, rule.message ?? null);
    }, new Map());

    return {
      TSTypeAssertion(node) {
        checkNode(ruleMap, context, node);
      },
      TSAsExpression(node) {
        checkNode(ruleMap, context, node);
      },
    };
  },
};
