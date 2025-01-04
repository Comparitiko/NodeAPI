import {Router} from "./components/Router.ts";
import {refreshToken} from "./services/refresh-token.ts";

export const App = async () => {

  await refreshToken()

  Router.init()
}