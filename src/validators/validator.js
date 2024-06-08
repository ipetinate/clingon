/**
 * Generic function to validate an object against a type map
 *
 * @param {Object} obj - The object to validate
 * @param {Object} typeMap - The type map to validate against
 * @param {boolean} [allowPartial=false] - Whether to allow partial validation
 *
 * @returns {string[]} - Returns an array of error messages, empty if the object is valid.
 */
export function validateObject(obj, typeMap, allowPartial = false) {
  const errors = []

  if (typeof obj !== 'object' || obj === null) {
    errors.push(
      'The provided value is not an object or this identifier not exists inside your meta file.'
    )

    return errors
  }

  for (const key in typeMap) {
    const expectedType = typeMap[key]
    const value = obj[key]

    if (value === undefined) {
      if (!allowPartial) {
        errors.push(`Missing required key: ${key}`)
      }

      continue
    }

    if (typeof expectedType === 'object' && expectedType !== null) {
      const nestedErrors = validateObject(value, expectedType, allowPartial)

      if (nestedErrors.length > 0) {
        errors.push(...nestedErrors.map((e) => `${key}.${e}`))
      }
    } else {
      if (typeof value !== expectedType) {
        errors.push(
          `Expected type '${expectedType}' for key '${key}', but got type '${typeof value}'.`
        )
      }
    }
  }

  return errors
}
