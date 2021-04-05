export default {
  path: '/user',
  component: '../layouts/UserLayout',
  routes: [
    { path: '/user', redirect: '/user/login' },
    { path: '/user/login', name: 'login', component: './User/Login' },
    { path: '/user/register', name: 'register', component: './User/Register' },
    { path: '/user/forget', name: 'forget', component: './User/Forget' },
  ],
};
