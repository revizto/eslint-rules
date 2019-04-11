# eslint-plugin-revizto

Require label-position for el-form component

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ vue add @vue/cli-plugin-eslint
```

Next, add `eslint-plugin-revizto` to package.json devDependencies:

```
"eslint-plugin-revizto": "git+ssh://git@github.com:revizto/eslint-rules.git#0.1.6",
```

## Usage

Add to the your `.eslintrc`:

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:revizto/recommended',
    '@vue/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
```
