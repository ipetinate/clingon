/**
 * Split a string with `/` and return a array of strings
 *
 * @param {string} path String with `/` to be splited
 * @returns {Array<string>}
 */
export function splitPathString(path) {
  if (!path.includes('/')) {
    throw new Error('Should pass a string with slash separator, like a folder tree path')
  }

  return path.split('/')
}

/**
 * Convert a `boolean` to `string` returning a english representation of true/false as Yes/No
 *
 * @param {boolean} bool Boolean value to be converted as text
 * @returns {string}
 */
export function boolAsText(bool) {
  return bool ? 'Yes' : 'No'
}

/**
 * Convert a specific case to target case, e.g "MyResource" to "my_resource"
 *
 * @param {"camelCase" | "snake_case" | "PascalCase" | "kebab-case"} targetPattern Case target
 * @param {string} inputString - String to be converted
 * @returns {string}
 */
export function convertCase(targetPattern, inputString) {
  switch (targetPattern) {
    case 'camelCase':
      return convertToCamelCase(inputString)
    case 'snake_case':
      return convertToSnakeCase(inputString)
    case 'PascalCase':
      return convertToPascalCase(inputString)
    case 'kebab-case':
      return convertToKebabCase(inputString)
    default:
      throw new Error('Invalid target pattern.')
  }
}

/**
 * Convert a string on any case to a camelCase
 *
 * @param {string} inputString String to be converted
 * @returns {string}
 */
export function convertToCamelCase(inputString) {
  let words = inputString.split(/[-_]/)

  if (words.length === 1) {
    return inputString.charAt(0).toLowerCase() + inputString.slice(1)
  }

  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
  }

  return words.join('')
}

/**
 * Convert a string on any case to a snake_case
 *
 * @param {string} inputString String to be converted
 * @returns {string}
 */
export function convertToSnakeCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]/g, '_')
    .toLowerCase()
}

/**
 * Convert a string on any case to a PascalCase
 *
 * @param {string} inputString String to be converted
 * @returns {string}
 */
export function convertToPascalCase(inputString) {
  return inputString
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toUpperCase())
}

/**
 * Convert a string on any case to a kebab-case
 *
 * @param {string} inputString String to be converted
 * @returns {string}
 */
export function convertToKebabCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]/g, '-')
    .toLowerCase()
}

/**
 * Capitalize a string first letter of entire word or all occurrences after a pattern
 *
 * @param {string} text Original text to be capitalized
 * @param {"first_letter" | "all"} target Target of capitalization, can be only first letter or all letters after a separator
 * @param {string | RegExp} separator Separator pattern to split word and capitalize first occurence
 * @returns {string}
 */
export function capitalizeLetter(text, target = 'first_letter', separator) {
  if (target === 'all') {
    const words = text.split(new RegExp(separator))
    const capitalizedWordsArray = words.map((word) => capitalizeLetter(word))
    const capitalizedWordsString = capitalizedWordsArray.join(separator)

    return capitalizedWordsString
  }

  const firstLetter = text.charAt(0).toUpperCase()
  const remainingLetters = text.slice(1)

  const mergedText = firstLetter + remainingLetters

  return mergedText
}
