import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  DesktopOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const findFirstLowChildren = first => {
  const fun = (first, c = {}) => {
    if (first.children && first.children.length > 0) {
      c = fun(first.children[0]);
    } else {
      c = first;
    }
    return c;
  };
  return fun(first);
};
const mapsIcons = {
  customer: <UserOutlined />,
  experience: <AppstoreOutlined />,
  home: <HomeOutlined />,
  order: <DollarOutlined />,
  system: <DesktopOutlined />,
};

export function getDataMenus(menus, codes = [], mapsRedirects = {}) {
  function getMenu(menus) {
    menus = menus
      .filter(_ => {
        codes.push(_.code);
        if (_.subPermissionList.length > 0) {
          getMenu(_.subPermissionList);
        }
        return _.type === 'MENU';
      })
      .map(_ => {
        const nchildren = getMenu(_.subPermissionList);

        return {
          ..._,
          key: _.url,
          path: _.url,
          locale: _.url ? `menu${_.url.replace(/\//g, '.')}` : '',
          icon: mapsIcons[_.icon],
          children: nchildren.length > 0 ? nchildren : null,
        };
      });
    return menus;
  }
  menus = getMenu(menus);
  // 重定向
  if (menus.length > 0) {
    const first = menus[0];
    mapsRedirects['/'] = findFirstLowChildren(first).path;
  } else {
    mapsRedirects['/'] = '/';
  }

  return {
    menus,
    codes,
    mapsRedirects,
  };
}
