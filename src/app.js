'use strict';

import Error404 from './views/pages/Error404.js';
import Posts from './views/pages/Posts.js';
import Login from './views/pages/Login.js';

import Navbar from './views/components/Navbar.js';

const routes = {
  '/': Login,
  '/posts': Posts
};

const router = async () => {
  const header = null || document.getElementById('header-container');
  const content = null || document.getElementById('page-container');

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  let request = location.hash
    .slice(1)
    .toLowerCase()
    .split('/')[1];
  let parsedURL = request ? '/' + request : '/';

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
