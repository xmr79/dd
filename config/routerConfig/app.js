import home from './home';
import customer from './customer';
import experience from './experience';
import order from './order';
import system from './system';
export default {
  path: '/',
  component: '../layouts/BasicLayout',
  routes: [
    home,
    customer,
    experience,
    order,
    system,
    {
      component: './404',
    },
  ],
};
