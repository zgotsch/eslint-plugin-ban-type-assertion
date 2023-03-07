# Ban specified Typescript type assertions (`as MyType` and `<MyType>`) (`ban-type-assertion`)

Allow type assertions to certain types to be banned. Built-in types may not be banned.

## Rule Details

This rule allows you to specify a list of types that you don't want to be used as type assertions.

These examples assume that the following configuration is specified:

```json
{
    "rules": {
        "ban-type-assertion": ["error", {"typeName": "BannedType", "message": "Do not coerce to BannedType. Instead use the constructor createBannedType"}, {"typeName": "AnotherBannedType"}']
    }
}
```

Examples of **incorrect** code for this rule:

```typescript
const x = foo as BannedType;
```

```typescript
const x = <BannedType>foo;
```

Examples of **correct** code for this rule:

```typescript
const x = foo as AllowedType;
```

```typescript
const x = <AllowedType>foo;
```

```typescript
// Built-in types may not be banned
const x = foo as string;
```

## Options

This rule takes an array of objects with the following properties:

- `typeName`: The name of the type to ban.
- `message`: The message to display when the type is banned. This property is optional.
