import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Pagination,
  Empty,
  Upload,
  Row,
  Col,
  message,
  Typography,
  Popover,
} from 'antd';
import styles from '@/pages/Modals/ModalMaterial/index.less';
import classNames from 'classnames';
import ModalUploadVideo from '@/pages/System/SourceHouse/Modals/ModalUploadVideo';
import { uploadImg } from '@/services/common.js';
import {
  EditOutlined,
  LinkOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';
import { formatSeconds } from '@/utils/utils';
import Qsearch from '@/components/ComTable/Qsearch';
const { Paragraph } = Typography;
const ModalMaterialImg = props => {
  const {
    imgdataModal: {
      modalType,
      modalShow,
      modalData: { type = 1, handleSave, value, max },
    },
    dispatch,
    imgMaterialList,
    vedioMaterialList,
  } = props;

  const list = type === 1 ? imgMaterialList : vedioMaterialList;
  const def = { page: 1, size: 50 };
  const [params, setParams] = useState(def);
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_MATERIAL_IMG' && value) {
      setSelects(value);
    }
  }, [value]);

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_MATERIAL_IMG') {
      dispatch({ type: 'sourceHouse/getMaterialList', payload: { ...params, type } });
    }
  }, [params, modalShow]);

  const handleCancel = () => {
    const payload = {
      imgdataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'sourceHouse/changeState', payload });
  };
  const handleOk = () => {
    if (selects.length <= 0) {
      message.error(`请点击选中${type === 1 ? '图片' : '视频'}`);
      return false;
    }
    handleSave(selects);

    dispatch({
      type: 'sourceHouse/imgcloseModal',
    });
  };

  const onPageChange = (page, pageSize) => {
    setParams({
      page,
      size: pageSize,
    });
  };

  const handleSelect = item => {
    if (max > 1) {
      let arr = selects;
      if (!selects.map(_ => _.url).includes(item.url)) {
        if (max) {
          const Max = max;
          if (selects.length >= Max) {
            message.error(`最多上传${Max}${type === 1 ? '张图片' : '个视频'}`);
            return false;
          }
        }

        arr = [...selects, item];
        setSelects(arr);
      } else {
        arr = selects.filter(_ => _.url !== item.url);
        setSelects(arr);
      }
    } else {
      setSelects([item]);
    }
  };

  const beforeUpload = async info => {
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
              setParams(def);
            },
          },
        });
        // setLoading(false);
      } else {
        message.error(res.msg);
        // setLoading(false);
      }
    });
  };

  const Btn = props => {
    switch (type) {
      case 1:
        return (
          <Upload
            beforeUpload={beforeUpload}
            multiple={true}
            customRequest={() => {}}
            showUploadList={false}
          >
            <Button type="primary">本地上传</Button>
          </Upload>
        );
        break;

      default:
        return null;
        break;
    }
  };
  const searchColums = [
    {
      name: '标题',
      dataname: 'materialName',
      type: 'normal',
      placeholder: '请输入标题名称',
    },
  ];
  const onSearch = val => {
    setParams({
      ...params,
      ...val,
    });
  };
  return (
    <Modal
      wrapClassName="wrap-cms-modal"
      zIndex="1000"
      title={'我的图片'}
      width="900px"
      maskClosable={false}
      visible={modalType === 'MODAL_MATERIAL_IMG' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Qsearch onSearch={onSearch} searchColums={searchColums} />
      <Row className="mt-20 mb-10" justify="end">
        <Btn />
      </Row>
      <div>
        {list.totalItem <= 0 ? (
          <Empty />
        ) : (
          <div className={styles.lists}>
            {list.data.map((_, idx) => {
              const text = `${_.materialName}.${_.format}`;
              return (
                <div key={idx} className={styles.card}>
                  <div
                    key={idx}
                    className={classNames(
                      styles.item,
                      selects.map(_ => _.url).includes(_.url) && styles.active,
                    )}
                    onClick={() => {
                      handleSelect(_);
                    }}
                  >
                    <div className={styles.img}>
                      {type === 1 ? (
                        <img src={_.url} alt="" />
                      ) : (
                        <video src={_.url} poster={_.coverUrl}></video>
                      )}
                      {type === 2 && (
                        <div className={styles.duration}>
                          <PlayCircleFilled className="mr-5" />
                          {formatSeconds(_.duration)}
                        </div>
                      )}
                    </div>
                    <div className={styles.name}>
                      <Popover
                        content={
                          <div style={{ maxWidth: '300px', wordBreak: 'break-all' }}>{text}</div>
                        }
                      >
                        <Paragraph
                          style={{ width: '100%', margin: '0 auto', cursor: 'pointer' }}
                          ellipsis={{ rows: 1 }}
                        >
                          {text}
                        </Paragraph>
                      </Popover>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {list.totalItem > 0 && (
          <Pagination
            current={list.page}
            total={list.totalItem}
            onChange={onPageChange}
            pageSize={list.size}
          />
        )}
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ global, sourceHouse }) => {
  return {
    imgdataModal: sourceHouse.imgdataModal,
    imgMaterialList: sourceHouse.imgMaterialList,
    vedioMaterialList: sourceHouse.vedioMaterialList,
  };
};
export default connect(mapStateToProps)(ModalMaterialImg);
