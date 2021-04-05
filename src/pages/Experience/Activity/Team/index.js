/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, message, Tooltip } from 'antd';
import ComTable from '@/components/ComTable';
import { activityList } from '@/services/experience/activity.js';
import {
  activityStatus,
  sponsorType,
  ACTIVITY_AUDIT_REASON,
  ACTIVITY_TEAM_STATUS,
} from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import BondAlert, { getIsBond } from '@/components/BondAlert';
import moment from 'moment';
import ModalShare from '@/pages/Experience/Activity/Modals/ModalShare';
import ModalVisitor from '@/pages/Experience/Activity/Modals/ModalVisitor';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser: { userType, username },
    basicInfo,
  } = props;
  const { companyType, earnestFlag } = basicInfo;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  function getIsShow(r) {
    const { editUsername, sponsor } = r;
    let isShow = false;
    if (sponsor === 'PLATFORM' && userType === 'SYSTEM') {
      isShow = true;
    } else if (sponsor !== 'PLATFORM' && editUsername === username) {
      isShow = true;
    }
    return isShow;
  }
  function getBase64(img) {
    function getBase64Image(img, width, height) {
      //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
      var canvas = document.createElement('canvas');
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();
      return dataURL;
    }
    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = img;
      if (img) {
        image.onload = function() {
          resolve(getBase64Image(image)); //将base64传给done上传处理
        };
      }
    });
  }
  const btns = r => {
    const { id, appointmentCount, title, imgUrl } = r;
    const isShow = getIsShow(r);
    return [
      isShow && {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'appointStatus',
          val: ['NO_APPOINT', 'RESERVED', 'END'],
        },
        btnname: '复制活动',
        handleClick: () => {
          Modal.confirm({
            title: '确定复制活动？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'activityManage/activityCopy',
                payload: {
                  id,
                  reload,
                },
              });
            },
          });
        },
      },

      isShow && {
        key: '2',
        authority: 'EXPERIENCE_ACTIVITY_TEAM_EDIT',
        condition: {
          dataindex: 'appointStatus',
          val: ['NO_APPOINT'],
        },
        btnname: '编辑',
        handleClick: () => {
          history.push({
            pathname: '/experience/activity/team/createTeam',
            query: {
              id,
            },
          });
        },
      },
      {
        key: '3',
        authority: 'EXPERIENCE_ACTIVITY_TEAM_EDIT',
        btnname: '查看',
        condition: {
          dataindex: 'appointStatus',
          val: ['RESERVED', 'END'],
        },
        handleClick: () => {
          history.push({
            pathname: '/experience/activity/team/createTeam',
            query: {
              isLook: '1',
              id,
            },
          });
        },
      },
      isShow && {
        key: '4',
        authority: 'EXPERIENCE_ACTIVITY_TEAM_OVER',
        btnname: '结束',
        condition: {
          dataindex: 'appointStatus',
          val: ['NO_APPOINT'],
        },
        handleClick: () => {
          appointmentCount <= 0
            ? Modal.confirm({
                title: '提示',
                content: `确定要结束当前活动吗？`,
                okText: '结束',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  dispatch({
                    type: 'activityManage/activityFinish',
                    payload: {
                      id,
                      title,
                      reload,
                    },
                  });
                },
              })
            : Modal.warning({
                title: '提示',
                icon: <InfoCircleOutlined />,
                content: `当前活动已有${appointmentCount}人预约，不能结束`,
                okText: '我知道了',
              });
        },
      },
      isShow && {
        key: '5',
        btnname: '分享活动',
        handleClick: async () => {
          const payload = {
            page: 'pages/Content/activity/activityDetail',
            scene: `id=${r.id}`,
            width: 200,
          };
          const res = await dispatch({ type: 'global/getExtensionQrcode', payload });
          const iurl = imgUrl ? imgUrl.split(',')[0] : '';
          const aaa1 = await getBase64(res.data);
          const aaa2 = await getBase64(iurl);
          handleAdd('MODAL_SHARE', {
            ...r,
            pageimg: aaa1,
            imgUrl: aaa2,
          });
        },
      },
      isShow && {
        key: '6',
        authority: 'EXPERIENCE_ACTIVITY_TEAM_DETAIL',
        btnname: '订单详情',
        condition: {
          dataindex: 'appointStatus',
          val: ['RESERVED'],
        },
        handleClick: () => {
          history.push({
            pathname: '/experience/activity/team/orderDetail',
            query: {
              id,
            },
          });
        },
      },
      isShow && {
        key: '7',
        btnname: '录入体验者',
        condition: {
          dataindex: 'appointStatus',
          val: ['NO_APPOINT'],
        },
        handleClick: () => {
          handleAdd('MODAL_VISTOR', {
            id,
          });
        },
      },
    ];
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '活动标题',
      width: 150,
      dataIndex: 'title',
      valueType: 'tip',
      isCopy: true,
    },
    {
      title: '活动分类',
      dataIndex: 'categoryVOS',
      render: t => {
        return t.map(_ => _.name).join(';');
      },
    },
    {
      title: '活动标签',
      dataIndex: 'activityTagVOS',
      render: t => {
        return t.map(_ => _.name).join(';');
      },
    },

    // {
    //   title: '活动主办方',
    //   dataIndex: 'sponsor',
    //   valueType: 'statusdata',
    //   valueEnum: sponsorType,
    //   styleType: 'none',
    // },
    {
      title: '活动时间',
      dataIndex: 'minStartDate',
      width: 200,
      render: (t, r) => {
        return `${moment(t).format('YYYY-MM-DD')}~${moment(r.maxStartDate).format('YYYY-MM-DD')}`;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'verifyTime',
      verifyUser: 'createUsername',
    },
    {
      title: '编辑时间',
      dataIndex: 'editTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: () => {
        return (
          <>
            活动状态
            <Tooltip
              className="ml-5"
              title={
                <>
                  <p>待预约：活动创建完成还没有人预约的状态</p>
                  <p>
                    已预约：活动已经被预约的状态，一个活动只能被一个团体预约，活动若发生退款，也不能再被预约
                  </p>
                  <p>已结束：活动已过结束时间且无人预约或者手动结束活动的状态</p>
                </>
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        );
      },
      dataIndex: 'appointStatus',
      valueType: 'statusdata',
      valueEnum: ACTIVITY_TEAM_STATUS,
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
      width: 200,
      btnAlign: 'column',
    },
  ];

  const searchColums = [
    {
      name: '活动标题',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动标题',
    },
    {
      name: '活动分类',
      dataname: 'categoryId',
      type: 'sort',
    },
    // {
    //   name: '活动主办方',
    //   dataname: 'sponsor',
    //   type: 'status',
    //   status: sponsorType,
    //   isHidden: userType !== 'SYSTEM',
    // },

    {
      name: '创建时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
      },
      type: 'times',
    },
    {
      name: '编辑时间',
      dataname: {
        time: 'editTime',
        bTime: 'editStartTime',
        eTime: 'editEndTime',
      },
      type: 'times',
    },
    {
      name: '活动状态',
      dataname: 'appointStatus',
      type: 'status',
      status: ACTIVITY_TEAM_STATUS,
    },
    {
      name: '活动时间',
      dataname: {
        time: 'aTime',
        bTime: 'activityStartTime',
        eTime: 'activityEndTime',
      },
      type: 'times',
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
      message.warning('当前账号尚未缴纳保证金，为了不影响您的使用，请尽快缴纳平台入驻保证金');
      return false;
    }
    history.push('/experience/activity/team/createTeam');
  };

  return (
    <>
      <ModalShare />
      <ModalVisitor />
      <BondAlert />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => activityList({ activityType: 'TEAM', ...params })}
        attribute={{ scroll: { x: 1500 } }}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="EXPERIENCE_ACTIVITY_TEAM_EDIT">
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新建活动
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global, personalCenter, user }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
