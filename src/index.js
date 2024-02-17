import Home from "./views/Home.js";
import About from "./views/About.js";
import { setRootEl, setRoutes, onURLChange } from "./router.js";

const routes = {
	"/": Home,
	"/about": About
}

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
	const rootElement = document.getElementById("root");
	setRootEl(rootElement);

	onURLChange();
})
