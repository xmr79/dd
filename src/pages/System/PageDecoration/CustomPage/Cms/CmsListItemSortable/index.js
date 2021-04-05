/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import Sortable from 'sortablejs';

const CmsTemplate = props => {
  const { children, pIndex, dataCms, dispatch } = props;

  // 拖拽排序
  const handleDataSort = params => {
    const { newIndex, oldIndex } = params;

    const temp = dataCms[pIndex]['list'][newIndex];
    dataCms[pIndex]['list'][newIndex] = dataCms[pIndex]['list'][oldIndex];
    dataCms[pIndex]['list'][oldIndex] = temp;

    // dataCms[pIndex]['list'] = dataCms[pIndex]['list'].concat([]);
    // dataCms.splice(pIndex, 1, dataCms[pIndex]);
    const payload = {
      dataCms: [...dataCms]
    };

    dispatch({type: 'customPage/changeState', payload});
  };

  const sortableContainersDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {
        handle: '.cms-panel-list-item .anticon-drag',
        draggable: '.cms-panel-list-item',
        filter: 'button, label',
        onEnd: function(evt) {
          const { newIndex, oldIndex } = evt;
          const params = {
            newIndex,
            oldIndex,
          };
          handleDataSort(params);
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  return (
    <div className="cms-panel-list" ref={sortableContainersDecorator}>
      {children}
    </div>
  );
};
export default connect(({ customPage }) => {
  return {
    dataCms: customPage.dataCms
  };
})(CmsTemplate);
