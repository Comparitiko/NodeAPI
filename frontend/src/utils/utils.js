/**
 * Tranform the first letter of the word to upper
 * @param string {string}
 * @return {string}
 */
export const firstLetterToUpper = (string) => {
  const first = string.charAt(0).toUpperCase()
  return `${first}${string.slice(1)}`
}