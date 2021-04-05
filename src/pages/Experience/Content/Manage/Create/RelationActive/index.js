/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Tag } from 'antd';
import ModalSelectActive from '@/pages/Experience/Content/Manage/Create/RelationActive/ModalSelectActive';
const MAX = 4;
const RelationActive = forwardRef((props, ref) => {
  const { value = [], onChange, dataModal, dispatch } = props;
  useEffect(() => {
  }, [value]);
  const onAdd = () => {
    // const arr = [...value, {}];
    // onChange(arr);
    handleAdd('MODAL_SELECT_ACTIVE', { value });
  };

  // 新增操作
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

  const handlOk = val => {
    onChange([]);
    let arr = val;
    // val.forEach(element => {
    //   const ar = value.map(_ => _.id);
    //   if (!ar.includes(element.id)) {
    //     arr.push(element);
    //   }
    // });
    onChange(arr);
  };
  const onClose = r => {
    const arr = value.filter(_ => r.id !== _.id);
    onChange(arr);
  };
  return (
    <>
      <ModalSelectActive dataModal={dataModal} handlOk={handlOk} MAX={MAX} />
      {value.map((_, idx) => {
        return (
          <Tag
            key={idx}
            closable
            onClose={e => {
              e.preventDefault();
              onClose(_);
            }}
          >
            {_.title}
          </Tag>
        );
      })}
      {
        <Button type="link" onClick={onAdd}>
          点击选择关联活动
        </Button>
      }
    </>
  );
});
export default connect(({ global }) => {
  return { dataModal: global.dataModal };
})(RelationActive);
