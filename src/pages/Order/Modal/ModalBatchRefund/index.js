import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Alert, Row, Col, Table, message } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import moment from 'moment';
import SortFormItem from '@/components/FormItems/SortFormItem';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const { Search } = Input;
const ModalBatchRefund = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    reload,
  } = props;
  const [form] = Form.useForm();
  const [arr, setArr] = useState([]);
  const [current, setCurrent] = useState({});
  useEffect(() => {
    if (!modalShow) {
      setArr([]);
      setCurrent({});
    }
    if (modalShow && modalType === 'MODAL_BATCHREFUND') {
      form.resetFields();
    }
  }, [modalShow]);
  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleOk = () => {
    if (arr.length <= 0) {
      message.error('请搜索符合批量退款的活动');
      return false;
    }
    if (!current.id) {
      message.error('请勾选要进行批量退款的场次');
      return false;
    }
    if (current.id) {
      dispatch({
        type: 'handle/batchRefund',
        payload: {
          params: { activitySessionId: current.id, title: current.title },
          reload,
        },
      });
    }
  };

  //
  const columns = [
    {
      title: '支付订单数',
      align: 'center',
      dataIndex: 'appointmentCount',
    },
    {
      title: '预约人数',
      align: 'center',
      dataIndex: 'appointmentCount',
    },
    {
      title: '支付金额（元）',
      align: 'center',
      dataIndex: 'payAmount',
      render: t => {
        return t ? t : 0;
      },
    },
  ];

  const handleSession = item => {
    setCurrent(item);
  };

  const normalizecallback = async (value, prevValue, prevValues) => {
    setArr([]);
    const res = await dispatch({
      type: 'common/activityGetByTitle',
      payload: {
        id: value,
      },
    });
    const { activitySessionVOS = [] } = res;
    const kxactivitySessionVOS = activitySessionVOS.filter(
      _ => !(_.startTime > moment().valueOf && appointmentCount > 0),
    );

    if (kxactivitySessionVOS.length <= 0) {
      message.error('无符合的场次');
      return false;
    }
    setCurrent({});
    setArr(kxactivitySessionVOS);
  };
  return (
    <Modal
      destroyOnClose={true}
      width="800px"
      title="批量退款"
      maskClosable={false}
      visible={modalType === 'MODAL_BATCHREFUND' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Alert
        message={
          <div>
            适用于活动无法正常举行，对某个已报名活动批量退款的场景，通过该处操作退款，不收取退款手续费
          </div>
        }
        type="info"
        showIcon
        className="mb-20"
      />

      <Form form={form} {...layout}>
        {/* <Form.Item label="活动标题" help="请输入活动标题后点击搜索按钮">
          <Search placeholder="请输入活动标题" onSearch={onSearch} />
        </Form.Item> */}
        <SortFormItem
          label="活动标题"
          name="title"
          type="ACCOUTLIST"
          mtype="activeity"
          mode={null}
          normalizecallback={normalizecallback}
          extraParams={{ isNotFinished: true }}
          render={i => {
            return (
              <>
                {`${i.name}`}
                <span style={{ color: '#999' }}>{`（${
                  i.type === 'TEAM' ? '团体活动；' : ''
                }活动时间：${moment(i.minStartDate).format('MM-DD')}-${moment(
                  i.maxStartDate,
                ).format('MM-DD')}）`}</span>
              </>
            );
          }}
        />
        <Form.Item label="可退场次">
          <Row>
            {arr.map((_, idx) => {
              return (
                <Col
                  key={_.id}
                  onClick={() => {
                    handleSession(_);
                  }}
                >
                  <div
                    className={classNames(styles.item, current.id === _.id ? styles.active : '')}
                  >
                    {_.name}
                  </div>
                </Col>
              );
            })}
          </Row>
        </Form.Item>
        {current.id && (
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={[
                {
                  id: current.id,
                  appointmentCount: current.appointmentCount,
                  payAmount: current.payAmount,
                  payOrderCount: current.payOrderCount,
                },
              ]}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalBatchRefund);
