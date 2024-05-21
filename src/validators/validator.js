/**
 * Generic function to validate an object against a type map
 *
 * @param {Object} obj - The object to validate
 * @param {Object} typeMap - The type map to validate against
 * @param {boolean} [allowPartial=false] - Whether to allow partial validation
 *
 * @returns {boolean} - Returns true if the object is valid, false otherwise.
 */
export function validateObject(obj, typeMap, allowPartial = false) {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  for (const key in typeMap) {
    const expectedType = typeMap[key]
    const value = obj[key]

    if (value === undefined && allowPartial) {
      continue
    }

    if (typeof expectedType === 'object') {
      if (!validateObject(value, expectedType)) {
        return false
      }
    } else {
      if (typeof value !== expectedType) {
        return false
      }
    }
  }

  return true
}
