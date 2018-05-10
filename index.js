'use strict'

module.exports = function objectifyArray (array, options) {
  if (!Array.isArray(array)) return array

  if (!options) {
    options = {by: ['id']}
  }

  if (!options.by) {
    options.by = ['id']
  } else if (typeof options.by === 'string') {
    options.by = [options.by]
  }

  var by = options.by
  var recursive = !!(options && options.recursive)

  var result = {}

  array.forEach(function (element) {
    var identifier
    if (Array.isArray(by)) {
      for (var i = 0; i < by.length; i++) {
        if (element.hasOwnProperty(by[i])) {
          identifier = element[by[i]]
          break
        }
      }
    } else {
      identifier = by(element)
    }

    if (!identifier) return

    result[identifier] = element

    if (recursive && typeof element === 'object') {
      result[identifier] = {}
      Object.keys(element).forEach(function (e) {
        result[identifier][e] = objectifyArray(element[e], options)
      })
    }
  })

  return result
}
