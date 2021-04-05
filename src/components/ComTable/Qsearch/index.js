import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Form, Button, DatePicker, Select, Input, Card, Radio } from 'antd';
import styles from './index.less';
import { enumRecentRechargeTime } from '@/constants';
import { arrayToObj, getTimeType, getDaysBetween } from '@/utils/utils';
import moment from 'moment';
import { getSearchVal } from '@/components/ComTable/utils';
import SortFormItem from '@/components/FormItems/SortFormItem';
const { RangePicker } = DatePicker;
const { Option } = Select;
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');

const strToundefined = obj => {
  for (let key in obj) {
    if (obj[key] === '') {
      obj[key] = undefined;
    }
  }
  return obj;
};
const Qsearch = forwardRef((props, sref) => {
  const { onSearch, searchColums = [], extraBtns } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    let searchVal = getSearchVal(searchColums);
    if (JSON.stringify(searchVal) !== '{}') {
      form.setFieldsValue(searchVal);
    }
  }, []);
  const handleSubmit = values => {
    const val = strToundefined(values);
    onSearch({ ...val });
  };
  useImperativeHandle(sref, () => ({
    form,
  }));
  return (
    <div ref={sref} className="ck-search">
      <Form form={form} layout="inline" onFinish={handleSubmit}>
        {searchColums.map((item, index) => {
          const {
            name,
            dataname,
            rules = [],
            ref,
            type,
            status,
            placeholder = '请输入',
            isSearch = false,
            allkey = '全部',
            mtype = 'activeity',
            sortType = 'SORT',
            maxTag,
            mode = null,
            isHidden = false,
            valueEnumKey = 'value',
          } = item;
          if (isHidden) {
            return false;
          }
          switch (type) {
            //范围类型
            case 'minMax':
              return (
                <Form.Item className="mb-15" key={index} label={name}>
                  <Row type="flex" justify="start" align="middle">
                    <Form.Item name={dataname.min}>
                      <Input placeholder={placeholder.min} />
                    </Form.Item>
                    <span className="mr-15" style={{ marginTop: '-15px' }}>
                      ~
                    </span>
                    <Form.Item name={dataname.max}>
                      <Input placeholder={placeholder.max} />
                    </Form.Item>
                  </Row>
                </Form.Item>
              );
            //input类型
            case 'normal':
              return (
                <Form.Item
                  name={dataname}
                  className="mb-15"
                  key={index}
                  label={name}
                  rules={item.rules}
                >
                  <Input style={{ width: 180 }} placeholder={placeholder} />
                </Form.Item>
              );
            //开始结束时间类型
            case 'times':
              const {
                time,
                bTime,
                eTime,
                isTab = false,
                isInpt = true,
                isDateMonth = false,
                sformat = 'YYYY/MM/DD',
                dateType = 'day',
                rules = [],
                tabs = [
                  {
                    value: '7d',
                    name: '最近7天',
                  },
                  {
                    value: '30d',
                    name: '最近30天',
                  },
                ],
                isTodayMore = true,
                tabTypeKey = 'type',
                setDisabledDate,
              } = dataname;
              const [format, setFormat] = useState(sformat);
              const onChange = val => {
                let obj = {};
                let starttime;
                let endtime;
                starttime = val ? val[0].startOf(dateType).valueOf() : null;
                endtime = val ? val[1].endOf(dateType).valueOf() : null;
                if (isDateMonth) {
                  const days = getDaysBetween(starttime, endtime);
                  if (days > 31) {
                    starttime = val ? val[0].startOf('month').valueOf() : null;
                    endtime = val ? val[1].endOf('month').valueOf() : null;
                    setFormat('YYYY/MM');
                  } else {
                    setFormat('YYYY/MM/DD');
                  }
                }
                obj[bTime] = starttime;
                obj[eTime] = endtime;
                if (isTab) {
                  obj[tabTypeKey] = val ? getTimeType(val, enumRecentRechargeTime, dateType) : null;
                }
                form.setFieldsValue(obj);
              };

              const handleChangeTime = e => {
                let obj = {};
                obj[time] = [
                  moment(mapRecentRechargeTime[e.target.value].value[0]),
                  moment(mapRecentRechargeTime[e.target.value].value[1]),
                ];
                obj[bTime] = mapRecentRechargeTime[e.target.value].value[0];
                obj[eTime] = mapRecentRechargeTime[e.target.value].value[1];
                obj[tabTypeKey] = e.target.value;
                form.setFieldsValue(obj);
                onSearch(form.getFieldsValue());
              };

              return (
                <Row key={index}>
                  <Form.Item name={time} className="mb-15" label={name} rules={rules}>
                    <RangePicker
                      disabledDate={setDisabledDate ? setDisabledDate : null}
                      style={{ width: 280 }}
                      onChange={onChange}
                      allowClear={false}
                      format={format}
                    />
                  </Form.Item>
                  {isTab && (
                    <Form.Item name="type">
                      <Radio.Group onChange={handleChangeTime}>
                        {tabs.map((_, idx) => {
                          return (
                            <Radio.Button key={idx} value={_.value}>
                              {_.name}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </Form.Item>
                  )}

                  <Form.Item style={{ display: 'none' }} name={bTime}>
                    <Input />
                  </Form.Item>
                  <Form.Item style={{ display: 'none' }} name={eTime}>
                    <Input />
                  </Form.Item>
                </Row>
              );
            //状态类型
            case 'status':
              return (
                <Form.Item name={dataname} className="mb-15" key={index} label={name}>
                  <Select
                    showSearch={isSearch}
                    style={{ width: 180 }}
                    placeholder="全部"
                    filterOption={
                      isSearch
                        ? (input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        : null
                    }
                  >
                    <Option value="">{allkey}</Option>
                    {status.map((i, idx) => {
                      return (
                        <Option key={idx} value={i.key}>
                          {i[valueEnumKey]}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            //状态类型
            case 'sort':
              return (
                <SortFormItem
                  key={index}
                  width={180}
                  mode={mode}
                  label={name}
                  name={dataname}
                  type={sortType}
                  mtype={mtype}
                  maxTag={maxTag}
                  isAll={true}
                />
              );
          }
        })}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            className="ml-15"
            onClick={() => {
              form.resetFields();
              form
                .validateFields()
                .then(values => {
                  let searchVal = getSearchVal(searchColums);
                  if (JSON.stringify(searchVal) !== '{}') {
                    form.setFieldsValue(searchVal);
                    onSearch({ ...values, ...searchVal });
                  } else {
                    onSearch(values);
                  }
                })
                .catch(errorInfo => {});
            }}
          >
            重置
          </Button>
          {extraBtns}
        </Form.Item>
      </Form>
    </div>
  );
});

export default Qsearch;
