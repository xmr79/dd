/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect, Prompt } from 'umi';
import {
  Card,
  Button,
  Form,
  Radio,
  Row,
  Col,
  DatePicker,
  Input,
  Tag,
  Popover,
  Tooltip,
  message,
  Spin,
  Divider,
  Checkbox,
  Modal,
} from 'antd';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import moment from 'moment';
import BasicInfoForm, { getBasicParams } from './BasicInfoForm';
import ActiveInfoForm, { getActiveInfoParams } from './ActiveInfoForm';
import DetailForm, { getdetailFormParams } from './DetailForm';
import ExperiencerInfoForm from './ExperiencerInfoForm';
import { urlConfig } from '@/common';
import QRCode from 'qrcode.react';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
const { RangePicker } = DatePicker;
const Create = props => {
  const {
    location: {
      query: { id, isLook, aduitId, auditStatus, visitorKey },
    },
    loading,
    aloading = false,
    mobile,
    dispatch,
    dataModal,
    BaseProvinceList,
    activityDetail,
    tutorAllLists,
    dloading,
    currentUser: { userType, username },
    activityAllSortList,
  } = props;

  useEffect(() => {
    console.log(visitorKey);
  }, [visitorKey]);

  const isHuiXian = id || aduitId;
  const [visitorNum, setVisitorNum] = useState(0);
  const [needConfirm, setneedConfirm] = useState(false);
  const [basicForm] = Form.useForm();
  const [activeInfoForm] = Form.useForm();
  const [detailForm] = Form.useForm();

  const showVisitorList = !id || isLook;
  //回显
  useEffect(() => {
    if (isHuiXian) {
      dispatch({
        type: 'activityManage/getactivityDetail',
        payload: { id, aduitId },
      });
    }
    return () => {
      dispatch({ type: 'activityManage/changeState', payload: { activityDetail: {} } });
    };
  }, []);

  async function getFormValue({ basicFormval, activeInfoFormval, detailFormval }, draft, isyulan) {
    console.log(isyulan);
    const basicRes = await getBasicParams({ value: basicFormval, BaseProvinceList });
    const activeInfoRes = getActiveInfoParams({ value: activeInfoFormval });
    const detailFormRes = await getdetailFormParams({ value: detailFormval, draft });
    if (!id && visitorNum < 2) {
      message.error('至少添加2名体验者');
      return false;
    }
    const payload = {
      id,
      ...basicRes,
      ...activeInfoRes,
      ...detailFormRes,
      type: 'TEAM',
      visitorKey,
    };
    if (isyulan) {
      const res = await dispatch({
        type: 'activityManage/activityPreview',
        payload: {
          activityVO: payload,
          id: aduitId,
        },
      });
      return res;
    } else {
      const res = await dispatch({
        type: draft ? 'activityManage/saveDraftActivity' : 'activityManage/saveActivity',
        payload: {
          activityVO: payload,
          id,
          aduitId,
        },
      });
      return res;
    }
  }

  const handleSubmit = async (isyulan = false) => {
    try {
      //基本信息
      const basicFormval = await basicForm.validateFields();

      // 活动信息
      const activeInfoFormval = await activeInfoForm.validateFields();

      // 活动详情
      const detailFormval = await detailForm.validateFields();
      setneedConfirm(false);
      if (isyulan) {
        const res = await getFormValue(
          { basicFormval, activeInfoFormval, detailFormval },
          false,
          isyulan,
        );
        const { data } = res;
        if (data) {
          const url = `${urlConfig.activityPreview}?status=WAIT_PUBLISH&id=${data}`;

          Modal.info({
            title: '打开微信小程序扫码预览',
            className: 'cms-code-preview',
            content: <QRCode value={url} />,
          });
        }
      } else {
        getFormValue({ basicFormval, activeInfoFormval, detailFormval }, false, isyulan);
      }

      // console.log(payload);
    } catch (error) {
      console.log(error);
      if (typeof error === 'object') {
        message.error(error.errorFields[0].errors[0]);
      }
    }
  };
  const handleSaveDraft = () => {
    const basicFormval = basicForm.getFieldsValue();
    const activeInfoFormval = activeInfoForm.getFieldsValue();
    const detailFormval = detailForm.getFieldsValue();
    if (!basicFormval.title) {
      message.error('请填写标题');
      return false;
    }
    setneedConfirm(false);
    getFormValue({ basicFormval, activeInfoFormval, detailFormval }, true, false);
  };

  const handleAudit = () => {};
  const getVisitorNum = num => {
    setVisitorNum(num);
  };
  return (
    <>
      <Spin spinning={aloading}>
        <Form.Provider
          onFormChange={(name, obj) => {
            if (name === 'itemform' || name === 'importForm') {
              setneedConfirm(false);
            } else {
              setneedConfirm(true);
            }
            const { changedFields } = obj;
            if (changedFields[0].name[0] === 'tutorVOS') {
              const tutorVOS = changedFields[0].value;
              const arr = tutorAllLists.filter(_ => tutorVOS.includes(_.id));

              let html = '';
              for (let i = 0; i < arr.length; i++) {
                const _ = arr[i];
                html += `<div><p><span>${i + 1}.</span>${_.name}</p>${
                  _.domainIntroduction ? `<div>${_.domainIntroduction}</div>` : ''
                }${_.introduction ? `<div>${_.introduction}</div>` : ''}</div>`;
              }
              detailForm.setFieldsValue({
                characterIntroduction: BraftEditor.createEditorState(html),
              });
            }
          }}
        >
          <Divider orientation="left">基本信息</Divider>
          <BasicInfoForm form={basicForm} isHuiXian={isHuiXian} />
          <Divider orientation="left">活动信息</Divider>
          <ActiveInfoForm form={activeInfoForm} isHuiXian={isHuiXian} />
          {showVisitorList && <Divider orientation="left">体验者信息</Divider>}
          {showVisitorList && (
            <ExperiencerInfoForm
              id={id}
              aduitId={aduitId}
              visitorKey={visitorKey}
              setneedConfirm={setneedConfirm}
              getVisitorNum={getVisitorNum}
              formItemLayout={formItemLayout}
              isLook={!!isLook}
            />
          )}

          <Divider orientation="left">活动详情</Divider>
          <DetailForm form={detailForm} isHuiXian={isHuiXian} />
          <Form name="1">
            {
              <div className="FormSavebtn">
                {isLook !== '1' && (
                  <Button className="ml-10" loading={dloading} onClick={handleSaveDraft}>
                    保存为草稿
                  </Button>
                )}
                {isLook !== '1' && (
                  <Button
                    className="ml-10"
                    onClick={() => {
                      handleSubmit(true);
                    }}
                  >
                    预览
                  </Button>
                )}
                {isLook !== '1' && (
                  <Button
                    className="ml-10"
                    type="primary"
                    loading={loading}
                    onClick={() => {
                      handleSubmit(false);
                    }}
                  >
                    提交审核
                  </Button>
                )}
                {auditStatus === 'WAIT_REVIEW' && userType === 'SYSTEM' && (
                  <Button className="ml-10" type="primary" onClick={handleAudit}>
                    审核
                  </Button>
                )}
                <Button
                  className="ml-10"
                  onClick={() => {
                    history.go(-1);
                  }}
                >
                  取消
                </Button>
              </div>
            }
          </Form>
        </Form.Provider>
        {!isLook && (
          <Prompt
            when={needConfirm}
            message={() => window.confirm('离开当前页面将不做任何保存，确认离开当前页面吗?')}
          />
        )}
      </Spin>
    </>
  );
};
export default connect(({ loading, personalCenter, global, common, activityManage, user }) => {
  return {
    loading: loading.effects['activityManage/saveActivity'],
    dloading: loading.effects['activityManage/saveDraftActivity'],
    aloading: loading.effects['activityManage/getactivityDetail'],
    mobile: personalCenter.mobile,
    dataModal: global.dataModal,
    BaseProvinceList: common.BaseProvinceList,
    activityDetail: activityManage.activityDetail,
    tutorAllLists: common.tutorAllLists,
    currentUser: user.currentUser,
    activityAllSortList: common.activityAllSortList,
  };
})(Create);
