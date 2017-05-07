'use strict'

module.exports = function objectifyArray (array, keyName) {
  if (!Array.isArray(array)) return array

  var object = {}

  array.forEach(element => {
    var identifier = element[keyName] || element.name || element.id
    if (!identifier) return

    if (element && typeof element === 'object') {
      object[identifier] = {}
      Object.keys(element).forEach(function (e) {
        object[identifier][e] = objectifyArray(element[e], keyName)
      })
    } else {
      object[identifier] = element
    }
  })

  return object
}
