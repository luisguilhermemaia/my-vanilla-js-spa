'use strict';

import Login from './views/pages/Login.js';
import Posts from './views/pages/Posts.js';
import Register from './views/pages/Register.js';

import Navbar from './views/components/Navbar.js';

const routes = {
  '/': Login,
  '/register': Register,
  '/posts': Posts
};
