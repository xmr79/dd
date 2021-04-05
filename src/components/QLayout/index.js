/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { connect, useIntl } from 'umi';
import { Layout, Menu, Row, Col, Breadcrumb, BackTop } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import { PieChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { history } from 'umi';

import BreadcrumbRender from '@/components/QLayout/BreadcrumbRender';


const { SubMenu } = Menu;
const { Header, Footer, Sider } = Layout;

const Mheader = props => {
  const { logo, title, isHref = false, collapsed } = props;
  return (
    <div className={styles.mheader}>
      <a href={isHref ? '/' : 'javascript:void(0);'}>
        {logo && <img src={logo} alt="" />}
      </a>
    </div>
  );
};

const getMenu = list => {
  const menuList = list.map((item, index) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          key={item.path ? item.path : index}
          title={
            <span>
              <span>{item.name}</span>
            </span>
          }
        >
          {item.children.map((item, index) => {
            if (item.children && item.children.length > 0) {
              return getMenu([item]);
            } else {
              return <Menu.Item key={item.path ? item.path : index}>{item.name}</Menu.Item>;
            }
          })}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.path ? item.path : index}>
          <span>{item.name}</span>
        </Menu.Item>
      );
    }
  });
  return menuList;
};

const findParentId = (data, id) => {
  let res = [];
  const findids = (arr, temp = []) => {
    for (const node of arr) {
      if (node.path === id) {
        // temp.push(id);
        res = temp;
        return;
      } else if (node.children && node.children.length > 0) {
        findids(node.children, temp.concat(node.path));
      }
    }
  };
  findids(data, []);
  return res.length > 0 ? res : null;
};

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

const QLayout = props => {
  const {
    children,
    collapsed = false,
    theme = 'light',
    logo,
    title,
    dataMenus,
    location: { pathname },
    rightContentRender,
    onCollapse,
  } = props;
  const [current, setCurrent] = useState({});
  const [paths, setpaths] = useState([]);
  const contentRef = useRef(null);
  useEffect(() => {
    async function fun() {
      await setCurrent({});
      if (dataMenus.length > 0) {
        const lists = pathname.split('/');
        let curPath = '';
        const arr = [];
        for (let i = 0; i < lists.length; i++) {
          if (lists[i]) {
            curPath = `${curPath}/${lists[i]}`;
            arr.push(curPath);
          }
        }
        setpaths(arr);
        const FPath = arr[0];
        const c = dataMenus.filter(_ => _.path === FPath)[0];

        if (c) {
          setCurrent(c);
        }
      }
    }
    fun();
    return () => {};
  }, [pathname, dataMenus]);

  const onSelect = async (item, key, type) => {
    if (type === 'fst') {
      const c = dataMenus.filter(_ => _.path === item.key);
      if (c.length === 1) {
        // await setCurrent(c[0]);
        const first = c[0];
        const url = findFirstLowChildren(first).path;
        history.push(url);
      }
    } else {
      history.push(item.key);
    }
  };

  return (
    <>
      <Layout className={styles.layout}>
        <div className={styles.sidercon}>
          <div>
            <Sider
              theme="dark"
              className={classnames(styles.sider, styles['dark'])}
              collapsed={collapsed}
              width="100"
            >
              <Mheader logo={logo} title={title} isHref={true} collapsed={collapsed} />
              <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[current.path]}
                onSelect={(item, key) => {
                  onSelect(item, key, 'fst');
                }}
              >
                {dataMenus.map((_, idx) => {
                  return (
                    <Menu.Item key={_.path} icon={_.icon}>
                      {_.name}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>
          </div>
          <div>
            {!collapsed && current.children && current.children.length > 0 && (
              <Sider theme={theme} className={styles.sider} width="180">
                &nbsp;
                {/* <Mheader title={current.name} /> */}
                <Menu
                  mode="inline"
                  theme={theme}
                  selectedKeys={paths}
                  defaultOpenKeys={current.children.map(_ => _.path)}
                  onClick={(item, key) => {
                    onSelect(item, key, 'sed');
                  }}
                  // onOpenChange={onOpenChange}
                >
                  {getMenu(current.children)}
                </Menu>
              </Sider>
            )}
          </div>
        </div>
        <Layout className={collapsed ? 'right-container' : 'right-container has-sider'}>
          <Header className={styles.header}>
            <Row>
              <div
                className={styles.outlined}
                onClick={() => {
                  onCollapse(!collapsed);
                }}
              >
                {collapsed ? (
                  <MenuUnfoldOutlined style={{ fontSize: '20px' }} />
                ) : (
                  <MenuFoldOutlined style={{ fontSize: '20px' }} />
                )}
              </div>
              <BreadcrumbRender pathname={pathname} title={title} />
              {rightContentRender()}
            </Row>
          </Header>

          {children}
        </Layout>
      </Layout>
    </>
  );
};
export default connect(({}) => {
  return {};
})(QLayout);
