import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Table, message, Tabs } from 'antd';
import Qsearch from '@/components/ComTable/Qsearch';
import getColumns from '@/components/ComTable/columnsMap';
import { paginations } from '@/constants';
import {
  enumLinkType,
  mapCmsComponents,
} from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import { arrayToObj, getUniqueId } from '@/utils/utils';
const { TabPane } = Tabs;
const mapenumLinkType = arrayToObj(enumLinkType, 'key');

const ModalSelectLinks = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { linkTypes, pIndex, dataCms, linkObj = [], type, cIds, max },
      modalData,
    },
    dispatch,
    selectLinkDatas,
  } = props;

  const def = {
    page: 1,
    size: 20,
    linkType: undefined,
  };

  const [params, setParams] = useState(def);

  const handlesetParams = obj => {
    let nparams = {
      ...params,
      ...obj,
    };
    setParams(nparams);
  };
  const linkType = params.linkType;
  const text = linkType ? mapenumLinkType[linkType].value : '';
  const title = linkType ? mapenumLinkType[linkType].title : '';
  const titleKey = linkType ? mapenumLinkType[linkType].titleKey : '';
  const linkIdKey = linkType
    ? mapenumLinkType[linkType].linkIdKey
      ? mapenumLinkType[linkType].linkIdKey
      : 'id'
    : 'id';

  const [selectRow, setSelectRow] = useState(linkObj);

  useEffect(() => {
    if (modalType === 'MODAL_CMS_SELECT_LINKS' && modalShow) {
      if (linkObj.length > 0) {
        setSelectRow(linkObj);
      }
    } else {
      setSelectRow([]);
    }
  }, [modalShow, linkObj]);

  useEffect(() => {
    if (!modalShow) {
      setSelectRow([]);
      setParams(def);
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
  }, [modalShow]);

  useEffect(() => {
    if (params.linkType) {
      dispatch({ type: 'customPage/getSelectLinkDatas', payload: { ...params } });
    }
  }, [params]);

  useEffect(() => {
    if (modalType === 'MODAL_CMS_SELECT_LINKS' && modalShow) {
      if (!params.linkType) {
        handlesetParams({ linkType: linkTypes[0] });
      }
    }
  }, [modalShow, linkTypes]);

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
    dataCms[pIndex].list = selectRow;
    const payload = {
      dataCms: [...dataCms],
    };
    dispatch({ type: 'customPage/changeState', payload });
    handleCancel();
  };
  const btns = r => {
    const { id, code } = r;
    const selectIds = selectRow.map(_ => _.linkId);
    return [
      !selectIds.includes(r[linkIdKey]) && {
        key: '1',
        btnname: '选择',
        handleClick: () => {
          if (selectRow.length >= max) {
            message.error(`最多添加${max}个`);
            return false;
          }

          const { list } = mapCmsComponents[type].dataModel;
          function getlinkOthers(item, othersKey) {
            let obj = {};
            for (let index = 0; index < othersKey.length; index++) {
              const element = othersKey[index];
              obj[element] = item[element];
            }
            return obj;
          }
          const cId = getUniqueId(cIds);
          const othersKey = linkType ? mapenumLinkType[linkType].othersKey : [];
          const linkOthers = getlinkOthers(r, othersKey);
          const obj = {
            cId,
            ...list[0],
            linkType,
            linkId: r[linkIdKey],
            linkShow: r[titleKey],
            linkOthers: linkOthers,
            imgUrl: r['imgUrl'].split(',')[0],
          };
          setSelectRow([...selectRow, obj]);
        },
      },
      selectIds.includes(r[linkIdKey]) && {
        key: '2',
        ref: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const nlist = selectRow.filter(_ => _.linkId !== id);
              setSelectRow(nlist);
            }}
          >
            已选择
          </div>
        ),
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
  const callback = key => {
    handlesetParams({ linkType: key });
  };
  return (
    <Modal
      title={`${text}选择`}
      wrapClassName="wrap-cms-modal"
      width="700px"
      maskClosable={false}
      visible={modalType === 'MODAL_CMS_SELECT_LINKS' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      destroyOnClose={true}
    >
      {linkTypes && linkTypes.length > 1 && (
        <Tabs activeKey={params.linkType} onChange={callback}>
          {linkTypes.map((_, idx) => {
            return <TabPane tab={mapenumLinkType[_].value} key={_}></TabPane>;
          })}
        </Tabs>
      )}

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
export default connect(mapStateToProps)(ModalSelectLinks);
