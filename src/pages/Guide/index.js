/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button } from 'antd';
import styles from './index.less';
import { getImgUrl } from '@/utils/utils';
const Guide = props => {
  const { isGuide, dispatch } = props;
  const [current, setCurrent] = useState('1');
  const list = [
    {
      key: '1',
      icon: getImgUrl('step1.png'),
      title: '新用户引导',
      des: '欢迎使用一品杭平台，请按顺序完成以下步骤，以便开始业务推广',
      btnText: '开始',
      style: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
      jthidden: true,
      url: '/system/personalCenter',
    },
    {
      key: '2',
      icon: getImgUrl('step2.png'),
      title: '主页信息完善',
      des:
        '请上传企业图片、标语、简介等信息，会在小程序端展示。 信息在系统-个人中心-企业主页填写。',
      btnText: '下一步',
      style: {
        left: '160px',
        top: '140px',
      },
      url: '/system/personalCenter',
    },
    {
      key: '3',
      icon: getImgUrl('step3.png'),
      title: '绑定管理员、核销员',
      des:
        '可以绑定1个管理员、多个核销员。创建活动时，须绑定核销员，用户抵达活动现场后，核销员进行扫码核销。绑定管理员、核销员在系统-个人中心-运营管理完成绑定。',
      btnText: '下一步',
      style: {
        left: '160px',
        top: '140px',
      },
      url: '/experience/activity/manage',
    },
    {
      key: '4',
      icon: getImgUrl('step4.png'),
      title: '创建活动',
      des: '去创建你的第一个活动吧，创建完成，待平台审核通过后，用户可以预约活动',
      btnText: '知道了',
      style: {
        left: '160px',
        top: '45px',
      },
    },
  ];
  const onNext = item => {
    const { url } = item;
    if (current === '4') {
      dispatch({
        type: 'global/changeState',
        payload: {
          isGuide: false,
        },
      });
     
    } else {
      if (url) {
        history.push(url);
      }
      const c = current - 0 + 1;
      setCurrent(c + '');
    }
  };
  return (
    isGuide && (
      <div className={styles.guideCon}>
        {list.map((_, idx) => {
          return (
            current === _.key && (
              <div key={idx} className={styles.stepCon} style={_.style}>
                <img className={styles.icon} src={_.icon} alt="" />
                <div className={styles.title}>{_.title}</div>
                <div className={styles.des}>{_.des}</div>
                <Button
                  type="primary"
                  onClick={() => {
                    onNext(_);
                  }}
                >
                  {_.btnText}
                </Button>
                {!_.jthidden && (
                  <div className={styles.jt}>
                    <img src={getImgUrl('jt.png')} alt="" />
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>
    )
  );
};
export default connect(({ global }) => {
  return {
    isGuide: global.isGuide,
  };
})(Guide);
