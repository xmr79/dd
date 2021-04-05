/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { PureComponent, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Button, Modal, message } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined, RetweetOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';

import { urlConfig } from '@/common';
import Cms from '@/pages/System/PageDecoration/CustomPage/Cms';
import ModalPublishTime from '@/pages/System/PageDecoration/CustomPage/Cms/Modals/ModalPublishTime';
@connect(({ loading, customPage }) => ({
  loading: loading.effects['customPage/saveInfo'],
  dataCms: customPage.dataCms,
  folds: customPage.folds,
  code: customPage.code,
}))
class Template extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      location: {
        query: { id },
      },
    } = this.props;

    if (id) {
      dispatch({ type: 'customPage/getCmsPageDetail', payload: { id } });
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    const payload = {
      dataCms: [],
      cIds: [],
      folds: false,
    };
    dispatch({ type: 'customPage/changeState', payload });
  }

  // 组件折叠Toggle
  handleFolds = folds => {
    let { dispatch, dataCms } = this.props;
    dataCms = dataCms.map(item => {
      item.fold = !folds;
      return item;
    });
    const payload = {
      dataCms,
      folds: !folds,
    };

    dispatch({ type: 'customPage/changeState', payload });
  };
  handlePreview = () => {
    const { code } = this.props;
    this.handleSave({ status: 'WAIT_PUBLISH', notSkip: true });

    const url = `${urlConfig.cmsPreview}?status=WAIT_PUBLISH&code=${code}`;

    Modal.info({
      title: '打开微信小程序扫码预览',
      className: 'cms-code-preview',
      content: <QRCode value={url} />,
    });
  };
  // 组件保存、发布
  handleSave = ({ status, notSkip, params }) => {
    const {
      dispatch,
      location: {
        query: { id },
      },
      dataCms,
    } = this.props;
    // 处理富文本
    dataCms.map(_ => {
      if (_.type === 'EDITORS') {
        _.component =
          typeof _.component === 'string' || !_.component ? _.component : _.component.toHTML();
      }
      return _;
    });
    function isListNULL(ele, idx) {
      let is = true;

      const { list, title } = ele;
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          if (!element.linkType) {
            message.error(`${idx + 1}.${title}组件填写不完整`);
            is = false;
            break;
          }
        }
      }
      return is;
    }
    if (status === 'PUBLISH') {
      let isNo = true;
      for (let i = 0; i < dataCms.length; i++) {
        const element = dataCms[i];
        isNo = isListNULL(element, i);
        if (!isNo) {
          break;
        }
      }
      if (!isNo) {
        return isNo;
      }
    }
    const payload = {
      id: +id,
      json: JSON.stringify(dataCms),
      status,
      notSkip,
      ...params,
    };
    dispatch({ type: 'customPage/savePage', payload });
    if (status === 'PUBLISH') {
      const payload = {
        dataModal: {
          modalType: '',
          modalShow: false,
          modalData: {},
        },
      };
      dispatch({ type: 'global/changeState', payload });
    }
  };
  handleAdd = (modalType, r) => {
    const { dispatch } = this.props;
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  handleSet = params => {
    console.log(params);
    this.handleSave({ status: 'PUBLISH', params });
  };
  render() {
    const {
      loading,
      folds,
      dataCms,
      location: {
        query: { id, status, pushTime },
      },
    } = this.props;

    return (
      <>
        <Cms />
        <ModalPublishTime handleSet={this.handleSet} />
        {dataCms.length ? (
          <div className="FormLayout">
            <div className="FormSavebtn">
              {folds ? (
                <Button
                  type="dashed"
                  icon={<FullscreenExitOutlined />}
                  onClick={() => {
                    this.handleFolds(folds);
                  }}
                >
                  展开组件
                </Button>
              ) : (
                <Button
                  type="dashed"
                  icon={<FullscreenOutlined />}
                  onClick={() => {
                    this.handleFolds(folds);
                  }}
                >
                  折叠组件
                </Button>
              )}
              <Button
                type="dashed"
                icon={<RetweetOutlined />}
                onClick={() => {
                  this.handlePreview();
                }}
              >
                保存并预览
              </Button>
              <Button
                loading={loading}
                type="primary"
                ghost
                onClick={() => {
                  this.handleSave({ status: 'WAIT_PUBLISH' });
                }}
              >
                保存
              </Button>
              <Button
                loading={loading}
                type="primary"
                onClick={() => {
                  this.handleAdd('MODAL_PUBLISH_TIME', { status, pushTime });
                }}
              >
                发布
              </Button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Template;
