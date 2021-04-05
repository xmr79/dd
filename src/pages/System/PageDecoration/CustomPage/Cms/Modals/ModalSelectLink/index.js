import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Table, message } from 'antd';
import Qsearch from '@/components/ComTable/Qsearch';
import getColumns from '@/components/ComTable/columnsMap';
import { paginations } from '@/constants';
import { enumLinkType } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import { arrayToObj } from '@/utils/utils';
const mapenumLinkType = arrayToObj(enumLinkType, 'key');

const ModalSelectLink = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { linkType, pIndex, index, handleChange, linkId },
      modalData,
    },
    dispatch,
    selectLinkDatas,
  } = props;

  const text = linkType ? mapenumLinkType[linkType].value : '';
  const title = linkType ? mapenumLinkType[linkType].title : '';
  const titleKey = linkType ? mapenumLinkType[linkType].titleKey : '';
  const linkIdKey = linkType
    ? mapenumLinkType[linkType].linkIdKey
      ? mapenumLinkType[linkType].linkIdKey
      : 'id'
    : 'id';

  const [params, setParams] = useState({
    page: 1,
    size: 20,
  });

  const [selectId, setSelectId] = useState(linkId);

  useEffect(() => {
    if (modalType === 'MODAL_CMS_SELECT_LINK' && modalShow) {
      if (linkId) {
        setSelectId(linkId);
      }
      dispatch({ type: 'customPage/getSelectLinkDatas', payload: { linkType, ...params } });
    } else if (!modalShow) {
      setSelectId(undefined);
      dispatch({
        type: 'customPage/changeState',
        payload: {
          selectLinkDatas: {
            page: 1,
            size: 10,
            totalItem: 0,
            data: [],
          },
        },
      });
    }
  }, [modalShow, params]);

  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData,
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleOk = () => {
    if (!selectId) {
      message.error(`请选择${text}`);
      return false;
    }
    const itemarr = selectLinkDatas.data.filter(_ => _[linkIdKey] === selectId);
    const item = itemarr.length === 1 ? itemarr[0] : {};
    const { title, imgUrl } = item;

    handleChange('UPDATE', pIndex, {
      index,
      field: ['list', 'linkId'],
      data: selectId,
    });

    const othersKey = linkType ? mapenumLinkType[linkType].othersKey : [];

    function getlinkOthers(item, othersKey) {
      let obj = {};
      for (let index = 0; index < othersKey.length; index++) {
        const element = othersKey[index];
        obj[element] = item[element];
      }
      return obj;
    }

    const linkOthers = getlinkOthers(item, othersKey);

    handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: item[titleKey] });
    handleChange('UPDATE', pIndex, { index, field: ['list', 'linkOthers'], data: linkOthers });
    if (imgUrl) {
      handleChange('UPDATE', pIndex, {
        index,
        field: ['list', 'imgUrl'],
        data: imgUrl.split(',')[0],
      });
    }

    handleCancel();
  };
  const btns = r => {
    const { id, code } = r;

    return [
      selectId !== r[linkIdKey] && {
        key: '1',
        btnname: '选择',
        handleClick: () => {
          setSelectId(r[linkIdKey]);
        },
      },
      selectId === r[linkIdKey] && {
        key: '2',
        ref: <div>已选择</div>,
      },
    ];
  };
  const columns = [
    {
      title: `${title}`,
      dataIndex: titleKey,
      width: 200,
      valueType: 'tip',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '操作',
      valueType: 'action',
      width: 150,
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: `${title}`,
      dataname: titleKey,
      type: 'normal',
      placeholder: `请输入${title}`,
    },
  ];
  const handlesetParams = obj => {
    let nparams = {
      ...params,
      ...obj,
    };
    setParams(nparams);
  };
  //换页
  const onpageChange = (pageNumber, filters, sorter) => {
    const { current, pageSize } = pageNumber;
    handlesetParams({ page: current, size: pageSize });
  };
  //分页配置
  const pagination = {
    pageSize: params.size,
    current: params.page,
    total: selectLinkDatas.totalItem,
    showTotal: (total, range) => {
      return `总共 ${total} 条数据`;
    },
  };
  const onSearch = val => {
    handlesetParams({ ...val });
  };
  return (
    <Modal
      title={`${text}选择`}
      wrapClassName="wrap-cms-modal"
      width="700px"
      maskClosable={false}
      visible={modalType === 'MODAL_CMS_SELECT_LINK' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Qsearch searchColums={searchColums} onSearch={onSearch} />
      <Table
        rowKey="id"
        columns={getColumns(columns)}
        dataSource={selectLinkDatas.data}
        pagination={selectLinkDatas.totalItem ? pagination : false}
        onChange={onpageChange}
      />
    </Modal>
  );
};
const mapStateToProps = ({ global, customPage }) => {
  return {
    dataModal: global.dataModal,
    selectLinkDatas: customPage.selectLinkDatas,
  };
};
export default connect(mapStateToProps)(ModalSelectLink);
