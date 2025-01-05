import './style.css'

import { App } from './App.js'

import { EVENTS } from './consts/events.js'

document.addEventListener(EVENTS.DOMCONTENTLOADED, App)