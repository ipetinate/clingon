/**
 * Split a string with `/` and return a array of strings
 *
 * @param {string} path String with `/` to be splited
 * @returns {Array<string>}
 */
export function splitPathString(path) {
  if (!path.includes("/")) {
    throw new Error(
      "Should pass a string with slash separator, like a folder tree path"
    );
  }

  return path.split("/");
}

/**
 * Convert a `boolean` to `string` returning a english representation of true/false as Yes/No
 *
 * @param {boolean} bool Boolean value to be converted as text
 * @returns {string}
 */
export function boolAsText(bool) {
  return bool ? "Yes" : "No";
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
    case "camelCase":
      return convertToCamelCase(inputString);
    case "snake_case":
      return convertToSnakeCase(inputString);
    case "PascalCase":
      return convertToPascalCase(inputString);
    case "kebab-case":
      return convertToKebabCase(inputString);
    default:
      throw new Error("Invalid target pattern.");
  }
}

export function convertToCamelCase(inputString) {
  let words = inputString.split(/[-_]/);

  if (words.length === 1) {
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
  }

  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join("");
}

export function convertToSnakeCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]/g, "_")
    .toLowerCase();
}

export function convertToPascalCase(inputString) {
  return inputString
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toUpperCase());
}

export function convertToKebabCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]/g, "-")
    .toLowerCase();
}
