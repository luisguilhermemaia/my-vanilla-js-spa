'use strict';

import Error404 from './views/pages/Error404.js';
import Posts from './views/pages/Posts.js';
import Login from './views/pages/Login.js';
import Register from './views/pages/Register.js';

import Navbar from './views/components/Navbar.js';

const hasNav = ['/posts'];

const routes = {
  '/': Login,
  '/register': Register,
  '/posts': Posts
};

const router = async () => {
  const content = null || document.getElementById('content-container');

  if (location.hash.includes(hasNav[0])) {
    const header = null || document.getElementById('header-container');
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
  }

  const request = location.hash
    .slice(1)
    .toLowerCase()
    .split('/')[1];
  const parsedURL = request ? '/' + request : '/';

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
