/**
 * Compose multiple functions, passing last argument to the next function
 *
 * @typedef {(lastResult) => any} Functions
 * @param  {...Functions} fns All functions to be composed on a pipeline execution
 * @returns {unknown} Returns is based on last execution function returns
 */
export function compose(...fns) {
  let result

  fns.forEach((fn, index) =>
    index === 0 ? (result = fn()) : (result = fn(result))
  )

  return result
}
