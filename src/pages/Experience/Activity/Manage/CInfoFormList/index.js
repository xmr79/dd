/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Button, Space, DatePicker, Row, Col, message, Empty, Tooltip } from 'antd';
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import Cycle from './Cycle';
import classnames from 'classnames';
import moment from 'moment';
import { numLimit, isRealNum } from '@/utils/utils';
import ModalYseTime from '@/pages/Experience/Activity/Modals/ModalYseTime';
const { RangePicker } = DatePicker;
const CInfo = props => {
  const {
    form,
    atype,
    isEdit,
    activityDetail,
    isgroupBuy,
    cinfovalue,
    auditStatus,
    dispatch,
  } = props;
  const { status } = activityDetail;
  const [isSet, setSet] = useState({ is: false });
  const [allval, setAllval] = useState(null);
  const handleSet = type => {
    setSet({ is: true, type });
  };
  const handleSave = () => {
    if (!isRealNum(allval)) {
      message.error('请输入数字');
      return false;
    }
    let info = form.getFieldValue('activitySessionVOS');
    info = info.map((_, idx) => {
      const obj = _ ? _ : {};
      const { id, payOrderCount, endTime, appointmentCount } = obj;
      let isEnd = false;
      if (id) {
        isEnd =
          id &&
          auditStatus !== 'WAIT_SUBMIT' &&
          (endTime <= moment().valueOf() || payOrderCount > 0 || appointmentCount > 0);
      }
      if (!isEnd) {
        obj[isSet.type] = allval;
      }

      return obj;
    });
    form.setFieldsValue({
      activitySessionVOS: info,
    });
    handlequxiao();
  };
  const handlequxiao = () => {
    setSet({ is: false });
  };

  function gettime(start) {
    return start.endOf('day').valueOf();
  }
  const seTimeValidator = (rule, value) => {
    if (!value) {
      return Promise.reject('请输入活动开始时间');
    }
    // if (!value[0].isSame(value[1], 'day')) {
    //   return Promise.reject('活动时间请设置在一天之内');
    // } else
    if (value[0].valueOf() === value[1].valueOf()) {
      return Promise.reject('结束时间应大于开始时间');
    } else {
      return Promise.resolve();
    }
  };

  const disabledDate = current => {
    return (
      current &&
      current <
        moment()
          .add(-1, 'days')
          .endOf('day')
    );
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

  const handleRes = val => {
    const { mystartTime, mysendTime } = val;
    let info = form.getFieldValue('activitySessionVOS');
    info = info.map((_, idx) => {
      const obj = _ ? _ : {};
      const { id, startTime, endTime, payOrderCount, appointmentCount, seTime } = obj;
      const nstart = seTime.length === 2 ? seTime[0].valueOf() : undefined;

      let isEnd = false;
      if (id) {
        isEnd =
          id &&
          auditStatus !== 'WAIT_SUBMIT' &&
          (endTime <= moment().valueOf() || payOrderCount > 0 || appointmentCount > 0);
      }
      if (!isEnd) {
        const start = moment(nstart).add(-mystartTime, 'minutes');
        const end = moment(nstart).add(-mysendTime, 'minutes');
        obj.appointmentStartTime = start.valueOf();
        obj.appointmentEndTime = end.valueOf();
        obj.yseTime = [start, end];
      }

      return obj;
    });
    form.setFieldsValue({
      activitySessionVOS: info,
    });
    dispatch({ type: 'global/closeModal' });
  };
  return (
    <>
      <ModalYseTime handleRes={handleRes} />
      {atype && <Cycle form={form} isEdit={isEdit} activityDetail={activityDetail} />}
      <Form.List name="activitySessionVOS">
        {(fields, { add, remove }) => {
          return (
            <Row>
              <Col offset={4} span={18} className={styles.yunfeitableshow}>
                {!atype && (
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (fields.length >= 30) {
                          message.error('最多添加30个场次');
                          return false;
                        }
                        add();
                      }}
                      ghost
                    >
                      <PlusOutlined /> 添加场次信息
                    </Button>
                  </Form.Item>
                )}
                <div className={styles.itemhead}>
                  <div className={classnames(styles.tableitem, styles.name)}>场次名称</div>
                  {!isgroupBuy && (
                    <div className={classnames(styles.tableitem, styles.seTime)}>
                      <span className="required">*</span> 预约时间
                    </div>
                  )}
                  <div className={classnames(styles.tableitem, styles.seTime)}>
                    <span className="required">*</span> 活动时间
                  </div>

                  <div className={classnames(styles.tableitem, styles.maxQuota)}>
                    <span className="required">*</span>活动名额
                  </div>
                  {!atype && isgroupBuy && (
                    <div className={classnames(styles.tableitem, styles.validQuota)}>
                      <span className="required">*</span> 有效预约人数
                      <Tooltip title={<div>团购活动须设置有效预约人数，达到该人数限制后成团</div>}>
                        <InfoCircleOutlined className="ml-10" />
                      </Tooltip>
                    </div>
                  )}

                  {isEdit && (
                    <div className={classnames(styles.tableitem, styles.wbhnum)}>已报名/已核销</div>
                  )}
                  <div className={classnames(styles.tableitem, styles.actions)}>操作</div>
                </div>
                {fields.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

                {fields.map((field, index) => {
                  let info = form.getFieldValue('activitySessionVOS');
                  const itemInfo = info.find((_, idx) => idx === index);
                  const { id, payOrderCount, endTime, appointmentCount } = itemInfo ? itemInfo : {};
                  let isEnd = false;
                  if (itemInfo) {
                    isEnd =
                      id &&
                      auditStatus !== 'WAIT_SUBMIT' &&
                      (endTime <= moment().valueOf() || payOrderCount > 0 || appointmentCount > 0);
                  }

                  return (
                    <div className={styles.item} key={field.key}>
                      <div
                        className={classnames(
                          styles.tableitem,
                          styles.name,
                          atype ? styles.bhnum : '',
                        )}
                      >
                        {atype || isEnd ? (
                          <div style={{ marginBottom: '24px' }}>{itemInfo.name}</div>
                        ) : (
                          <Form.Item
                            name={[field.name, 'name']}
                            fieldKey={[field.fieldKey, 'name']}
                            rules={[{ required: true, message: '请输入场次名称' }]}
                          >
                            <Input disabled={atype || isEnd} placeholder="请输入场次名称" />
                          </Form.Item>
                        )}
                      </div>
                      {!isgroupBuy && (
                        <div className={classnames(styles.tableitem, styles.seTime)}>
                          <Form.Item
                            name={[field.name, 'yseTime']}
                            fieldKey={[field.fieldKey, 'yseTime']}
                            // rules={[
                            //   {
                            //     // validator: yseTimeValidator,
                            //   },
                            // ]}
                          >
                            <RangePicker
                              disabledDate={disabledDate}
                              disabled={isEnd}
                              showTime
                              format="MM-DD HH:mm"
                            />
                          </Form.Item>
                        </div>
                      )}

                      <div className={classnames(styles.tableitem, styles.seTime)}>
                        <Form.Item
                          name={[field.name, 'seTime']}
                          fieldKey={[field.fieldKey, 'seTime']}
                          rules={[
                            {
                              validator: seTimeValidator,
                            },
                          ]}
                        >
                          <RangePicker
                            disabledDate={disabledDate}
                            disabled={atype || isEnd}
                            showTime
                            format="MM-DD HH:mm"
                          />
                        </Form.Item>
                      </div>

                      <div className={classnames(styles.tableitem, styles.maxQuota)}>
                        <Form.Item
                          name={[field.name, 'maxQuota']}
                          fieldKey={[field.fieldKey, 'maxQuota']}
                          rules={[
                            { required: true, message: '请输入活动名额' },
                            {
                              validator: (rule, value) => {
                                if (value && numLimit(value, 1, 1000, 'integer')) {
                                  return Promise.reject('限制1~1000的整数');
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            },
                          ]}
                        >
                          <Input disabled={isEnd} placeholder="活动名额" />
                        </Form.Item>
                      </div>
                      {!atype && isgroupBuy && (
                        <div className={classnames(styles.tableitem, styles.validQuota)}>
                          <Form.Item
                            name={[field.name, 'validQuota']}
                            fieldKey={[field.fieldKey, 'validQuota']}
                            rules={[
                              { required: true, message: '请输入有效预约人数' },
                              {
                                validator: (rule, value) => {
                                  if (value && numLimit(value, 1, 1000, 'integer')) {
                                    return Promise.reject('限制1~1000的整数');
                                  } else {
                                    return Promise.resolve();
                                  }
                                },
                              },
                            ]}
                          >
                            <Input disabled={isEnd} placeholder="预约人数" />
                          </Form.Item>
                        </div>
                      )}

                      {isEdit && (
                        <div className={classnames(styles.tableitem, styles.wbhnum, styles.bhnum)}>
                          <Form.Item
                            name={[field.name, 'bhnum']}
                            fieldKey={[field.fieldKey, 'bhnum']}
                          >
                            <Input disabled={true} />
                          </Form.Item>
                        </div>
                      )}

                      <div className={classnames(styles.tableitem, styles.actions)}>
                        <Form.Item>
                          {isEnd ? (
                            <div style={{ width: '100px' }}>--</div>
                          ) : (
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  );
                })}
                <Row align="middle" className="mt-10">
                  <Col>批量设置：</Col>
                  {isSet.is ? (
                    <Row align="middle">
                      <Col>
                        <Input
                          placeholder="请输入"
                          onChange={e => {
                            setAllval(e.target.value);
                          }}
                        />
                      </Col>
                      <Col>
                        <Button type="link" onClick={handleSave}>
                          保存
                        </Button>
                      </Col>
                      <Col>
                        <Button type="link" onClick={handlequxiao}>
                          取消
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <Col>
                        <Button
                          type="link"
                          onClick={() => {
                            handleSet('maxQuota');
                          }}
                        >
                          活动名额
                        </Button>
                      </Col>
                      {!isgroupBuy && (
                        <Col>
                          <Button
                            type="link"
                            onClick={() => {
                              handleAdd('MODAL_YSETIME');
                            }}
                          >
                            预约时间
                          </Button>
                        </Col>
                      )}

                      {!atype && isgroupBuy && (
                        <Col>
                          <Button
                            type="link"
                            onClick={() => {
                              handleSet('validQuota');
                            }}
                          >
                            有效预约人数
                          </Button>
                        </Col>
                      )}
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          );
        }}
      </Form.List>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CInfo);
