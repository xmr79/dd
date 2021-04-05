import user from './user';
import app from './app';
import other from './other';
const getRoutes = (routes, maps = {}) => {
  routes = routes.map(item => {
    if (item.auths) {
      maps[item.path] = item.auths;
    }
    if (item.routes) {
      item.routes = getRoutes(item.routes, maps).routes;
    }
    return item;
  });
  routes.push({
    component: '../pages/404',
  });
  return {
    routes,
    maps,
  };
};

const { routes, maps } = getRoutes([user, other, app]);

export const routeMaps = maps;

export default routes;
