/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Row, Col } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { wxRobotConfigList } from '@/services/system/auditReminder';
import { AUDIT_REMINDER_TYPE } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import ModalsSetting from '@/pages/System/AuditReminder/Modals/ModalsSetting';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getImgUrl } from '@/utils/utils';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id } = r;
    return [
      {
        key: '1',
        authority: 'SYSTEM_AUDIT_REMINDER_SAVE',
        btnname: '编辑',
        handleClick: () => {
          handleAdd('MODAL_AUDIT_REMINDER', { ...r });
        },
      },
      {
        key: '2',
        authority: 'SYSTEM_AUDIT_REMINDER_DELETE',
        btnname: '删除',
        handleClick: () => {
          Modal.confirm({
            title: '是否删除当前配置？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'auditReminder/wxRobotConfigDelete',
                payload: {
                  id,
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
      title: '提醒类型',
      dataIndex: 'type',
      valueType: 'statusdata',
      valueEnum: AUDIT_REMINDER_TYPE,
      styleType: 'none',
    },
    {
      title: '机器人名称',
      dataIndex: 'name',
    },
    {
      title: 'Webhook地址',
      width: 350,
      dataIndex: 'webhook',
    },
    {
      title: '提醒内容',
      width: 350,
      dataIndex: 'content',
      valueType: 'tip',
      trender: (t, r, idx) => {
        const list = r.mobileList ? r.mobileList.split(',').map(_ => `@${_}`) : '';
        const isat = r.atFlag ? `${r.atAll ? '@全体成员' : ''}${list}` : '';
        return `${t}${isat}`;
      },
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
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
  const handleimgAdd = (modalType, r) => {
    const payload = {
      preImgDataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    if (dispatch) {
      dispatch({ type: 'global/changeState', payload });
    }
  };
  return (
    <>
      <ModalsSetting reload={reload} />
      <QCard
        title="审核提醒"
        des="有待办提醒时，会自动在企业微信群推送消息"
        bodyStyle={{ padding: '0 20px' }}
      >
        <ComTable ref={tableRef} columns={columns} request={params => wxRobotConfigList(params)}>
          <Row className="mt-20" type="flex" justify="end" align="middle">
            <Button
              type="link"
              onClick={() => {
                handleimgAdd('PREVIEWIMG', {
                  imgUrl: getImgUrl('aduitreminder.png'),
                  width: '700px',
                  cstyle: {
                    overflow: 'auto',
                    height: '700px',
                  },
                });
              }}
            >
              查看配置教程
            </Button>
            <AuthBlock>
              <Button
                type="primary"
                onClick={() => {
                  handleAdd('MODAL_AUDIT_REMINDER');
                }}
              >
                添加配置
              </Button>
            </AuthBlock>
          </Row>
        </ComTable>
      </QCard>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
