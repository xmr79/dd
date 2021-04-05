/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Affix } from 'antd';
import { mapCmsComponents } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import { arrayToObj, objToArray, getUniqueId } from '@/utils/utils';
import styles from './index.less';

const enumCmsComponents = objToArray(mapCmsComponents);

const CmsMenu = props => {
  const { dispatch, dataCms, cIds } = props;

  // 拼装当前组件的数据模型
  const getTargetModel = type => {
    const { title, dataModel = {}, styles, fold = false } = mapCmsComponents[type];
    const cId = getUniqueId(cIds);
    cIds.push(cId);
    const temp = {
      cId,
      type,
      title,
      styles,
      fold,
      ...dataModel,
      list: dataModel.list ? JSON.parse(JSON.stringify(dataModel.list)) : undefined,
    };

    if (temp.list) {
      temp.list = temp.list.map(item => {
        item.cId = getUniqueId(cIds);
        cIds.push(cId);
        return item;
      });
    }

    return temp;
  };

  const handle = type => {
    const payload = {
      dataCms: [...dataCms, getTargetModel(type)],
      cIds,
    };
    dispatch({ type: 'customPage/changeState', payload });
    setTimeout(()=> {
      const scrollTarget = document.querySelector('.antd-pro-components-q-layout-content-index-content');
      scrollTarget.scrollTop=scrollTarget.scrollHeight;
    }, 150);
  };

  return (
    <div className="cms-menu">
      <Affix
        offsetTop={20}
        target={() => document.querySelector('.antd-pro-components-q-layout-content-index-content')}
      >
        <div className={styles.menu}>
          <h3 className={styles.title}>组件库</h3>
          <div className={styles.menuList}>
            {enumCmsComponents.map((_, idx) => {
              return (
                <div
                  key={_.type}
                  className={styles.menuItem}
                  onClick={() => {
                    handle(_.type);
                  }}
                >
                  {_.title}
                </div>
              );
            })}
          </div>
        </div>
      </Affix>
    </div>
  );
};
export default connect(({ customPage }) => {
  return {
    dataCms: customPage.dataCms,
    cIds: customPage.cIds,
  };
})(CmsMenu);
