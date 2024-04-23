import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import {
  splitPathString,
  boolAsText,
  convertCase,
  convertToCamelCase,
  convertToPascalCase,
  convertToKebabCase,
  convertToSnakeCase,
  capitalizeLetter
} from './string.js'

describe('String Utils', () => {
  describe('splitPathString util', () => {
    it('return a array of string', () => {
      const stringArray = splitPathString('my/path/with/slash')

      const expectedResult = ['my', 'path', 'with', 'slash']

      assert.deepEqual(stringArray, expectedResult)
    })

    it('throw an error when string does not have slashs', () => {
      const expectToThrowError = () => splitPathString('my_path_with_slash')

      assert.throws(expectToThrowError, Error)
    })
  })

  describe('boolAsText util', () => {
    it('return boolean as text, false as No', () => {
      const noCase = boolAsText(false)

      assert.strictEqual(noCase, 'No')
    })

    it('return boolean as text, true as Yes', () => {
      const yesCase = boolAsText(true)

      assert.strictEqual(yesCase, 'Yes')
    })
  })

  describe('convertCase util', () => {
    it('convert a string case: PascalCase -> camelCase', () => {
      const result = convertCase('camelCase', 'CamelCaseString')

      assert.strictEqual(result, 'camelCaseString')
    })

    it('convert a string case: camelCase -> PascalCase', () => {
      const result = convertCase('PascalCase', 'pascalCaseString')

      assert.strictEqual(result, 'PascalCaseString')
    })

    it('convert a string case: PascalCase -> snake_case', () => {
      const result = convertCase('snake_case', 'SnakeCaseString')

      assert.strictEqual(result, 'snake_case_string')
    })

    it('convert a string case: snake_case -> PascalCase', () => {
      const result = convertCase('PascalCase', 'pascal_case_string')

      assert.strictEqual(result, 'PascalCaseString')
    })

    it('convert a string case: PascalCase -> kebab-case', () => {
      const result = convertCase('kebab-case', 'KebabCaseString')

      assert.strictEqual(result, 'kebab-case-string')
    })

    it('convert a string case: kebab-case -> PascalCase', () => {
      const result = convertCase('PascalCase', 'pascal-case-string')

      assert.strictEqual(result, 'PascalCaseString')
    })
  })

  describe('convert case individual utils', () => {
    it('convertToCamelCase', () => {
      assert.strictEqual(convertToCamelCase('kebab-to-camel'), 'kebabToCamel')
      assert.strictEqual(convertToCamelCase('snake_to_camel'), 'snakeToCamel')
      assert.strictEqual(convertToCamelCase('PascalToCamel'), 'pascalToCamel')
      assert.strictEqual(convertToCamelCase('camelToCamel'), 'camelToCamel')
    })

    it('convertToPascalCase', () => {
      assert.strictEqual(convertToPascalCase('kebab-to-pascal'), 'KebabToPascal')
      assert.strictEqual(convertToPascalCase('snake_to_pascal'), 'SnakeToPascal')
      assert.strictEqual(convertToPascalCase('PascalToPascal'), 'PascalToPascal')
      assert.strictEqual(convertToPascalCase('camelToPascal'), 'CamelToPascal')
    })

    it('convertToKebabCase', () => {
      assert.strictEqual(convertToKebabCase('kebab-to-kebab'), 'kebab-to-kebab')
      assert.strictEqual(convertToKebabCase('snake_to_kebab'), 'snake-to-kebab')
      assert.strictEqual(convertToKebabCase('PascalToKebab'), 'pascal-to-kebab')
      assert.strictEqual(convertToKebabCase('camelToKebab'), 'camel-to-kebab')
    })

    it('convertToSnakeCase', () => {
      assert.strictEqual(convertToSnakeCase('kebab-to-snake'), 'kebab_to_snake')
      assert.strictEqual(convertToSnakeCase('snake_to_snake'), 'snake_to_snake')
      assert.strictEqual(convertToSnakeCase('PascalToSnake'), 'pascal_to_snake')
      assert.strictEqual(convertToSnakeCase('camelToSnake'), 'camel_to_snake')
    })
  })

  describe('capitalizeLetter', () => {
    it('capitalize only first letter on a word with defaults (implicit target)', () => {
      const linuxCreatorName = 'linus torvalds'

      const result = capitalizeLetter(linuxCreatorName)

      assert.strictEqual(result, 'Linus torvalds')
    })

    it('capitalize only first letter on a word with explicit target param', () => {
      const linuxCreatorName = 'linus torvalds'

      const result = capitalizeLetter(linuxCreatorName, 'first_letter')

      assert.strictEqual(result, 'Linus torvalds')
    })

    it('capitalize all first letter occurences after a space on a word', () => {
      const linuxCreatorName = 'linus torvalds'

      const result = capitalizeLetter(linuxCreatorName, 'all', ' ')

      assert.strictEqual(result, 'Linus Torvalds')
    })

    it('capitalize all first letter occurences after a space on a word with multiple words', () => {
      const linuxCreatorName = 'linus torvalds creator of linux kernel'

      const result = capitalizeLetter(linuxCreatorName, 'all', ' ')

      assert.strictEqual(result, 'Linus Torvalds Creator Of Linux Kernel')
    })

    it('capitalize all first letter occurences after a space on a word with multiple words with comma', () => {
      const linuxCreatorName = 'linus,torvalds,creator,of,linux,kernel'

      const result = capitalizeLetter(linuxCreatorName, 'all', ',')

      assert.strictEqual(result, 'Linus,Torvalds,Creator,Of,Linux,Kernel')
    })
  })
})
