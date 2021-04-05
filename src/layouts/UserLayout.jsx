import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link, connect, useIntl } from 'umi';
import React from 'react';
import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown';
import styles from './UserLayout.less';
import { getImgUrl } from '@/utils/utils';
import Header from '@/components/Header';
const loginimg = getImgUrl('img.png');
const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const intl = useIntl();
  const { formatMessage } = intl;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
    currentUser,
  } = props;
  const { breadcrumb } = getMenuData(routes);
  function getTitle(obj) {
    let locale;
    const { pathname, breadcrumb } = obj;
    for (let key in breadcrumb) {
      if (key === pathname) {
        locale = breadcrumb[key].locale;
      }
    }
    return locale;
  }
  const ptitle = getTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
  });
  document.title = ptitle ? formatMessage({ id: ptitle }) : '';

  const LoginRF = (
    <div className={styles.con}>
      <div className={styles.login}>{children}</div>
    </div>
  );

  return (
    <>
      <Header {...props} />
      <div className={styles.container}>
        <div className={styles.content}>{LoginRF}</div>
      </div>
    </>
  );
};

export default connect(({ settings, user }) => ({ ...settings, currentUser: user.currentUser }))(
  UserLayout,
);
