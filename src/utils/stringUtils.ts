/**
 *
 * This function is to replace a sequence of characters in a string with another one
 *
 * @param string string to format
 * @param replaceThis string to replace
 * @param withThis string to replace with
 * @returns formatted string
 */
export function formatString(
  string: string,
  replaceThis: string,
  withThis: string,
): string {
  return string.split(replaceThis).join(withThis);
}
