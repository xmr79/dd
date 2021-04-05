import { LogoutOutlined, EditOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import ModalEditPassWord from '@/pages/Modals/ModalEditPassWord';
class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;
    if (key === 'editPassword') {
      const { dispatch, currentUser } = this.props;

      if (dispatch) {
        // 弹出密码框
        dispatch({
          type: 'global/changeState',
          payload: {
            dataModal: {
              modalType: 'EDITOR_USER_PWD',
              modalShow: true,
              modalData: {
                record: {
                  id: currentUser.id,
                },
              },
            },
          },
        });
      }

      return;
    }
    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
  };
  render() {
    const { currentUser, menu, dataModal, } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="editPassword">
          <EditOutlined />
          修改密码
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.username ? (
      <>
        <ModalEditPassWord dataModal={dataModal} />
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={currentUser.avatarUrl} alt="avatar" />
            <span className={styles.name}>{currentUser.username}</span>
            &nbsp;<CaretDownOutlined />
          </span>
        </HeaderDropdown>
      </>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user,global }) => ({
  currentUser: user.currentUser,
    dataModal: global.dataModal,
}))(AvatarDropdown);
