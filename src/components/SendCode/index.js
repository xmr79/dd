import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import styles from './index.less';
let timer = null;
const SendCode = props => {
  const { phoneName, form, loading, isdisable, codeloading, dispatch, type } = props;
  const [start, setStart] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  // 发送验证码1
  const handlesend = () => {
    form
      .validateFields([phoneName])
      .then(values => {
        // 0注册验证码 1找回验证码
        dispatch({
          type: 'user/codesend',
          payload: { mobile: values[phoneName], type },
        }).then(res => {
          if (res.status === 1) {
            setStart(true);
          }
        });
      })
      .catch(errorInfo => {});
  };
  // 设置验证码start
  const handlectrl = bool => {
    setStart(bool);
  };
  const [disabled, setdisabled] = useState(false);
  const [code, setcode] = useState('获取验证码');
  const startnum = 60;
  let num = startnum;

  useEffect(() => {
    if (start) {
      onSend();
    }
  }, [start]);

  const onSend = () => {
    setdisabled(true);
    setTime();
  };
  const init = () => {
    setcode(`重新获取`);
    num = startnum;
    handlectrl(false);
  };
  const setTime = () => {
    clearTimeout(timer);
    if (num <= 0) {
      init();
      setdisabled(false);
    } else {
      num--;
      setcode(`${num}s`);
      timer = setTimeout(() => {
        setTime();
      }, 1000);
    }
  };
  return (
    <Button
      className={styles.codebtn}
      loading={codeloading}
      disabled={codeloading}
      onClick={handlesend}
    >
      {code}
    </Button>
  );
};

export default connect(({ loading }) => ({
  codeloading: loading.effects['login/codesend'],
}))(SendCode);
