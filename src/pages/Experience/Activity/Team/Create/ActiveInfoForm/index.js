/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, DatePicker, Popover } from 'antd';
import PriceFormItem from '@/components/FormItems/PriceFormItem';
import moment from 'moment';
const { RangePicker } = DatePicker;

export const getActiveInfoParams = ({ value }) => {
  const { activetime } = value;
  let activitySessionVOS = [];
  if (activetime && activetime.length == 2) {
    const startTime = activetime[0].valueOf();
    const endTime = activetime[1].valueOf();
    const mstart = moment(startTime);
    activitySessionVOS = [
      {
        name: `${mstart.format('MM-DD')} ${mstart.format('dddd')} ${mstart.format('HH:mm')}`,
        startTime,
        endTime,
        maxQuota: '1',
      },
    ];
  }

  const payload = {
    ...value,
    activitySessionVOS,
  };
  delete payload['activetime'];
  return payload;
};
const ExtraButton = () => {
  return (
    <Popover
      placement="right"
      content={
        <div>
          <p>1.距离活动开始前36小时（不含）以上退款的，不收取手续费；</p>
          <p>2.距离活动开始前36小时内退款的，按照活动费用的20%收取退款手续费；</p>
          <p>3.活动开始后，不予退款。</p>
        </div>
      }
      title="活动规则"
    >
      <Button type="link">查看退款规则</Button>
    </Popover>
  );
};
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 12 } };
const ActiveInfoForm = props => {
  const { form, onFinishFailed, activityDetail, isHuiXian } = props;

  useEffect(() => {
    if (isHuiXian && JSON.stringify(activityDetail) !== '{}') {
      const { activitySessionVOS = [], cost } = activityDetail;
      let activetime = [];
      if (activitySessionVOS.length === 1) {
        activetime = [
          moment(activitySessionVOS[0].startTime),
          moment(activitySessionVOS[0].endTime),
        ];
      }
      const initialValues = {
        activetime,
        cost,
      };
      form.setFieldsValue(initialValues);
    }
  }, [activityDetail]);

  const disabledDate = current => {
    return (
      current &&
      current <
        moment()
          .add(-1, 'days')
          .endOf('day')
    );
  };
  const validator = () => {};
  return (
    <>
      <Form {...formItemLayout} form={form} name="activeInfoForm" onFinishFailed={onFinishFailed}>
        <Form.Item
          label="活动时间"
          name="activetime"
          required
          rules={[
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject('请输入活动时间');
                }
                if (value[1].valueOf() <= new Date().valueOf()) {
                  return Promise.reject('活动结束时间应大于当前时间');
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <RangePicker showTime disabledDate={disabledDate} format={'YYYY-MM-DD HH:mm'} />
        </Form.Item>
        <Form.Item label="活动费用" required>
          <PriceFormItem
            required
            name="cost"
            min={0}
            max={500000}
            width="300px"
            noStyle
            placeholder="请输入活动费用，限制0-500000元"
          />
          <ExtraButton />
        </Form.Item>
      </Form>
    </>
  );
};
export default connect(({ activityManage }) => {
  return { activityDetail: activityManage.activityDetail };
})(ActiveInfoForm);
