/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { platformStatList } from '@/services/order';
import { enumRecentRechargeTime, sponsorType } from '@/constants';
import { arrayToObj } from '@/utils/utils';
import moment from 'moment';
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, getcolumns } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const searchColums = [
    {
      name: '日期',
      dataname: {
        time: 'time',
        bTime: 'beginDate',
        eTime: 'endDate',
        tabTypeKey: 'tabtype',
        isTab: false,
        isTodayMore: false,
        rules: [
          {
            validator: (rule, value, cb) => {
              if (!value) {
                cb();
              } else if (
                value &&
                value.length &&
                value[1].valueOf() - value[0].valueOf() > 86400000 * 31
              ) {
                cb('发送时间跨度范围不能超过31天');
              } else {
                cb();
              }
            },
          },
        ],
      },
      type: 'times',
      initval: {
        tabtype: '30d',
        time: [
          moment(mapRecentRechargeTime['30d'].value[0]),
          moment(mapRecentRechargeTime['30d'].value[1]),
        ],
        beginDate: mapRecentRechargeTime['30d'].value[0],
        endDate: mapRecentRechargeTime['30d'].value[1],
      },
    },
    // {
    //   name: '活动发起方',
    //   dataname: 'activitySponsor',
    //   type: 'status',
    //   status: sponsorType,
    //   allkey: '全部',
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
  return (
    <>
      <ComTable
        ref={tableRef}
        columns={getcolumns(params)}
        searchColums={searchColums}
        request={params => {
          setParams(params);
          return platformStatList({ activitySponsor: 'PLATFORM', ...params, isMonth: false });
        }}
        tabSetting={{
          isTabShow: true,
          tabList: sponsorType,
          isTabAll: false,
          keyname: 'activitySponsor',
        }}
      />
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
