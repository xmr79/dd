/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Row, Col, Input, Select, message } from 'antd';
import PhoneFormItem from '@/components/FormItems/PhoneFormItem';
import { CERTIFICATES_TYPE } from '@/constants';
import ComTable from '@/components/ComTable';
import ModalImports from '@/pages/Experience/Activity/Team/Create/ExperiencerInfoForm/ModalImports';
import { activityVisitorList } from '@/services/experience/activity.js';
import { MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const ExpenriencerInfo = props => {
  const {
    dispatch,
    id,
    aduitId,
    visitorKey,
    getVisitorNum,
    formItemLayout,
    isLook = false,
  } = props;
  const [addForm] = Form.useForm();
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  useEffect(() => {
    reload();
  }, [visitorKey]);

  const btns = r => {
    return [
      !isLook && {
        key: '1',
        ref: (
          <MinusCircleOutlined
            onClick={() => {
              dispatch({
                type: 'activityManage/deleteVisitor',
                payload: {
                  params: {
                    id: r.id,
                  },
                  reload,
                },
              });
            }}
          />
        ),
      },
    ];
  };
  const columns = [
    {
      title: '体验者姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      render: (t, r) => {
        const obj = CERTIFICATES_TYPE.filter((item, index) => {
          return item.key === t;
        })[0];
        if (obj) {
          const { value } = obj;
          return r.idNum ? (value ? value : '--') : '--';
        } else {
          return '--';
        }
      },
    },
    {
      title: '证件号码',
      dataIndex: 'idNum',
    },
    {
      title: '操作',
      valueType: 'action',
      btns,
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
    dispatch({ type: 'activityManage/changeState', payload });
  };
  const onFinish = values => {
    console.log(values);
    const { idNum, idType } = values;
    if (idNum && !idType) {
      message.error('请选择证件类型');
      return false;
    }
    dispatch({
      type: 'activityManage/manualImportVisitors',
      payload: {
        params: {
          visitorDTOList: [{ ...values }],
          visitorKey,
          activityId: id,
          reviewId: aduitId,
        },
        reload: () => {
          reload();
          addForm.resetFields();
        },
      },
    });
  };
  const request = params => {
    return activityVisitorList({ activityId: id, reviewId: aduitId, key: visitorKey, ...params });
  };

  const handleConfirm = obj => {
    dispatch({
      type: 'activityManage/importVisitors',
      payload: {
        obj,
        reload,
      },
    });
  };
  const callback = res => {
    if (getVisitorNum) {
      getVisitorNum(res.data.totalItem);
    }
    return res.data;
  };
  return (
    <>
      <ModalImports handleConfirm={handleConfirm} />
      <Form.Item {...formItemLayout} label="体验者信息">
        {!isLook && (
          <Row justify="space-between">
            <Col>
              <Form layout="inline" form={addForm} onFinish={onFinish} name="itemform">
                <Form.Item
                  name="realName"
                  required
                  rules={[{ required: true, message: '请输入姓名' }]}
                >
                  <Input style={{ width: 140 }} placeholder="请输入姓名" />
                </Form.Item>
                <PhoneFormItem name="mobile" />
                <Form.Item name="idType" rules={[{ required: false, message: '请选择证件类型' }]}>
                  <Select style={{ width: 200 }} placeholder="请选择证件类型">
                    {CERTIFICATES_TYPE.map((_, idx) => {
                      return (
                        <Option value={_.key} key={idx}>
                          {_.value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="idNum"
                  required
                  rules={[{ required: false, message: '请输入证件号码' }]}
                >
                  <Input placeholder="请输入证件号码" />
                </Form.Item>
                <Form.Item>
                  <Button type="link" htmlType="submit">
                    添加
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Button
                type="link"
                onClick={() => {
                  handleAdd('MODAL_IMPORT', { visitorKey, activityId: id, reviewId: aduitId });
                }}
              >
                批量导入
              </Button>
            </Col>
          </Row>
        )}

        <ComTable
          ref={tableRef}
          columns={columns}
          request={!visitorKey && !id && !aduitId ? null : request}
          cb={callback}
        />
      </Form.Item>
    </>
  );
};
export default connect(({}) => {
  return {};
})(ExpenriencerInfo);
