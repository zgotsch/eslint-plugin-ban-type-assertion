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

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "An eslint rule to ban certain Typescript type assertions",
      recommended: false,
      url: "https://github.com/eslint-plugin-ban-type-assertion/docs/rules/ban-type-assertion.md",
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
        const {
          typeAnnotation: {typeName},
        } = node;

        if (typeName.type === "Identifier") {
          if (ruleMap.has(typeName.name)) {
            const message = ruleMap.get(typeName.name) ?? "Coercion to this type is banned.";
            context.report({node, message});
            return;
          }
        }
      },
      TSAsExpression(node) {
        const {
          typeAnnotation: {typeName},
        } = node;

        if (typeName.type === "Identifier") {
          if (ruleMap.has(typeName.name)) {
            const message = ruleMap.get(typeName.name) ?? "Coercion to this type is banned.";
            context.report({node, message});
            return;
          }
        }
      },
    };
  },
};
