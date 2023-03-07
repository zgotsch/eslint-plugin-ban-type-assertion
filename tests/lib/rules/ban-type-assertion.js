"use strict";

const rule = require("../../../lib/rules/ban-type-assertion"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {ecmaVersion: "latest"},
});

ruleTester.run("ban-type-assertion", rule, {
  valid: [
    {
      code: 'const foo = "foo" as Foo',
      options: [{typeName: "BannedType"}],
    },
    {
      code: 'const foo = "foo" as AllowedType',
      options: [
        {typeName: "BannedType", message: "This is a message about not using BannedType coercion."},
      ],
    },
    {
      code: 'const foo = <AllowedType>"foo"',
      options: [{typeName: "BannedType"}],
    },
    {
      code: 'const foo = <AllowedType>"foo"',
      options: [
        {typeName: "BannedType", message: "This is a message about not using BannedType coercion."},
      ],
    },
    {
      code: 'const foo = "foo" as AllowedTypeWithTwoBans',
      options: [{typeName: "BannedType"}, {typeName: "Baz"}],
    },
    {
      code: 'const foo = "foo" as AllowedTypeWithNoBans',
      options: [],
    },
  ],

  invalid: [
    {
      code: 'const foo = "foo" as BannedType',
      options: [{typeName: "BannedType"}],
      errors: [{message: "Coercion to this type is banned."}],
    },
    {
      code: 'const foo = "foo" as BannedType',
      options: [
        {typeName: "BannedType", message: "This is a message about not using BannedType coercion."},
      ],
      errors: [{message: "This is a message about not using BannedType coercion."}],
    },
    {
      code: 'const foo = <BannedType>"foo"',
      options: [{typeName: "BannedType"}],
      errors: [{message: "Coercion to this type is banned."}],
    },
    {
      code: 'const foo = <BannedType>"foo"',
      options: [
        {typeName: "BannedType", message: "This is a message about not using BannedType coercion."},
      ],
      errors: [{message: "This is a message about not using BannedType coercion."}],
    },
    {
      code: 'const foo = "foo" as SecondBannedType',
      options: [
        {typeName: "BannedType", message: "This is a message about not using BannedType coercion."},
        {typeName: "SecondBannedType", message: "Second message"},
      ],
      errors: [{message: "Second message"}],
    },
  ],
});
