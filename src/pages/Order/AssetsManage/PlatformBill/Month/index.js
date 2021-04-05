/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
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
  const searchColums = [
    {
      name: '日期',
      dataname: {
        time: 'time',
        bTime: 'beginDate',
        eTime: 'endDate',
        tabTypeKey: 'tabtype',
        isTab: false,
        sformat: 'YYYY/MM',
        dateType: 'month',
        isTodayMore: false,
        tabs: [
          {
            value: '6m',
            name: '最近6个月',
          },
          {
            value: '12m',
            name: '最近12个月',
          },
        ],
        rules: [
          {
            validator: (rule, value, cb) => {
              if (!value) {
                cb();
              } else if (
                value &&
                value.length &&
                value[1].valueOf() - value[0].valueOf() > 86400000 * 366
              ) {
                cb('发送时间跨度范围不能超过12个月');
              } else {
                cb();
              }
            },
          },
        ],
      },
      type: 'times',
      initval: {
        tabtype: '6m',
        time: [
          moment(mapRecentRechargeTime['6m'].value[0]),
          moment(mapRecentRechargeTime['6m'].value[1]),
        ],
        beginDate: mapRecentRechargeTime['6m'].value[0],
        endDate: mapRecentRechargeTime['6m'].value[1],
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
  return (
    <>
      <ComTable
        ref={tableRef}
        columns={getcolumns()}
        searchColums={searchColums}
        request={params =>
          platformStatList({ activitySponsor: 'PLATFORM', ...params, isMonth: true })
        }
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
