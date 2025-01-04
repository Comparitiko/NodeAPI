export const $ = <T extends HTMLElement>(selector: string): T => document.querySelector<T>(selector)!

export const $$ = <T extends HTMLElement>(selector: string): NodeListOf<T> => document.querySelectorAll<T>(selector)