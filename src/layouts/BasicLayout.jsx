/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import { Link, connect, useIntl, history } from 'umi';
import React, { useEffect } from 'react';
import RightContent from '@/components/GlobalHeader/RightContent';
import AuthRouter from '@/components/Auth/AuthRouter';
import PageCommons from '@/components/PageCommons';
import QLayout from '@/components/QLayout';

import Content from '@/components/QLayout/Content';
import Guide from '@/pages/Guide/';
const BasicLayout = props => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const {
    dispatch,
    children,
    settings,
    location: { pathname },
    loading,
    urlFileExport,
    currentUser: { mobile, dataMenus, userType, mapsRedirects },
    authRes,
    collapsed,
  } = props;
  const { authStatus } = authRes;
  useEffect(() => {
    //获取省市区
    dispatch({ type: 'common/findBaseProvinceList' });
    dispatch({
      type: 'common/getListAll',
      payload: {
        tags: ['DEFAULT', 'NORMAL'],
      },
    });
  }, []);
  useEffect(() => {
    if (mobile) {
      dispatch({ type: 'user/getAuthStatus', payload: { mobile } });
    }
  }, [mobile]);
  useEffect(() => {
    if (authStatus && authStatus !== 'AUTH_SUCCESS') {
      history.replace(
        `/other/${
          userType === 'EXPERT' ? 'expertResult' : 'enterpriseResult'
        }?mobile=${mobile}&role=${userType}&islogin=1`,
      );
    }
  }, [authStatus]);
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // 重定向处理
  const isRedirect = pathname === '/';
  if (isRedirect && dataMenus.length) {
    history.replace({ pathname: mapsRedirects['/'] });
  }
  const list = ['/home', '/system/pageDecoration/customPage/pageConfig', '/system/auditReminder'];
  return (
    dataMenus.length > 0 &&
    authStatus === 'AUTH_SUCCESS' && (
      <>
        <Guide />
        <QLayout
          onCollapse={handleMenuCollapse}
          {...settings}
          {...props}
          dataMenus={dataMenus}
          rightContentRender={() => <RightContent />}
        >
          {/* 路由权限 */}
          <AuthRouter path={pathname}>
            <Content
              pathname={pathname}
              title={settings.title}
              isTitle={true}
              isCard={!list.includes(pathname)}
            >
              {children}
            </Content>
          </AuthRouter>
          <PageCommons loading={loading} urlFileExport={urlFileExport} dispatch={dispatch} />
        </QLayout>
      </>
    )
  );
};

export default connect(({ global, settings, user }) => ({
  settings,
  loading: global.loading,
  collapsed: global.collapsed,
  urlFileExport: global.urlFileExport,
  currentUser: user.currentUser,
  authRes: user.authRes,
}))(BasicLayout);
