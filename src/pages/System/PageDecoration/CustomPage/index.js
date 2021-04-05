/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Button, Divider, Modal, Row, Col } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { customPageList } from '@/services/system/pageDecoration';
import { PAGE_STATUS } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalPageInfo from '@/pages/System/PageDecoration/Modals/ModalPageInfo';
import ModalMaterial from '@/pages/Modals/ModalMaterial';
import ModalExtension from '@/pages/Modals/ModalExtension'
import moment from 'moment';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, accountListAll, cdataModal } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  const btns = r => {
    const { id, adminId, status, pushTime, name } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '基本信息',
        handleClick: () => {
          handleAdd('MODAL_PAGE_INFO', { ...r });
        },
      },
      {
        key: '2',
        authority: '',
        btnname: '页面装修',
        handleClick: () => {
          let query = { id };
          if (status === 'TIME_PUBLISH') {
            query = {
              id,
              status,
              pushTime,
            };
          }
          history.push({
            pathname: '/system/pageDecoration/customPage/pageConfig',
            query,
          });
        },
      },
      r.status === "PUBLISH" && {
        key: '4',
        authority: '',
        btnname: '推广',
        handleClick: () => {
          console.log(r)
          let page;
          switch (r.code) {
            case "INDEX":
              page = "pages/Tabber/home"
              break;
            case "YIPINHANG":
              page = "pages/Tabber/yph"
              break;
            case "ZHUANQU_TIYAN":
              page = "pages/Tabber/cmstwo"
              break;
            default:
              page = "pages/Tabber/cms"
              break;
          }
          const payload = {
            page,
            scene: `id=${r.id}&code=${r.code}`,
            width: 200
          }
          dispatch({ type: 'global/getExtensionQrcode', payload }).then(res => {
            handleAddExtension('EXTENSION', { ...r, pageurl: `${page}?id=${r.id}&code=${r.code}` , pageimg: res.data });
          })
        },
      },
      {
        key: '3',
        authority: '',
        btnname: '删除',
        handleClick: () => {
          Modal.confirm({
            title: '是否删除该页面？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'customPage/getCmsPageDelete',
                payload: {
                  params: { id, name },
                  reload,
                },
              });
            },
          });
        },
      },
    ];
  };
  const columns = [
    {
      title: '页面ID',
      width: 80,
      dataIndex: 'id',
    },
    {
      title: '页面名称',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '分享标题',
      width: 100,
      dataIndex: 'shareTitle',
    },
    {
      title: '分享描述',
      dataIndex: 'shareDes',
      width: 150,
      valueType: 'tip',
    },
    {
      title: '分享图片',
      width: 150,
      dataIndex: 'shareImgUrl',
      valueType: 'imglists',
    },
    {
      title: '使用场景',
      width: 150,
      dataIndex: 'details',
    },
    {
      title: '状态',
      width: 200,
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: PAGE_STATUS,
      remark: (t, r) => {
        const { pushTime, status } = r;
        if (status === 'TIME_PUBLISH') {
          return `将于${moment(pushTime).format('YYYY-MM-DD HH:mm:ss')}发布`;
        }
      },
    },
    {
      title: '更新时间',
      width: 140,
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'creater',
    },
    {
      title: '操作',
      width: 210,
      valueType: 'action',
      btns: btns,
      rowSpan: 3,
    },
  ];

  const searchColums = [
    {
      name: '页面名称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入页面名称',
    },
    {
      name: '更新时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '更新账号',
      dataname: 'creater',
      type: 'status',
      placeholder: '全部',
      isSearch: true,
      status: accountListAll,
    },
  ];
  const handleAddExtension = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'customPage/changeState', payload });
  };

  const handleCreate = () => {
    handleAdd('MODAL_PAGE_INFO');
  };
  const handleInfo = val => {
    dispatch({
      type: 'customPage/saveInfo',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };
  return (
    <>
      <ModalMaterial />
      <ModalExtension dataModal={dataModal} />
      <ModalPageInfo handleInfo={handleInfo} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => customPageList(params)}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新增页面
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global, common, customPage }) => {
  return {
    dataModal: global.dataModal,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(List);
