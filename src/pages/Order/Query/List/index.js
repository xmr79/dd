/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, Tabs } from 'antd';
import ComTable from '@/components/ComTable';
import { activityOrderbosList } from '@/services/order';
import { orderStatus, ORDER_PAYTYPE, ACTIVITY_TYPE } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DetailDrawer from '@/pages/Order/Modal/DetailDrawer';
import UserInfo from '@/components/UserInfo';
import moment from 'moment';
import { isRealNum } from '@/utils/utils';
import { BillExport } from '@/services/order';
const { TabPane } = Tabs;
const List = props => {
  const {
    dataModal,
    dispatch,
    dataDrawer,
    location: {
      query: { day = -6 },
    },
  } = props;

  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const initval = {
    time: [moment(new Date()).add(+day, 'days'), moment(new Date()).add(0, 'days')],
    createTimeBegin: moment(new Date())
      .add(+day, 'days')
      .startOf('day')
      .valueOf(),
    createTimeEnd: moment(new Date())
      .add(0, 'days')
      .endOf('day')
      .valueOf(),
  };
  const [firstLoad, setfirstLoad] = useState(true);
  useEffect(() => {
    tableRef.current.sRef.current.form.setFieldsValue(initval);
    if (day && !firstLoad) {
      tableRef.current.onSearch(initval);
    }
  }, [day]);
  const btns = r => {
    const { id, status } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '查看详情',
        handleClick: () => {
          dispatch({
            type: 'queryList/changeState',
            payload: {
              dataDrawer: { modalShow: true, modalData: { id, status } },
            },
          });
        },
      },
    ];
  };
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
    },
    {
      title: '活动类型',
      dataIndex: 'activityType',
      valueType: 'statusdata',
      valueEnum: ACTIVITY_TYPE,
      styleType: 'none',
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      width: 150,
      valueType: 'tip',
    },
    {
      title: '费用（元）',
      dataIndex: 'totalAmount',
    },
    {
      title: '下单用户',
      dataIndex: 'userNick',
      render: (t, r) => {
        return (
          <UserInfo
            cinfo={{
              name: t,
              url: r.avatar,
            }}
          />
        );
      },
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'statusdata',
      valueEnum: ORDER_PAYTYPE,
      styleType: 'none',
    },

    {
      title: '下单时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTime',
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      valueType: 'tip',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: orderStatus,
    },

    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '订单编号',
      dataname: 'orderId',
      type: 'normal',
      placeholder: '请输入订单编号',
      rules: [
        {
          validator: (rule, value) => {
            if (!value) {
              return Promise.resolve();
            } else if (!isRealNum(value)) {
              return Promise.reject('订单编号必须为数字');
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
    },
    {
      name: '活动类型',
      dataname: 'activityType',
      type: 'status',
      status: ACTIVITY_TYPE,
    },
    {
      name: '活动名称',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动名称',
    },
    {
      name: '用户昵称',
      dataname: 'userNick',
      type: 'normal',
      placeholder: '请输入用户昵称',
    },

    {
      name: '支付方式',
      dataname: 'payType',
      type: 'status',
      status: ORDER_PAYTYPE,
    },

    {
      name: '下单时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
        rules: [
          {
            validator: (rule, value) => {
              if (!value) {
                return Promise.resolve();
              } else if (
                value &&
                value.length &&
                value[1].valueOf() - value[0].valueOf() > 86400000 * 90
              ) {
                return Promise.reject('发送时间跨度范围不能超过90天');
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
      },
      type: 'times',
      initval,
    },
    // {
    //   name: '订单状态',
    //   dataname: 'status',
    //   type: 'status',
    //   status: orderStatus,
    // },
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

  const [params, setParams] = useState({});
  const handleDown = async () => {
    const { status, data } = await BillExport(params);
    if (status === 1) {
      location.href = data;
    }
  };

  const request = p => {
    const obj = { ...params, ...p };
    setParams(obj);
    setfirstLoad(false);
    return activityOrderbosList(obj);
  };
  return (
    <>
      <DetailDrawer dataDrawer={dataDrawer} />

      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={request}
        tabSetting={{
          isTabShow: true,
          tabList: orderStatus,
          isTabAll: true,
          keyname: 'status',
        }}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button
              className="mt-20"
              type="primary"
              onClick={() => {
                handleDown();
              }}
            >
              下载数据
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ queryList }) => {
  return {
    dataDrawer: queryList.dataDrawer,
  };
};
export default connect(mapStateToProps)(List);
