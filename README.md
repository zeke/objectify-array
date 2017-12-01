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

var peopleMap = objectifyArray(people)
```

This will return an object, using the `id` property values as keys:

```js
{
  bob: { id: 'bob', fullName: 'Bob Bobberson' },
  sue: { id: 'sue', fullName: 'Sue Zinn' },
  hal: { id: 'hal', fullName: 'Hal Itosis'}
}
```

`id` is the default property name to index by. If you want to use another property,
specify it as an optional second argument:

```js
var peopleMap = objectifyArray(people, 'myCustomKeyName')
```

You can also specify multiple key names as an array, which are tried in the order you provide them.
This is most useful when you use the `recursive` option:

```js
var todos = [
  {
    id: 10,
    description: 'Learn Things',
    tags: [
      { name: 'a', score: 15 }, { name: 'b', score: 83 }
    ]
  },
  {
    id: 20,
    description: 'Do Things',
    tags: [
      { name: 'x', score: 3 }, { name: 'y', score: 9 }
    ]
  },
]
var todosMap = objectifyArray(todos, ['id', 'name'], { recursive: true })

todosMap[10] //=> { id: 10, description: ..., tags: ... }
todosMap[20] //=> { id: 10, description: ..., tags: ... }

todosMap[10].tags.a.score //=> 15
todosMap[10].tags.b.score //=> 83
```

For more extensive usage examples, see [test.js](test.js)

## API

The module exports a single function:

#### `objectifyArray(array[, keyNames[, options]])`

* `array` Array - The array of objects to index.
* `keyNames` String | Array (Optional) - They key(s) to index by.
* `options` Object (optional) - `{ recursive: Boolean }`

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
