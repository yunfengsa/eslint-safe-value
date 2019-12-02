# safe to get value (safe-value)

安全取值警告


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

const a = b.somekey;

```

Examples of **correct** code for this rule:

```js

const a = b && b.somekey;

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
