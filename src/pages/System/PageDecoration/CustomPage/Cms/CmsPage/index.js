/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Tooltip } from 'antd';
import {
  UpOutlined,
  DownOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  EnterOutlined,
  PlusCircleOutlined,
  DragOutlined,
} from '@ant-design/icons';
import Sortable from 'sortablejs';

import { arrayToObj, objToArray, getUniqueId, getDataType } from '@/utils/utils';
import {
  mapCmsComponents,
  staticLayouts,
} from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import ModalSelectLink from '@/pages/System/PageDecoration/CustomPage/Cms/Modals/ModalSelectLink';
import ModalSelectLinks from '@/pages/System/PageDecoration/CustomPage/Cms/Modals/ModalSelectLinks';
import ModalMaterial from '@/pages/Modals/ModalMaterial';

const FormItem = Form.Item;

@connect(({ customPage, global }) => {
  return {
    dataCms: customPage.dataCms,
    cIds: customPage.cIds,
    dataModal: global.dataModal,
  };
})
class CmsPage extends React.PureComponent {
  handleDataSort = params => {
    let { dispatch, dataCms } = this.props;
    const { newIndex, oldIndex } = params;

    const temp = dataCms[newIndex];
    dataCms[newIndex] = dataCms[oldIndex];
    dataCms[oldIndex] = temp;

    const payload = {
      dataCms: [...dataCms],
    };
    dispatch({ type: 'customPage/changeState', payload });
  };
  sortableContainersDecorator = componentBackingInstance => {
    const that = this;
    if (componentBackingInstance) {
      let options = {
        handle: '.panel .ant-card-extra .anticon-drag',
        draggable: '.panel',
        filter: 'button, label',
        onEnd: function(evt) {
          const { newIndex, oldIndex } = evt;
          const params = {
            newIndex,
            oldIndex,
          };
          that.handleDataSort(params);
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  /**
   *
   * @param {*} type 操作类型：插入[INSERT]，折叠[TOGGLE]，上移[UP]，下移[DOWN]，删除[DELETE], 修改[UPDATE]
   * @param {*} field
   * @param {*} data
   * @param {*} pIndex
   * @param {*} index
   */
  handleChange = (type, pIndex, others = {}) => {
    const { dispatch, dataCms } = this.props;
    const { disabled, field, data, index } = others;
    switch (type) {
      case 'UPDATE': {
        if (getDataType(field) === 'Array' && field.length === 2) {
          if (getDataType(index) === 'Number') {
            dataCms[pIndex][field[0]][index][field[1]] = data;
          } else {
            dataCms[pIndex][field[1]] = data;
          }
        } else {
          dataCms[pIndex][field] = data;
        }
        break;
      }
      case 'INSERT': {
        break;
      }
      case 'UP': {
        if (disabled) {
          return;
        } else {
          dataCms.splice(pIndex - 1, 0, dataCms[pIndex]);
          dataCms.splice(pIndex + 1, 1);
          break;
        }
      }
      case 'DOWN': {
        if (disabled) {
          return;
        } else {
          dataCms.splice(pIndex, 0, dataCms[pIndex + 1]);
          dataCms.splice(pIndex + 2, 1);
          break;
        }
      }
      case 'TOGGLE': {
        dataCms[pIndex].fold = !dataCms[pIndex].fold;
        break;
      }
      case 'DELETE': {
        if (getDataType(index) === 'Number') {
          dataCms[pIndex].list.splice(index, 1);
          dataCms[pIndex].list = dataCms[pIndex].list.concat([]);
        } else {
          dataCms.splice(pIndex, 1);
        }
        break;
      }
    }

    // 强制处理由于对象中的深层次数据更改造成的页面组件不重新渲染
    if (getDataType(field) === 'Array' && getDataType(index) === 'Number' && field.length === 2) {
      dataCms[pIndex].list = dataCms[pIndex].list.concat([]);
    }

    const payload = {
      dataCms: [...dataCms],
    };
    dispatch({ type: 'customPage/changeState', payload });
  };

  // 拼装当前组件的数据模型
  getTargetModel = type => {
    let { cIds } = this.props;
    const { list } = mapCmsComponents[type].dataModel;
    const cId = getUniqueId(cIds);
    cIds.push(cId);
    return {
      cId,
      ...list[0],
    };
  };

  handleItemAdd = (type, pIndex) => {
    const { dispatch, dataCms } = this.props;
    dataCms[pIndex].list = dataCms[pIndex].list.concat(this.getTargetModel(type));
    const payload = {
      dataCms: [...dataCms],
    };
    dispatch({ type: 'customPage/changeState', payload });
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
  // 拼装单个组件右上角的操作部分Dom
  ListItemBtnAdd = pIndex => {
    const { dispatch, dataCms, cIds } = this.props;

    const { type, list } = dataCms[pIndex];
    const { listLenLimit = 0 } = mapCmsComponents[type].dataModel;

    const temp = listLenLimit && list.length < listLenLimit;

    return (
      <>
        {temp ? (
          <FormItem colon={false} label=" " {...staticLayouts}>
            <Button
              type="dashed"
              block
              icon={<PlusCircleOutlined />}
              onClick={() => {
                if (type === 'CONTENTS') {
                  this.handleAdd('MODAL_CMS_SELECT_LINKS', {
                    linkTypes: ['ACTIVITY_DETAIL', 'ARTICLE_DETAIL'],
                    pIndex,
                    dataCms,
                    type,
                    cIds,
                    linkObj: list,
                    max: 50,
                  });
                } else if (type === 'TUTOR') {
                  this.handleAdd('MODAL_CMS_SELECT_LINKS', {
                    linkTypes: ['TUTOR'],
                    pIndex,
                    dataCms,
                    type,
                    cIds,
                    linkObj: list,
                    max: 10,
                  });
                } else {
                  this.handleItemAdd(type, pIndex);
                }
              }}
            >
              新增
            </Button>
          </FormItem>
        ) : null}
      </>
    );
  };
  // 拼装单个组件的footer操作部分
  getDomActions = pIndex => {
    const { dispatch, dataCms } = this.props;

    const { fold = false } = dataCms[pIndex];
    const disabledDown = pIndex === dataCms.length - 1;
    const disabledUp = pIndex === 0;

    return [
      <Tooltip title="对组件进行拖拽排序" key="DragOutlined">
        <DragOutlined />
      </Tooltip>,
      // <EnterOutlined key="EnterOutlined" />,
      fold ? (
        <Tooltip title="展开组件" key="FullscreenOutlined">
          <FullscreenOutlined
            title="拖拽"
            onClick={() => {
              this.handleChange('TOGGLE', pIndex);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="折叠组件" key="FullscreenExitOutlined">
          <FullscreenExitOutlined
            onClick={() => {
              this.handleChange('TOGGLE', pIndex);
            }}
          />
        </Tooltip>
      ),
      <Tooltip title="上移" key="UpOutlined">
        <UpOutlined
          className={disabledUp ? 'disabled' : ''}
          onClick={() => {
            this.handleChange('UP', pIndex, { disabled: disabledUp });
          }}
        />
      </Tooltip>,
      <Tooltip title="下移" key="DownOutlined">
        <DownOutlined
          className={disabledDown ? 'disabled' : ''}
          onClick={() => {
            this.handleChange('DOWN', pIndex, { disabled: disabledDown });
          }}
        />
      </Tooltip>,
      <Tooltip title="删除" key="DeleteOutlined">
        <DeleteOutlined
          onClick={() => {
            this.handleChange('DELETE', pIndex);
          }}
        />
      </Tooltip>,
    ];
  };

  render() {
    const { dataCms, dataModal } = this.props;
    return (
      <>
        <ModalMaterial />
        <ModalSelectLink dataModal={dataModal} />
        <ModalSelectLinks dataModal={dataModal} />

        {dataCms.length ? (
          <div className="cms-list" ref={this.sortableContainersDecorator}>
            {dataCms.map((pItem, pIndex) => {
              const { cId, type, title, fold } = pItem;
              const CmsComponent = mapCmsComponents[type] ? mapCmsComponents[type].component : null;
              return (
                <Card
                  className="panel"
                  bordered={false}
                  key={cId}
                  title={`${pIndex + 1}.${title}`}
                  bodyStyle={{ padding: fold ? '0' : '20px' }}
                  extra={this.getDomActions(pIndex)}
                >
                  {!fold && (
                    <>
                      <CmsComponent
                        className
                        {...pItem}
                        pIndex={pIndex}
                        handleChange={this.handleChange}
                      />

                      {/* 单个Item是否显示新增按钮 */}
                      {this.ListItemBtnAdd(pIndex)}
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="cms-unit-none"></div>
        )}
      </>
    );
  }
}
export default CmsPage;
