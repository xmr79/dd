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

import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import AreaFormItem from '@/components/FormItems/AreaFormItem';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import SortFormItem from '@/components/FormItems/SortFormItem';
import PriceFormItem from '@/components/FormItems/PriceFormItem';
import ModalEditMobile from '@/pages/System/Modals/ModalEditMobile.js';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
import CInfoFormList from '@/pages/Experience/Activity/Manage/CInfoFormList';
import { getmapLocation, getssqname } from '@/utils/utils';
import ShareSets from '@/components/FormItems/ShareSets';
import ModalAudit from '@/pages/Experience/Activity/Modals/ModalAudit';
import { sponsorType, ACTIVITY_AUDIT_REASON } from '@/constants';
import MaterialFormItem from '@/components/FormItems/MaterialFormItem';
import ModalMaterial from '@/pages/Modals/ModalMaterial';
import ModalUploadVideo from '@/pages/System/SourceHouse/Modals/ModalUploadVideo';
import { urlConfig } from '@/common';
import QRCode from 'qrcode.react';
const { RangePicker } = DatePicker;

const tkList = [
  {
    value: false,
    name: '否',
  },
  {
    value: true,
    name: '是',
  },
];

const extraButton = (
  <Popover
    placement="right"
    content={
      <div>
        <h4>普通活动</h4>
        <p>1.距离活动开始前36小时（不含）以上退款的，不收取手续费；</p>
        <p>2.距离活动开始前36小时内退款的，按照活动费用的20%收取退款手续费；</p>
        <p>3.活动开始后，不予退款。</p>
        <h4>团购活动</h4>
        <p>1.预约人数未达到团购活动活动最低人数限制时，不收取退款手续费；</p>
        <p>2.有效预约时间范围内申请退款时，不收取退款手续费；</p>
        <p>3.活动预约时间结束后申请退款时，按照活动费用的35%收取退款手续费；</p>
        <p>4.活动开始后，不予退款。</p>
      </div>
    }
    title="活动规则"
  >
    <Button type="link">查看退款规则</Button>
  </Popover>
);
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 12 } };
const Create = props => {
  const {
    location: {
      query: { id, isLook, aduitId, auditStatus },
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

  const isHuiXian = id || aduitId;

  const [needConfirm, setneedConfirm] = useState(false);

  const [isTK, setIsTK] = useState(false);
  const [cinfovalue, setCinfovalue] = useState([]);
  const [atype, setAtype] = useState(false);
  const [isgroupBuy, setisgroupBuy] = useState(false);
  useEffect(() => {
    dispatch({ type: 'personalCenter/getMobile' });
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
  useEffect(() => {
    if (!isHuiXian) {
      form.setFieldsValue({
        contact: mobile,
      });
    }
  }, [mobile]);
  useEffect(() => {
    if (isHuiXian && JSON.stringify(activityDetail) !== '{}') {
      const {
        title,
        subtitle,
        needIdNumber,
        groupBuy,
        periodic,

        activityDetailVO,
        activitySessionVOS,
        activityTagVOS = [],
        categoryVOS,
        provinceId,
        cityId,
        areaId,
        address,
        cost,
        appointmentStartTime,
        appointmentEndTime,
        imgUrl,
        videoUrl,
        coverUrl,
        tutorVOS,
        periodicJson = '{}',
        sharingSettings = '{}',
      } = activityDetail;
      const sharingSettingsObj = JSON.parse(sharingSettings);
      const { shareTitle, shareDes, shareImgUrl } = sharingSettingsObj;
      // 设置活动类型
      setAtype(periodic);
      setisgroupBuy(groupBuy);
      setCinfovalue(activitySessionVOS);
      const {
        brandStory,
        characterIntroduction,
        experienceProcess,
        experienceStore,
        activityDescription,
        commonProblems,
        traffic,
        tips,
        contact,
      } = activityDetailVO;
      const periodicInfo = JSON.parse(periodicJson);
      const { fw = [], pl, weeks, hdtimes = [], months } = periodicInfo;
      const initialValues = {
        shareTitle,
        shareDes,
        // shareImgUrl: shareImgUrl ? [shareImgUrl] : [],
        shareImgUrl: shareImgUrl
          ? shareImgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],
        fw: fw.map(_ => moment(_)),
        pl,
        weeks,
        months,
        hdtimes: hdtimes.map(_ => {
          return {
            time: _.time.map(item => moment(item)),
          };
        }),
        title,
        subtitle,
        cost,
        groupBuy,
        periodic,
        brandStory: BraftEditor.createEditorState(brandStory),
        experienceStore: BraftEditor.createEditorState(experienceStore),
        activityDescription: BraftEditor.createEditorState(activityDescription),
        experienceProcess: BraftEditor.createEditorState(experienceProcess),
        characterIntroduction: BraftEditor.createEditorState(characterIntroduction),
        commonProblems,
        traffic,
        tips,
        activitySessionVOS: activitySessionVOS.map(_ => {
          return {
            ..._,
            seTime: [moment(_.startTime), moment(_.endTime)],
            yseTime: [moment(_.appointmentStartTime), moment(_.appointmentEndTime)],
            bhnum: `${_.appointmentCount ? _.appointmentCount : 0}/${
              _.usedCount ? _.usedCount : 0
            }`,
          };
        }),
        activityTagVOS: activityTagVOS.map(_ => _.id),
        categoryVOS: categoryVOS.map(_ => _.id),
        tutorVOS: tutorVOS.map(_ => _.id),

        ssq: {
          province: provinceId,
          city: cityId,
          district: areaId,
        },
        address,
        needIdNumber: needIdNumber ? [1, 2, 3] : [1, 2],
        imgUrl: imgUrl
          ? imgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],
        videoUrl: videoUrl
          ? videoUrl.split(',').map(_ => {
              return { url: _, coverUrl: coverUrl };
            })
          : [],
        // videoUrl: [JSON.parse(videoUrl)],
        yuyuetime: [moment(appointmentStartTime), moment(appointmentEndTime)],
        contact,
      };
      form.setFieldsValue(initialValues);
    }
  }, [activityDetail]);

  function getEditorHTNL(obj) {
    return obj.toHTML();
  }

  function EditorTS(arr) {
    let is = true;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (getEditorHTNL(element.val) === '<p></p>') {
        message.error(`${element.name}不能为空`);
        is = false;
        break;
      }
    }
    return is;
  }

  //提交表单--------------------------------
  async function getFormValue(values, draft, isyulan) {
    const {
      activitySessionVOS = [],

      categoryVOS = [],
      brandStory,
      characterIntroduction,
      experienceProcess,
      experienceStore,
      activityDescription,
      commonProblems,

      groupBuy,
      traffic,
      tips,
      ssq,
      yuyuetime,
      imgUrl,
      videoUrl,
      fw = [],
      pl,
      weeks,
      months,
      hdtimes = [],
      needIdNumber,
      periodic,
      address,
      activityTagVOS = [],
      tutorVOS = [],
      contact,
      shareTitle,
      shareDes,
      shareImgUrl,
    } = values;

    if (!draft && activitySessionVOS.length <= 0) {
      message.error('场次信息不能为空');
      return false;
    }
    function isTime() {
      let is = false;
      if (isgroupBuy) {
        for (let i = 0; i < activitySessionVOS.length; i++) {
          const element = activitySessionVOS[i];
          let start;
          if (id) {
            start = element.startTime;
          } else {
            start = element.seTime[0].valueOf();
          }
          if (isgroupBuy && start < yuyuetime[1].valueOf()) {
            message.error(`${element.name}的活动时间不能早于预约时间的结束时间`);
            is = true;
            break;
          }
          if (element.validQuota - 0 > element.maxQuota) {
            message.error(`${element.name}的有效预约人数不能大于活动名额`);
            is = true;
            break;
          }
        }
      } else {
        for (let i = 0; i < activitySessionVOS.length; i++) {
          const element = activitySessionVOS[i];
          let start;
          let yend;
          // if (id) {
          //   start = element.startTime;
          // } else {
          //   start = element.seTime[0].valueOf();
          // }
          start = element.seTime[0].valueOf();
          yend = element.yseTime[1].valueOf();
          if (start < yend) {
            message.error(`${element.name}的活动时间不能早于预约时间的结束时间`);
            is = true;
            break;
          }
        }
      }

      return is;
    }
    if (!draft && isTime()) {
      return false;
    }
    const obj = getssqname(BaseProvinceList, ssq);
    const position = await getmapLocation({
      address: `${obj.province}${obj.city}${obj.district}${address}`,
      city: ssq.city,
    });

    if (
      !draft &&
      !EditorTS([
        {
          name: '体验点简介',
          val: experienceStore,
        },
        {
          name: '活动介绍',
          val: activityDescription,
        },

        {
          name: '流程安排',
          val: experienceProcess,
        },
      ])
    ) {
      return false;
    }
    let payload = {
      id,
      type: 'NORMAL',
      ...values,
      categoryVOS: categoryVOS.map(_ => {
        return { id: _ };
      }),
      activityTagVOS: activityTagVOS.map(_ => {
        return { id: _ };
      }),
      tutorVOS: tutorVOS
        ? tutorVOS.map(_ => {
            return { id: _ };
          })
        : [],
      activityDetailVO: {
        brandStory: brandStory ? brandStory.toHTML() : undefined,
        experienceProcess: experienceProcess ? experienceProcess.toHTML() : undefined,
        experienceStore: experienceStore ? experienceStore.toHTML() : undefined,
        activityDescription: activityDescription ? activityDescription.toHTML() : undefined,
        characterIntroduction: characterIntroduction ? characterIntroduction.toHTML() : undefined,
        commonProblems,
        traffic,
        tips,
        contact,
      },
      activitySessionVOS: activitySessionVOS.map((_, idx) => {
        const { seTime, yseTime } = _;
        let obj;
        obj = {
          ..._,
          startTime: seTime[0].valueOf(),
          endTime: seTime[1].valueOf(),
          appointmentStartTime: yseTime ? yseTime[0].valueOf() : undefined,
          appointmentEndTime: yseTime ? yseTime[1].valueOf() : undefined,
        };
        delete obj[seTime];
        delete obj[yseTime];
        return obj;
      }),
      provinceId: ssq.province,
      cityId: ssq.city,
      areaId: ssq.district,
      imgUrl: imgUrl ? imgUrl.map(_ => _.url).join(',') : undefined,
      videoUrl: videoUrl ? videoUrl.map(_ => _.url).join(',') : undefined,
      coverUrl: videoUrl ? videoUrl.map(_ => _.coverUrl).join(',') : undefined,
      needIdNumber: !!needIdNumber.includes(3),
      position,
      sharingSettings: JSON.stringify({
        shareTitle,
        shareDes,
        shareImgUrl: shareImgUrl ? shareImgUrl.map(_ => _.url).join(',') : undefined,
        // shareImgUrl: shareImgUrl ? shareImgUrl.join(',') : undefined,
      }),
    };
    if (periodic) {
      payload = {
        ...payload,
        periodicJson: JSON.stringify({
          fw: fw.map(_ => _.valueOf()),
          pl,
          weeks,
          months,
          hdtimes: hdtimes.map(_ => {
            return {
              time: _.time.map(item => item.valueOf()),
            };
          }),
        }),
      };
    } else {
      if (isgroupBuy) {
        payload = {
          ...payload,
          appointmentStartTime: yuyuetime[0].valueOf(),
          appointmentEndTime: yuyuetime[1].valueOf(),
        };
      }
    }
    delete payload['brandStory'];
    delete payload['characterIntroduction'];
    delete payload['experienceProcess'];
    delete payload['experienceStore'];
    delete payload['activityDescription'];

    delete payload['fw'];
    delete payload['hdtimes'];
    delete payload['months'];
    delete payload['weeks'];
    delete payload['pl'];
    delete payload['ssq'];
    delete payload['contact'];

    delete payload['shareTitle'];
    delete payload['shareDes'];
    delete payload['shareImgUrl'];
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
  //提交表单--------------------------------end

  const handleSubmit = values => {
    setneedConfirm(false);
    getFormValue(values, false, false);
  };

  const handleSaveDraft = () => {
    const formValues = form.getFieldsValue([
      'title',
      'subtitle',
      'activitySessionVOS',
      'categoryVOS',
      'brandStory',
      'characterIntroduction',
      'experienceProcess',
      'experienceStore',
      'activityDescription',
      'commonProblems',
      'groupBuy',
      'traffic',
      'tips',
      'ssq',
      'yuyuetime',
      'imgUrl',
      'fw',
      'pl',
      'weeks',
      'months',
      'hdtimes',
      'needIdNumber',
      'periodic',
      'address',
      'activityTagVOS',
      'tutorVOS',
      'contact',
      'shareTitle',
      'shareDes',
      'shareImgUrl',
      'cost',
    ]);
    if (!formValues.title) {
      message.error('请填写标题');
      return false;
    }
    setneedConfirm(false);
    getFormValue(formValues, true, false);
    // form
    //   .validateFields()
    //   .then(values => {
    //     setneedConfirm(false);
    //     getFormValue(values, true);
    //   })
    //   .catch(errorInfo => {});
  };
  // 预览

  const handleYulan = async () => {
    form
      .validateFields()
      .then(async values => {
        const res = await getFormValue(values, true, true);
        const { data } = res;
        if (data) {
          const url = `${urlConfig.activityPreview}?status=WAIT_PUBLISH&id=${data}`;

          Modal.info({
            title: '打开微信小程序扫码预览',
            className: 'cms-code-preview',
            content: <QRCode value={url} />,
          });
        }
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
      });
  };

  const [form] = Form.useForm();

  const normalize = (value, prevValue, prevValues) => {
    const is = value === '1' ? true : false;
    setIsTK(is);
    form.setFieldsValue({
      istk: '0',
    });
    return value;
  };

  function getarrDay(fw, type, weeks, months) {
    let arr = [];
    const startTime = fw[0].valueOf();
    const endTime = fw[1].valueOf();
    arr = [];
    for (let index = 0; index <= Math.floor((endTime - startTime) / 86400000); index++) {
      const day = moment(endTime)
        .add(-index, 'day')
        .startOf('day')
        .format('YYYY-MM-DD');
      if (type === '1') {
        arr.push(day);
      } else if (type === '2') {
        const cweek = moment(day).format('E');
        if (weeks.includes(cweek)) {
          arr.push(day);
        }
      } else if (type === '3') {
        const cday = moment(day).format('DD');
        if (months.includes(cday)) {
          arr.push(day);
        }
      }
    }
    return arr;
  }
  const changciChange = val => {
    const { fw = [], pl, hdtimes, weeks, months } = val;
    if (fw.length !== 2) {
      return false;
    }
    const arr = getarrDay(fw, pl, weeks, months);
    let resarr = [];
    for (let index = arr.length - 1; index >= 0; index--) {
      const element = arr[index];
      const week = moment(element).format('dddd');
      for (let idx = 0; idx < hdtimes.length; idx++) {
        const ele = hdtimes[idx] ? hdtimes[idx] : {};

        const { time } = ele;
        if (time) {
          const start = time[0].format('HH:mm');
          const end = time[1].format('HH:mm');

          resarr.push({
            name: `${moment(element).format('MM-DD')} ${week} ${start}`,
            seTime: [moment(`${element} ${start}`), moment(`${element} ${end}`)],
          });
        }
      }
    }
    form.setFieldsValue({
      activitySessionVOS: resarr,
    });
  };

  const onValuesChange = (val, allval) => {
    setneedConfirm(true);
    const { fw, pl, hdtimes, weeks, months, activitySessionVOS, tutorVOS } = val;
    if (fw || pl || hdtimes || weeks || months) {
      const { fw, pl, hdtimes, weeks = [], months = [] } = allval;
      changciChange({ fw, pl, hdtimes, weeks, months });
    }
    if (tutorVOS) {
      const arr = tutorAllLists.filter(_ => tutorVOS.includes(_.id));

      let html = '';
      for (let i = 0; i < arr.length; i++) {
        const _ = arr[i];
        html += `<div><p><span>${i + 1}.</span>${_.name}</p>${
          _.domainIntroduction ? `<div>${_.domainIntroduction}</div>` : ''
        }${_.introduction ? `<div>${_.introduction}</div>` : ''}</div>`;
      }
      form.setFieldsValue({
        characterIntroduction: BraftEditor.createEditorState(html),
      });
    }
  };

  const anormalize = (value, prevValue, prevValues) => {
    form.setFieldsValue({
      activitySessionVOS: [],
    });
    setAtype(value);
    return value;
  };
  const gnormalize = (value, prevValue, prevValues) => {
    form.setFieldsValue({
      activitySessionVOS: [],
    });
    setisgroupBuy(value);

    return value;
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

  const yuyuetimevalidator = (rule, value) => {
    if (value && value.length && value[1].valueOf() - value[0].valueOf() > 86400000 * 31) {
      return Promise.reject('时间跨度范围不能超过31天');
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
  const handleAudit = () => {
    const { title, categoryVOS, minStartDate, maxStartDate, sponsor } = activityDetail;
    const lists = [
      { label: '活动标题', children: title },
      {
        label: '活动分类',
        children: categoryVOS
          ? activityAllSortList
              .filter(_ => categoryVOS.map(_ => _.id).includes(_.id))
              .map(_ => _.name)
              .join('；')
          : '--',
      },
      {
        label: '活动时间',
        children: `${moment(minStartDate).format('YYYY-MM-DD')}~${moment(maxStartDate).format(
          'YYYY-MM-DD',
        )}`,
      },
      {
        label: '主办方',
        children: sponsor,
        type: 'statusdata',
        valueEnum: sponsorType,
        styleType: 'none',
      },
    ];
    handleAdd('AUDIT', { ...activityDetail, id: aduitId, activityId: id, lists });
  };
  const handleAduit = val => {
    dispatch({
      type: 'activityAudit/activityAudit',
      payload: {
        params: { ...val },
        reload: () => {
          history.go(-1);
        },
      },
    });
  };
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.log(values);
    message.error(values.errorFields[0].errors[0]);
  };
  return (
    <>
      <Spin spinning={aloading}>
        <ModalMaterial />

        <ModalAudit
          handleAduit={handleAduit}
          title="活动"
          successKey="SUCCEED"
          failKey="FAILED"
          reasonKey="reason"
          reasons={ACTIVITY_AUDIT_REASON}
        />
        <ModalEditMobile dataModal={dataModal} />
        <Form
          scrollToFirstError={true}
          className="FormLayout"
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          {...formItemLayout}
          initialValues={{
            needIdNumber: [1, 2],
            showEvaluation: true,
            periodic: false,
            hdtimes: [{}],
            groupBuy: false,
            pl: '1',
          }}
        >
          <Divider orientation="left">基本信息</Divider>
          <InputFormItem label="活动标题" name="title" max={30} required />
          <InputFormItem label="活动副标题" name="subtitle" max={30} required={false} />
          <SortFormItem
            label="活动分类"
            name="categoryVOS"
            type="SORT"
            mtype="activeity"
            maxTag={3}
            required
          />
          <SortFormItem
            label="活动标签"
            name="activityTagVOS"
            type="LABEL"
            mtype="activeity"
            maxTag={3}
            required
          />

          <AreaFormItem
            form={form}
            label="活动地点"
            name="ssq"
            aname="address"
            required
            aplaceholder="请输入详情地址"
            wrapperCol={{ offset: 4, span: 12 }}
          />

          <PriceFormItem label="活动费用" name="cost" min={0} max={10000} />
          {/* <UploadImgsFormItem
            required
            label="活动图片"
            name="imgUrl"
            extra="支持jpg/png格式，大小不能超过400K，建议尺寸750PX*450PX"
            max={10}
          /> */}
          <MaterialFormItem
            required
            label="活动图片"
            name="imgUrl"
            extra="支持jpg/png格式，大小不能超过400K，建议尺寸750PX*450PX"
            max={10}
            type={1}
          />
          <MaterialFormItem
            required={false}
            label="上传视频"
            name="videoUrl"
            extra="视频格式支持mp4，大小不得超过50MB"
            max={1}
            type={2}
          />
          {userType !== 'COMPANY' && (
            <SortFormItem
              label="选择导师"
              name="tutorVOS"
              type="TUTOR"
              maxTag={6}
              required={false}
            />
          )}

          <Form.Item
            label={
              <span>
                体验者信息&nbsp;
                <Tooltip title="预约活动时体验者信息需要必填的字段">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            name="needIdNumber"
            required
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Checkbox value={1} disabled={true}>
                姓名
              </Checkbox>
              <Checkbox value={2} disabled={true}>
                手机号
              </Checkbox>
              <Checkbox value={3}>证件号码</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <RadioFormItem
            label={
              <span>
                活动评价&nbsp;
                <Tooltip title="小程序中该活动的体验者评价是否展示">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            name="showEvaluation"
            list={[
              { value: true, name: '展示' },
              { value: false, name: '不展示' },
            ]}
          />
          <Divider orientation="left">场次信息</Divider>
          <RadioFormItem
            disabled={!!id}
            label="活动类型"
            name="periodic"
            list={[
              {
                value: false,
                name: '不定期活动',
              },
              {
                value: true,
                name: '周期活动',
              },
            ]}
            extraButton={extraButton}
            normalize={anormalize}
          />
          {!atype && (
            <>
              <RadioFormItem
                disabled={!!id}
                label={
                  <span>
                    是否团购&nbsp;
                    <Tooltip
                      title={
                        <>
                          <p>1、团购活动须设置活动有效预约人数及预约时间；</p>
                          <p>2、在预约时间范围内，实际预约人数达到有效预约人数限制，则活动有效；</p>
                          <p>3、适用于抢购等营销场景；</p>
                        </>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                name="groupBuy"
                list={tkList}
                normalize={gnormalize}
              />
              {isgroupBuy && (
                <Form.Item
                  label="预约时间"
                  name="yuyuetime"
                  required
                  rules={[{ required: true, message: '请填写预约时间' }]}
                  // rules={[
                  //   {
                  //     validator: yuyuetimevalidator,
                  //   },
                  // ]}
                >
                  <RangePicker
                    showTime
                    disabledDate={disabledDate}
                    format={'YYYY-MM-DD HH:mm:ss'}
                  />
                </Form.Item>
              )}
            </>
          )}

          <CInfoFormList
            dispatch={dispatch}
            form={form}
            atype={atype}
            isgroupBuy={isgroupBuy}
            isEdit={!!id}
            activityDetail={activityDetail}
            cinfovalue={cinfovalue}
            auditStatus={auditStatus}
          />

          <Divider orientation="left">活动详情</Divider>
          <EditorFormItem
            label="活动介绍"
            name="activityDescription"
            required
            dispatch={dispatch}
            isMedia={false}
          />
          <EditorFormItem
            label="体验点简介"
            name="experienceStore"
            required
            dispatch={dispatch}
            isMedia={false}
          />
          <EditorFormItem
            label="体验故事"
            name="brandStory"
            required={false}
            dispatch={dispatch}
            isMedia={false}
          />
          <EditorFormItem
            label="体验导师"
            name="characterIntroduction"
            required={false}
            dispatch={dispatch}
            isMedia={false}
          />
          <EditorFormItem
            label="流程安排"
            name="experienceProcess"
            required
            dispatch={dispatch}
            isMedia={false}
          />
          <InputFormItem
            label="交通方式"
            name="traffic"
            type="textArea"
            max={100}
            required={false}
          />
          <InputFormItem label="Tips" name="tips" type="textArea" max={200} required={false} />
          <InputFormItem
            label="常见问题"
            name="commonProblems"
            type="textArea"
            max={200}
            required={false}
          />
          {/* <h1>联系电话</h1> */}
          <InputFormItem
            name="contact"
            label="联系电话"
            required={true}
            placeholder={`例如13766668888`}
            max={30}
          />
          <ShareSets isMaterial={true} />
          {
            <div className="FormSavebtn">
              {isLook !== '1' && (
                <Button className="ml-10" loading={dloading} onClick={handleSaveDraft}>
                  保存为草稿
                </Button>
              )}
              {isLook !== '1' && (
                <Button className="ml-10" onClick={handleYulan}>
                  预览
                </Button>
              )}
              {isLook !== '1' && (
                <Button className="ml-10" type="primary" loading={loading} htmlType="submit">
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
