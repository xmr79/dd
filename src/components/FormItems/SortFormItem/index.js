/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Radio, Select, Row, Col } from 'antd';
import ModalSort from '@/pages/Modals/ModalSort';
import ReactDOM from 'react-dom';
const { Option } = Select;

const SelectBtn = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    type,
    onAdd,
    lists,
    mode,
    isAll,
    width,
    valuekey = 'id',
    render,
  } = props;
  return (
    <Row>
      <Col style={{ width: width ? width : '100%' }}>
        <Select
          value={value}
          showArrow
          mode={mode}
          showSearch
          filterOption={(input, option) => {
            const opt =
              typeof option.children !== 'string'
                ? option.children.props.children[0]
                : option.children.toLowerCase();
            return opt.indexOf(input.toLowerCase()) >= 0;
          }}
          placeholder="请选择"
          onChange={e => {
            onChange(e);
          }}
        >
          {isAll && <Option value="">全部</Option>}
          {lists.map((i, idx) => {
            return (
              <Option key={idx} value={i[valuekey]}>
                {render ? render(i) : i.name}
              </Option>
            );
          })}
        </Select>
      </Col>
      {/* <Col>
        <Button type="link" onClick={onAdd}>
          添加{type}
        </Button>
      </Col> */}
    </Row>
  );
});
const SortFormItem = props => {
  const {
    name,
    label,
    type,
    dataModal,
    dispatch,
    maxTag = 3,
    mtype,
    required,
    mode = 'multiple',
    isAll = false,
    width,
    normalizecallback,
    valuekey = 'id',
    render,
    extraParams = {},
  } = props;

  const [arr, setArr] = useState([]);
  useEffect(() => {
    async function fun(params) {
      let url = '';
      let payload = {};
      if (mtype === 'customer') {
        url = 'common/getcategoryList';
        payload = {
          type,
        };
      }
      if (type === 'TUTOR') {
        url = 'common/getAllTutorList';
        payload = {
          type,
        };
      }

      if (mtype === 'activeity') {
        if (type === 'SORT') {
          url = 'common/getactivityAllSortList';
          payload = {
            type,
          };
        }
        if (type === 'LABEL') {
          url = 'common/getactivityAllTagList';
          payload = {
            type,
          };
        }
        if (type === 'LIST') {
          url = 'common/activitylistAll';
        }
        if (type === 'ACCOUTLIST') {
          url = 'common/activitylistAll';
          payload = {
            isAll: false,
          };
        }
      }

      if (mtype === 'content') {
        url = 'common/contentList';
        payload = {
          type,
        };
      }

      const res = await dispatch({
        type: url,
        payload: {
          ...payload,
          ...extraParams,
        },
      });
      setArr(res ? res : []);
    }
    fun();
  }, []);
  const callback = () => {};
  const onAdd = () => {
    handleAdd('MODAL_SORT');
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

  const validator = (rule, value = []) => {
    if (mode && value.length > maxTag) {
      return Promise.reject(`最多选择${maxTag}个${label}`);
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type={type} callback={callback} />
      <Form.Item
        label={label}
        name={name}
        rules={[
          { required: required, message: `请选择${label}` },
          {
            validator,
          },
        ]}
        normalize={(value, prevValue, prevValues) => {
          if (normalizecallback) {
            normalizecallback(value, prevValue, prevValues);
          }

          return value;
        }}
      >
        <SelectBtn
          type={type}
          onAdd={onAdd}
          lists={arr}
          maxTag={maxTag}
          mode={mode}
          isAll={isAll}
          width={width}
          valuekey={valuekey}
          render={render}
        />
      </Form.Item>
    </>
  );
};
export default connect(({ global, common }) => {
  return { dataModal: global.dataModal, arr: common.arr };
})(SortFormItem);
