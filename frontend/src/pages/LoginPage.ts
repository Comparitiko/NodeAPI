import {$} from "../utils/selector.ts";

export class LoginPage {

  private static rootElement: HTMLDivElement

  static render() {

    LoginPage.rootElement = $("div") as HTMLDivElement

    LoginPage.rootElement.innerHTML = `
        <main class="flex flex-col items-center justify-center h-screen">
            <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-3xl font-bold">Login</h1>
                <form class="flex flex-col items-center justify-center w-full">
                    <input type="text" placeholder="Email" class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">
                    <input type="password" placeholder="Password" class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">
                    <button class="w-full mt-2 p-2 border-2 border-gray-400 rounded-md">Login</button>
                </form>
            </div>
        </main>
        `

  }

  private static setupEventListeners() {
    const form = LoginPage.rootElement.querySelector("form")!

    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      const email = form.querySelector("#email")! as HTMLInputElement
      const password = form.querySelector("#password")! as HTMLInputElement

      const body = JSON.stringify({
        email: email.value,
        password: password.value
      })

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      })
    })
  }
}