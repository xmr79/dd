/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
const CmsPage = props => {
  const {
    detail,
    dispatch,
    location: {
      query: { code = 'AGREEMENT_ORGAN' },
    },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'cmsPage/getCmsPageDetail',
      payload: {
        code,
      },
    });
  }, []);
  return (
    <>
      {detail.map((_, idx) => {
        const { type, cId, component } = _;
        if (type === 'EDITORS') {
          return <div key={cId} dangerouslySetInnerHTML={{ __html: component }}></div>;
        }
      })}
    </>
  );
};
export default connect(({ cmsPage }) => {
  return { detail: cmsPage.detail };
})(CmsPage);
