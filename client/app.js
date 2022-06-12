import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";

const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
const root = document.documentElement;

function router() {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/products", view: Products },
    { path: "/posts", view: Posts },
  ];

  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: item.path === location.pathname,
    };
  });

  let match = potentialRoutes.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }

  document.querySelector("#app").innerHTML = match.route.view();
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  if (sidebar.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 230 + "px");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
