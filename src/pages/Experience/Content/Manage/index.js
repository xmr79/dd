/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history, Link } from 'umi';
import { Divider, Button, Modal, Row, Card, message, Alert } from 'antd';
import ComTable from '@/components/ComTable';
import { contentList } from '@/services/experience/content';
import { aduitStatus } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BondAlert, { getIsBond } from '@/components/BondAlert';
import ModalExtension from '@/pages/Modals/ModalExtension'
import moment from 'moment';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser,
    basicInfo,
    accountListAll,
    isAlert,
    systemMobile,
  } = props;
  const { userType } = currentUser;
  const cadminId = currentUser.id;

  const { companyType, earnestFlag } = basicInfo;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  useEffect(() => {
    dispatch({
      type: 'common/getSystemMobile',
    });
    if (localStorage.getItem('last_alert_showtime')) {
      const endtime = localStorage.getItem('last_alert_showtime');
      const nowtime = moment().valueOf();
      if (nowtime > endtime - 0) {
        localStorage.removeItem('last_alert_showtime');
      }
    }
    dispatch({
      type: 'common/getListAll',
      payload: {
        tags: undefined,
      },
    });
    return () => {
      dispatch({
        type: 'common/getListAll',
        payload: {
          tags: ['DEFAULT', 'NORMAL'],
        },
      });
    };
  }, []);

  const btns = r => {
    const { id, adminId, title } = r;
    let isShow = false;
    if (userType === 'SYSTEM') {
      if (adminId === 1) {
        isShow = true;
      }
    } else {
      if (adminId === cadminId) {
        isShow = true;
      }
    }
    return [
      isShow && {
        key: '2',
        authority: 'EXPERIENCE_CONTENT_MANAGE_SAVE',
        btnname: '??????',
        handleClick: () => {
          history.push({
            pathname: '/experience/content/manage/createContent',
            query: {
              contentId: id,
            },
          });
        },
      },
      isShow && {
        key: '3',
        authority: 'EXPERIENCE_CONTENT_MANAGE_DELETE',
        btnname: '??????',
        handleClick: () => {
          Modal.confirm({
            title: '???????????????????????????',
            okText: '??????',
            cancelText: '??????',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'contentManage/contentDelete',
                payload: {
                  id,
                  contentName: title,
                  reload,
                },
              });
            },
          });
        },
      },
      {
        key: '4',
        authority: 'EXPERIENCE_COMMENT_CONTENT',
        btnname: '????????????',
        handleClick: () => {
          history.push({
            pathname: '/experience/comment/content',
            query: {
              title,
            },
          });
        },
      },
      {
        key: '5',
        btnname: '??????',
        handleClick: () => {
          const payload = {
            page: "pages/Content/article/detail",
            scene: `id=${r.id}`,
            width: 200
          }
          dispatch({ type: 'global/getExtensionQrcode', payload }).then(res => {
            handleAdd('EXTENSION', { ...r, pageurl: `pages/Content/article/detail?id=${r.id}` , pageimg: res.data });
          })
        },
      },
    ];
  };
  const columns = [
    {
      title: '????????????',
      dataIndex: 'title',
    },
    {
      title: '????????????',
      dataIndex: 'category',
      render: (t, r) => {
        return t ? t.map(_ => _.name).join('???') : '--';
      },
    },
    {
      title: '????????????',
      dataIndex: 'tag',
      render: (t, r) => {
        return t ? t.map(_ => _.name).join('???') : '--';
      },
    },
    {
      title: '????????????/??????',
      dataIndex: 'pv',
      render: (t, r) => {
        return `${r.uv}/${t}`;
      },
    },
    {
      title: '?????????',
      dataIndex: 'likesNum',
    },
    {
      title: '?????????',
      dataIndex: 'collectNum',
    },
    {
      title: '?????????',
      dataIndex: 'evaluateNum',
    },
    {
      title: '?????????',
      dataIndex: 'shareNum',
    },

    {
      title: '????????????',
      dataIndex: 'createTime',
      valueType: 'verifyTime',
      verifyUser: 'creater',
    },
    {
      title: '????????????',
      dataIndex: 'editTime',
      valueType: 'verifyTime',
      verifyUser: 'editer',
    },

    {
      title: '??????',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '????????????',
      dataname: 'title',
      type: 'normal',
      placeholder: '?????????????????????',
    },
    {
      name: '????????????',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '????????????',
      dataname: {
        time: 'editTime',
        bTime: 'editStartTime',
        eTime: 'editEndTime',
      },
      type: 'times',
    },
    {
      name: '????????????',
      dataname: 'creater',
      type: 'status',
      placeholder: '??????',
      status: accountListAll,
      isHidden: userType !== 'SYSTEM',
    },
  ];
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleCreate = () => {
    if (getIsBond(userType, companyType, earnestFlag)) {
      message.warning('??????????????????????????????????????????????????????????????????????????????????????????????????????');
      return false;
    }
    history.push('/experience/content/manage/createContent');
  };
  const messageText = (
    <div>
      ?????????????????????????????????????????????{systemMobile}??????
      <a className="ml-5" target="_blank" href="/user/register">
        ??????????????????
      </a>
    </div>
  );
  const onClose = e => {
    const endtime = moment(
      new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
    ).valueOf();

    localStorage.setItem('last_alert_showtime', endtime);
    dispatch({
      type: 'contentManage/changeState',
      payload: {
        isAlert: false,
      },
    });
  };

  return (
    <>
      <BondAlert />
      <ModalExtension dataModal={dataModal} />
      {!localStorage.getItem('last_alert_showtime') && userType === 'EXPERT' && isAlert && (
        <Alert
          className="mb-10"
          message={messageText}
          type="warning"
          showIcon
          closable
          onClose={onClose}
        />
      )}
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => contentList(params)}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="EXPERIENCE_CONTENT_MANAGE_SAVE">
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> ????????????
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global, user, personalCenter, common, contentManage }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
    accountListAll: common.accountListAll,
    isAlert: contentManage.isAlert,
    systemMobile: common.systemMobile,
  };
};
export default connect(mapStateToProps)(List);
