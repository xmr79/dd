/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import MaterialFormItem from '@/components/FormItems/MaterialFormItem';
import SortFormItem from '@/components/FormItems/SortFormItem';
import PriceFormItem from '@/components/FormItems/PriceFormItem';
import AreaFormItem from '@/components/FormItems/AreaFormItem';
import ModalMaterial from '@/pages/Modals/ModalMaterial';
import { getmapLocation, getssqname } from '@/utils/utils';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 12 } };

const BasicForm = props => {
  const {
    currentUser: { userType, username },
    form,
    activityDetail,
    isHuiXian,
  } = props;
  useEffect(() => {
    if (isHuiXian && JSON.stringify(activityDetail) !== '{}') {
      const {
        title,
        subtitle,
        activitySessionVOS,
        activityTagVOS = [],
        categoryVOS,
        provinceId,
        cityId,
        areaId,
        address,
        imgUrl,
        videoUrl,
        coverUrl,
        tutorVOS,
      } = activityDetail;

      const initialValues = {
        title,
        subtitle,

        activityTagVOS: activityTagVOS.map(_ => _.id),
        categoryVOS: categoryVOS.map(_ => _.id),
        tutorVOS: tutorVOS.map(_ => _.id),

        ssq: {
          province: provinceId,
          city: cityId,
          district: areaId,
        },
        address,
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
      };
      form.setFieldsValue(initialValues);
    }
  }, [activityDetail]);
  return (
    <>
      <ModalMaterial />
      <Form {...formItemLayout} form={form} name="basicForm">
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

        {/* <PriceFormItem label="活动费用" name="cost" min={0} max={10000} /> */}

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
          <SortFormItem label="选择导师" name="tutorVOS" type="TUTOR" maxTag={6} required={false} />
        )}
      </Form>
    </>
  );
};
export default connect(({ user, common, activityManage }) => {
  return { currentUser: user.currentUser, activityDetail: activityManage.activityDetail };
})(BasicForm);

export const getBasicParams = async ({ value, BaseProvinceList }) => {
  const {
    categoryVOS = [],
    activityTagVOS = [],
    tutorVOS = [],
    ssq,
    address,
    imgUrl,
    videoUrl,
  } = value;
  const obj = getssqname(BaseProvinceList, ssq);
  const position = await getmapLocation({
    address: `${obj.province}${obj.city}${obj.district}${address}`,
    city: ssq.city,
  });
  return {
    ...value,
    position,
    provinceId: ssq.province,
    cityId: ssq.city,
    areaId: ssq.district,
    imgUrl: imgUrl ? imgUrl.map(_ => _.url).join(',') : undefined,
    videoUrl: videoUrl ? videoUrl.map(_ => _.url).join(',') : undefined,
    coverUrl: videoUrl ? videoUrl.map(_ => _.coverUrl).join(',') : undefined,
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
  };
};
