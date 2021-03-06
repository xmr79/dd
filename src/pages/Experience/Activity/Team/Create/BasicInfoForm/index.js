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
        <InputFormItem label="????????????" name="title" max={30} required />
        <InputFormItem label="???????????????" name="subtitle" max={30} required={false} />
        <SortFormItem
          label="????????????"
          name="categoryVOS"
          type="SORT"
          mtype="activeity"
          maxTag={3}
          required
        />
        <SortFormItem
          label="????????????"
          name="activityTagVOS"
          type="LABEL"
          mtype="activeity"
          maxTag={3}
          required
        />

        <AreaFormItem
          form={form}
          label="????????????"
          name="ssq"
          aname="address"
          required
          aplaceholder="?????????????????????"
          wrapperCol={{ offset: 4, span: 12 }}
        />

        {/* <PriceFormItem label="????????????" name="cost" min={0} max={10000} /> */}

        <MaterialFormItem
          required
          label="????????????"
          name="imgUrl"
          extra="??????jpg/png???????????????????????????400K???????????????750PX*450PX"
          max={10}
          type={1}
        />
        <MaterialFormItem
          required={false}
          label="????????????"
          name="videoUrl"
          extra="??????????????????mp4?????????????????????50MB"
          max={1}
          type={2}
        />
        {userType !== 'COMPANY' && (
          <SortFormItem label="????????????" name="tutorVOS" type="TUTOR" maxTag={6} required={false} />
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
