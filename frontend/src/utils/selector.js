/**
 * Get an element from the document by selector
 * @param selector {string}
 * @returns {HTMLElement}
 */
export const $ = (selector) => document.querySelector(selector)

/**
 * Get all elements from the document by selector
 * @param selector {string}
 * @returns {NodeListOf<HTMLElement>}
 */
export const $$ = (selector) => document.querySelectorAll(selector)