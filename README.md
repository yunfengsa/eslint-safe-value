# eslint-plugin-dxymom

dxy-mom plugin

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-dxymom`:

```
$ npm install eslint-plugin-dxymom --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-dxymom` globally.

## Usage

Add `dxymom` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-plugin-dxymom"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "dxymom/safe-value": "warn
    }
}
```

## Supported Rules

* safe-value: 安全取值警告





