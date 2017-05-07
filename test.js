const test = require('tape')
const objectifyArray = require('.')

test('objectifyArray', function (t) {
  var fruits = [{
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

  t.comment('addKeys')
  fruits = objectifyArray(fruits, 'customKeyName')
  t.equal(fruits.apple.color, 'red', 'supports `name` as an object key')
  t.equal(fruits.banana.color, 'yellow', 'supports `id` as an object key')
  t.equal(fruits.banana.ingredients.sugar.taste, 'sugary', 'recursively adds named keys to child objects')
  t.equal(fruits.banana.ingredients.sugar.types.glucose.commonName, 'grape sugar', 'allows a custom keyName to be specified')
  t.end()
})
