/**
 * Author: xh
 * Date: 2020/12/14
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { operationType, journalRenderType, businessName } from '@/constants';
import ComTable from '@/components/ComTable';
import UserInfo from '@/components/UserInfo';
import { journalList } from '@/services/system/operationLog';

const Journal = props => {
  const { dispatch, createByList } = props;
  useEffect(() => {
    dispatch({ type: "operationLog/getOperationLog" })
  }, [])

  useEffect(() => {
  }, []);

  let columns = [
    {
      title: '业务名称',
      dataIndex: 'business',
      width: 240,
    },
    {
      title: '业务详情',
      width: 200,
      dataIndex: 'businessDesc',
      render: (t, r) => {
        if (t) {
          if (t.indexOf("$$$") !== -1) {
            const info = t.split("$$$");
            return <UserInfo
              cinfo={{
                name: info[1],
                url: info[0],
              }}
            />
          } else {
            return decodeURIComponent(t)
          }
        } else {
          return '--'
        }
      }
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      render: (t) => {
        return journalRenderType[t]
      }
    },

    {
      title: '操作人',
      dataIndex: 'createBy',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
  ];

  const searchColums = [  
    {
      name: '业务名称',
      dataname: 'business',
      type: 'status',
      placeholder: '全部',
      status: businessName.map(_ => {
        return {
          key: _.key,
          value: _.value
        }
      })
    },
    {
      name: '操作类型',
      dataname: 'type',
      type: 'status',
      placeholder: '全部',
      status: operationType.map(_ => {
        return {
          key: _.key,
          value: _.value,
        };
      }),
    },
    {
      name: '操作人',
      dataname: 'createBy',
      type: 'status',
      placeholder: '全部',
      status: createByList.map(_ => {
        return {
          key: _.username,
          value: _.username
        }
      }),
    },
    {
      name: '操作时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeStart',
        eTime: 'createTimeEnd',
      },
      type: 'times',
    },
  ];

  return (
    <>
      <ComTable
        rowKey="id"
        request={params => journalList(params)}
        columns={columns}
        searchColums={searchColums}
      >
      </ComTable>
    </>
  )
};
export default connect(({ operationLog }) => {
  return { ...operationLog };
})(Journal);
