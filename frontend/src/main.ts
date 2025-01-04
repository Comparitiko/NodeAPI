import './style.css'

import {App} from './App.ts'

import {EVENTS} from "./consts/events.ts";

document.addEventListener(EVENTS.DOMCONTENTLOADED, App)