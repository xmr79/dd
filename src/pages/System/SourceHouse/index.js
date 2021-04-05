/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Tabs, Checkbox, Tooltip, Row, col, Upload, message } from 'antd';
import Layout from '@/pages/System/SourceHouse/components/Layout';
import ModalUploadVideo from '@/pages/System/SourceHouse/Modals/ModalUploadVideo';
import { uploadImg } from '@/services/common.js';
import ModalEdit from '@/pages/System/SourceHouse/Modals/ModalEdit';
const { TabPane } = Tabs;
const SourceHouse = props => {
  const {
    location: {
      query: { key = '1' },
    },
    dispatch,
    imgMaterialList,
    vedioMaterialList,
  } = props;
  const imgRef = useRef(null);
  const vedioRef = useRef(null);
  const imgReload = () => {
    imgRef.current.reload();
  };

  const vedioReload = () => {
    vedioRef.current.reload();
  };
  const [loading, setLoading] = useState(false);
  // 新增操作
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'sourceHouse/changeState', payload });
  };

  const callback = key => {
    history.push(`/system/sourceHouse?key=${key}`);
  };

  const beforeUpload = async info => {
    console.log(info)
    const isLt2M = info.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      message.error('图片大小不能超过3M!');
      return false;
    }
    await uploadImg(info).then(res => {
      if (res.status === 1) {
        dispatch({
          type: 'sourceHouse/materialSave',
          payload: {
            params: {
              url: res.data,
              type: '1',
              materialName: info.name.substring(0, info.name.indexOf('.')).substring(0, 30),
            },
            reload: () => {
              imgReload();
              dispatch({
                type: 'global/closeModal',
              });
            },
          },
        });
        // setLoading(false);
      } else {
        message.error(res.msg ? res.msg : '上传失败');
        // setLoading(false);
      }
    });
  };
  const Btn = props => {
    switch (key) {
      case '1':
        return (
          <Upload
            customRequest={() => {}}
            beforeUpload={beforeUpload}
            multiple={true}
            showUploadList={false}
          >
            <Button loading={loading} type="primary">
              上传
            </Button>
          </Upload>
        );
        break;

      case '2':
        return (
          <Button
            type="primary"
            onClick={() => {
              handleAdd('MODAL_UPLOAD_VIDEO');
            }}
          >
            上传
          </Button>
        );
        break;
    }
  };

  const handleSave = val => {
    dispatch({
      type: 'sourceHouse/materialSave',
      payload: {
        params: val,
        reload: () => {
          vedioReload();
          dispatch({
            type: 'sourceHouse/closeModal',
          });
        },
      },
    });
  };
  const imgvedioDetele = (ids, type) => {
    dispatch({
      type: 'sourceHouse/materialDelete',
      payload: {
        params: { ids },
        reload: type === 1 ? imgReload : vedioReload,
      },
    });
  };
  const handleDelete = (ids, type) => {
    imgvedioDetele(ids, type);
  };
  const handleEditSave = val => {
    const { type } = val;
    dispatch({
      type: 'sourceHouse/materialUpdate',
      payload: {
        params: val,
        reload: type === 1 ? imgReload : vedioReload,
      },
    });
  };
  return (
    <>
      <ModalEdit handleSave={handleEditSave} />
      <ModalUploadVideo handleSave={handleSave} />
      <Tabs activeKey={key} onChange={callback} tabBarExtraContent={<Btn />}>
        <TabPane tab="图片" key="1">
          <Layout
            ref={imgRef}
            type={1}
            list={imgMaterialList}
            dispatch={dispatch}
            handleDelete={ids => {
              handleDelete(ids, 1);
            }}
          />
        </TabPane>
        <TabPane tab="视频" key="2">
          <Layout
            ref={vedioRef}
            type={2}
            list={vedioMaterialList}
            dispatch={dispatch}
            handleDelete={ids => {
              handleDelete(ids, 2);
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default connect(({ sourceHouse }) => {
  return {
    imgMaterialList: sourceHouse.imgMaterialList,
    vedioMaterialList: sourceHouse.vedioMaterialList,
  };
})(SourceHouse);
