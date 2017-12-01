'use strict'

module.exports = function objectifyArray (array, keys, options) {
  if (!Array.isArray(array)) return array

  if (!keys) {
    keys = ['id']
  } else if (typeof keys === 'string') {
    keys = [keys]
  }

  var recursive = !!(options && options.recursive)

  var result = {}

  array.forEach(function (element) {
    var identifier

    for (var i = 0; i < keys.length; i++) {
      if (element.hasOwnProperty(keys[i])) {
        identifier = element[keys[i]]
        break
      }
    }

    if (!identifier) return

    result[identifier] = element

    if (recursive && typeof element === 'object') {
      result[identifier] = {}
      Object.keys(element).forEach(function (e) {
        result[identifier][e] = objectifyArray(element[e], keys, options)
      })
    }
  })

  return result
}
