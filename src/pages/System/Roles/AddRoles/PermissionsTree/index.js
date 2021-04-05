/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Icon, Row, Col, Input, Popover, Form, Tree } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
const { TreeNode } = Tree;
const isarr = (arr1, arr2) => {
  let arr = [];
  arr1.forEach(element => {
    if (arr2.includes(element)) {
      arr.push(element);
    }
  });
  return !arr.length;
};

const getSS = (superiorId, dataFuncs) => {
  let res;
  const abc = dataFuncs => {
    for (var i of dataFuncs) {
      if (i.key === superiorId) {
        res = i;
      } else if (i.children.length > 0) {
        res = abc(i.children);
        if (res) {
          return res;
        }
      }
    }
    return res;
  };
  abc(dataFuncs);
  return res;
};
const digui = (dataFuncs, nval, superior, sibling) => {
  if (isarr(nval, sibling)) {
    nval = nval.filter(_ => ![superior].includes(_));
  }
  const superiorobj = getSS(superior, dataFuncs);
  if (superiorobj && superiorobj.superior) {
    nval = digui(dataFuncs, nval, superiorobj.superior, superiorobj.sibling);
  }
  return nval;
};
const TreeItem = forwardRef((props, ref) => {
  const { value, onChange, dataFuncs = [] } = props;

  const onCheck = (val, e) => {
    const node = e.node;
    let nval = val.checked;
    const current = node.key;
    const event = e.event;
    const checked = e.checked;
    const sibling = node.sibling;
    const parent = node.parent;
    const childs = node.childs;
    const arrChilds = node.arrChilds;
    const superior = node.superior;
    const type = node.type;
    if (type === 'API') {
      const dearr = sibling.filter(itm => current !== itm);
      if (event === 'check' && checked) {
        nval = [...nval, current, ...parent];
        nval = nval.filter(_ => !dearr.includes(_));
      } else {
        nval = [...nval, ...dearr, ...parent];
      }
    } else {
      if (event === 'check' && checked) {
        nval = [...nval, ...childs, ...parent];
      } else {
        nval = nval.filter(_ => !arrChilds.includes(_));
        if (type === 'MENU') {
          nval = digui(dataFuncs, nval, superior, sibling);
        }
      }
    }
    // 去重处理
    nval = nval
      .filter((item, index, arr) => {
        return arr.indexOf(item) == index;
      })
      .map(item => {
        return item;
      });
    onChange(nval);
  };
  const getClass = item => {
    const { parent, type } = item;
    const parentclass = parent.length > 0 ? styles.aaa : styles.bbb;
    const btnapiclass = type !== 'MENU' ? styles.btnclass : styles.menuclass;
    return classnames(btnapiclass, parentclass);
  };
  const getTreenode = data => {
    data = data.map((_, idx) => {
      return <TreeNode {..._}>{getTreenode(_.children)}</TreeNode>;
    });
    return data;
  };
  return (
    <div className={styles.treeMain}>
      <Tree
        defaultExpandAll
        checkable
        checkStrictly
        treeData={dataFuncs}
        checkedKeys={value}
        onCheck={onCheck}
      >
        {getTreenode(dataFuncs)}
      </Tree>
    </div>
  );
});
const PermissionsTree = props => {
  const { name, id, label, dataFuncs, form } = props;

  return (
    <div>
      <Form.Item
        form={form}
        label={label}
        name={name}
        rules={[{ required: true, message: '请选择角色权限' }]}
      >
        <TreeItem dataFuncs={dataFuncs} />
      </Form.Item>
    </div>
  );
};

export default PermissionsTree;
