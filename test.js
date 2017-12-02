const test = require('tape')
const objectifyArray = require('.')

test('basic usage', function (t) {
  var fruits = createFruits()
  var result = objectifyArray(fruits, { by: 'name' })

  t.equal(result.apple.color, 'red', 'keys by name')
  t.equal('banana' in result, false, 'excludes objects with missing the key')
  t.end()
})

test('by key option', function (t) {
  var fruits = createFruits()
  var result = objectifyArray(fruits, { by: 'color' })

  t.equal(result.red.name, 'apple')
  t.equal(result.yellow.id, 'banana')
  t.equal(Array.isArray(result.yellow.ingredients), true, 'is not recursive by default')

  t.deepEqual(
    objectifyArray(fruits),
    objectifyArray(fruits, { by: 'id' }),
    'default should be by id'
  )

  t.deepEqual(
    objectifyArray(fruits),
    objectifyArray(fruits, { by: ['id'] }),
    'default should be by id'
  )
  t.end()
})

test('by array option', function (t) {
  var users = [
    { id: 'u', name: 'Alice' },
    { name: 'Bob' }
  ]

  var result = objectifyArray(users, { by: ['id', 'name'] })
  t.equal(result.u.name, 'Alice', 'supports objectifying by multiple keys')
  t.equal(result.Bob.name, 'Bob', 'supports objectifying by multiple keys')
  t.end()
})

test('recursive option', function (t) {
  var fruits = createFruits()
  var result = objectifyArray(fruits, { by: ['customKeyName', 'id', 'name'], recursive: true })

  t.equal(result.apple.color, 'red')
  t.equal(result.banana.color, 'yellow')
  t.equal(result.banana.ingredients.sugar.taste, 'sugary', 'recursively adds named keys to child objects')
  t.equal(result.banana.ingredients.sugar.types.glucose.commonName, 'grape sugar', 'allows a custom keyName to be specified')
  t.end()
})

//
// Helpers
//
function createFruits () {
  return [{
    name: 'apple',
    color: 'red'
  }, {
    id: 'banana',
    color: 'yellow',
    ingredients: [{
      name: 'sugar',
      taste: 'sugary',
      types: [
        {customKeyName: 'fructose', commonName: 'fruit sugar', name: 'Fruit Sugar', id: 1},
        {customKeyName: 'glucose', commonName: 'grape sugar', name: 'Grape Sugar', id: 2}
      ]
    }, {
      name: 'water',
      taste: 'none'
    }]
  }]
}
