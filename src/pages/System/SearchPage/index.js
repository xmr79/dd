/**
 * Author: xh
 * Date: 2020/12/12
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Switch, Button, Tabs, Row, Col, Form, Input, Radio, message, Alert } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 },
};

const Search = props => {
  const {
    dispatch,
    hotDataList,
    hotWordFlag,
    ordinaryHot,
    hotType
  } = props;
  const [hotWordForm] = Form.useForm();

  useEffect(() => {
    dispatch({ type: 'searchPage/hotOpen' });
    dispatch({ type: 'searchPage/hotWordIsAutoUpdate' });
    dispatch({ type: 'searchPage/getHotlist' });
  }, []);
  
  useEffect(() => {
    dispatch({ type: "searchPage/changeState", payload: { ordinaryHot } });
    hotWordForm.setFieldsValue({ordinaryHot});
  }, [ordinaryHot]);

  useEffect(() => {
    dispatch({ type: "searchPage/changeState", payload: { hotDataList } });
    hotWordForm.setFieldsValue(hotDataList);
  }, [hotDataList]);
  
  // 更改热词开启状态
  const hotShowHandle = (key) => {
    dispatch({ type: "searchPage/changeState", payload: { hotWordFlag: key } });
  };
  // 更改普通热词模式
  const ordinaryHotHandle = (key) => {
    dispatch({ type: "searchPage/changeState", payload: { ordinaryHot: key.target.value } });
  };
  // 切换热词类型tab
  const hotTypeHandle = (key) => {
    dispatch({ type: "searchPage/changeState", payload: { hotType: key } });
  };

  // 热词组件
  const HotForm = (props) => {
    const { name } = props;
    const maxCount = name.indexOf("SPECIAL") !== -1 ? 4 : 6;
    const data = hotDataList[name];
    return (
      <>
        <Row className="mt-20">
          <Col span={2} style={{padding: '8px 0 0 30px'}}><div className="mb-20">{name.indexOf("SPECIAL") !== -1 ? "精选热词：" : "普通热词："}</div></Col>
          <Col span={22}>
            { name.indexOf("SPECIAL") !== -1 ? <Alert style={{ width: '34%' }} banner type="info" message={ `最多添加${name.indexOf("SPECIAL") !== -1 ? 4 : 6}个精选热词` } /> : null }
            { name.indexOf("ORDINARY") !== -1 ? <Alert style={{ width: '34%' }} banner type="info" message={ !ordinaryHot ? '已开启手动模式' : '已开启自动模式'} /> : null}
          </Col>
          <Col span={2}></Col>
          <Col span={12}>
          { !ordinaryHot || name.indexOf("SPECIAL") !== -1
            ? <Form.List name={name} initialValue={data}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...layout}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        name={[field.name, 'hotWord']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入内容",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder={`请添加${name.indexOf("SPECIAL") !== -1 ? "精选" : "普通"}热词`} maxLength={8} style={{ width: '60%' }} />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button ml-20"
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  ))}
                  { fields.length < maxCount
                    ? <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: '55%' }}
                          icon={<PlusOutlined />}
                        >
                          添加
                        </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                    : null }
                </>
              )}
            </Form.List> : null }
          </Col>
        </Row>
      </>
    )
  }

  // 完成提交
  const submitHot = () => {
    hotWordForm.validateFields()
    .then(values => {
      dispatch({ type: "searchPage/submitWords", payload: { ...values } });
      dispatch({ type: "searchPage/updateHotWordIsOpen" });
      dispatch({ type: "searchPage/updateAutomatic" });
    })
    .catch(errorInfo => {
      message.error("请输入正确的格式");
    })
  }

  return (
    <>
      <Form
        {...layout}
        form={hotWordForm}
      >
        <Form.Item
          label="是否显示热词"
          name="hotWordFlag"
          extra="热词将以标签形式显示于搜索页"
        >
          <Switch checked={hotWordFlag} onChange={hotShowHandle} />
        </Form.Item>
        { hotWordFlag
         ? <>
          <Form.Item
            label="模式"
            name="ordinaryHot"
            extra={ordinaryHot ? "自动模式下，系统每天更新热词，更新规则：展示各类别下最新的数据，最多展示6条" : "手动模式下，最多添加6个普通热词"}
          >
            <Radio.Group onChange={ordinaryHotHandle} value={ordinaryHot}><Radio value={true}>自动</Radio><Radio value={false}>手动</Radio></Radio.Group>
          </Form.Item>
          <Form.Item
            label="热词类型"
            name="hotType"
          >
            <Tabs onChange={hotTypeHandle} type="card" activeKey={hotType}>
              <TabPane tab="活动" key='ACTIVITY'>
                <HotForm name="ACTIVITY_SPECIAL" />
                <HotForm name="ACTIVITY_ORDINARY" />
              </TabPane>
              <TabPane tab="文章" key='CONTENT'>
                <HotForm name="CONTENT_SPECIAL" />
                <HotForm name="CONTENT_ORDINARY" />
              </TabPane>
              <TabPane tab="专家" key='EXPERT'>
                <HotForm name="EXPERT_SPECIAL" />
                <HotForm name="EXPERT_ORDINARY" />
              </TabPane>
              <TabPane tab="企业" key='ENTERPRISE'>
                <HotForm name="ENTERPRISE_SPECIAL" />
                <HotForm name="ENTERPRISE_ORDINARY" />
              </TabPane>
            </Tabs>
          </Form.Item>
         </> : null }
         <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={submitHot}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};
export default connect(({ searchPage }) => {
  return { ...searchPage };
})(Search);
