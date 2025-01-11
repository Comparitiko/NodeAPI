import { EVENTS } from '../consts/events.js'
import { userService } from '../services/userService.js'
import { Router } from '../router/Router.js'

const Header = () => {
  const {user} = userService.getUser()
  const header = document.createElement('header')
  header.className = 'shadow-md absolute top-0 z-10 w-full text-white'
  header.innerHTML = `
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <nav class="flex">
              <a data-router href="/" class="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Inicio
              </a>
            </nav>
            
            <div class="relative">
              <button 
                id="menu-button"
                class="flex items-center text-sm font-medium hover:text-blue-600 focus:outline-none focus:text-blue-600"
              >
                <span>${user.username}</span>
                <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
                <div id="dropdown-menu" class="hidden border-gray-800 origin-top-right absolute right-0 mt-2 w-48 rounded-md py-1 bg-slate-600 ring-1 border-2 shadow-xl ring-black ring-opacity-5 focus:outline-none">
                  <a data-router href="/my-series" class="block px-4 py-2 text-sm hover:bg-gray-700">
                    Mis Series
                  </a>
                  <button
                   id="logout-button"
                   class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
                    Cerrar Sesión
                  </button>
                </div>
            </div>
          </div>
        </div>
    `

  header.querySelector('#menu-button').addEventListener(EVENTS.CLICK, () => {
    const dropdownMenu = header.querySelector('#dropdown-menu')
    dropdownMenu.classList.toggle('hidden')
    // Display the dropdown menu when the menu button is clicked and hide it when the mouse leaves the menu button
    dropdownMenu.addEventListener(EVENTS.MOUSEOVER, () => {
      dropdownMenu.classList.remove('hidden')
    })
    dropdownMenu.addEventListener(EVENTS.MOUSEOUT, () => {
      dropdownMenu.classList.add('hidden')
    })
  })

  header.querySelector('#logout-button').addEventListener(EVENTS.CLICK, () => {
    userService.logout()
    Router.navigateTo('/')
    Router.init()
  })

  return header
}

export default Header