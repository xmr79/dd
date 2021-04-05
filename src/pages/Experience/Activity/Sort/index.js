/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Divider, Button, Modal, Row, Card, Table, Tooltip, message } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { activitySortList } from '@/services/experience/activity.js';
import {} from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons';
import ModalSort from '@/pages/Modals/ModalSort';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import getColumns from '@/components/ComTable/columnsMap.js';
const DragHandle = sortableHandle(props => {
  const { r } = props;
  return (
    <>
      <Tooltip title="拖拽排序">
        <MenuOutlined style={{ cursor: 'move', color: '#999' }} />
      </Tooltip>
    </>
  );
});
const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const List = props => {
  const { sortList, dataModal, dispatch } = props;
  const { data } = sortList;
  useEffect(() => {
    dispatch({
      type: 'sort/activitySortList',
    });
  }, []);
  const btns = r => {
    const { id, count } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '编辑',
        handleClick: () => {
          handleAdd('MODAL_SORT', r);
        },
      },
      {
        key: '2',
        authority: '',
        btnname: '删除',
        handleClick: () => {
          if (count > 0) {
            Modal.warning({
              title: '删除分类',
              icon: <InfoCircleOutlined />,
              content: '活动数大于0的分类不能删除',
              okText: '我知道了',
            });
          } else {
            Modal.confirm({
              title: '提示',
              content: '确定要删除当前分类吗？',
              icon: <InfoCircleOutlined />,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                dispatch({
                  type: 'sort/activitySortDelete',
                  payload: { id, reload },
                });
              },
            });
          }
        },
      },
    ];
  };
  const columns = [
    {
      title: (
        <div>
          排序
          <Tooltip title="排序靠前的分类在用户端优先展示">
            <InfoCircleOutlined className="ml-10" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'sort',
      key: 'sort',
      width: 100,
      className: 'drag-visible',
      align: 'center',
      render: (t, r) => <DragHandle r={r} />,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '活动数',
      dataIndex: 'count',
      // sorter: true,
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'action',
      btns: btns,
    },
  ];
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter(el => !!el);
      const sourceId = data.filter((_, idx) => idx === oldIndex)[0].id;
      const targetId = data.filter((_, idx) => idx === newIndex)[0].id;
      dispatch({
        type: 'sort/changeState',
        payload: {
          sortList: {
            ...sortList,
            data: newData,
          },
        },
      });
      dispatch({
        type: 'sort/activityCategoryUpdateSort',
        payload: {
          sourceId,
          targetId,
        },
      });
    }
  };
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const DraggableContainer = props => {
    return (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    );
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
  const handleCreate = () => {
    if (sortList.totalItem >= 20) {
      message.error('活动分类最多添加20个');
      return false;
    }
    handleAdd('MODAL_SORT');
  };
  const handleSort = val => {
    dispatch({
      type: 'sort/activityCategoryAdd',
      payload: {
        ...val,
      },
    });
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type="活动分类" callback={handleSort} />
      <Row className="mb-20" type="flex" justify="end">
        <AuthBlock>
          <Button className="mt-20" type="primary" onClick={handleCreate}>
            <PlusOutlined /> 新增分类
          </Button>
        </AuthBlock>
      </Row>

      <Table
        pagination={false}
        dataSource={data}
        columns={getColumns(columns)}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  );
};
const mapStateToProps = ({ global, sort }) => {
  return {
    dataModal: global.dataModal,
    ...sort,
  };
};
export default connect(mapStateToProps)(List);
