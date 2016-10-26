# objectify-array [![Build Status](https://travis-ci.org/zeke/objectify-array.svg?branch=master)](https://travis-ci.org/zeke/objectify-array)

Recursively convert arrays of objects into a single keyed object tree

## Installation

```sh
npm install objectify-array --save
```

or

```sh
yarn add objectify-array
```

## Usage

```js
const objectifyArray = require('objectify-array')

var people = [
  {id: 'bob', fullName: 'Bob Bobberson'},
  {id: 'sue', fullName: 'Sue Zinn'},
  {id: 'hal', fullName: 'Hal Itosis'}
]

var tree = objectifyArray(people)
```

This will return an object, using the `id` property values as keys:

```js
{
  bob: { id: 'bob', fullName: 'Bob Bobberson' },
  sue: { id: 'sue', fullName: 'Sue Zinn' },
  hal: { id: 'hal', fullName: 'Hal Itosis'}
}
```

`id` and `name` are supported by default. If you want to use another property,
specify it as an optional second argument:

```js
var tree = objectifyArray(people, 'myCustomKeyName')
```

If your array contains nested arrays of objects, those are objectified too!
For more extensive usage examples, see [test.js](test.js)

## API

The module exports a single function:

#### `objectifyArray(array[, keyName])`

* `array` Array
* `keyName` String (optional) - A property other than `id` or `name` to use for the object keys.

## Tests

```sh
npm i && npm t
```

## Dependencies

None

## Dev Dependencies

- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers

## License

MIT
