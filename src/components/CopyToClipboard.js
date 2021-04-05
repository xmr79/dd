/**
 * Auther: APIS 
 */
import React, { useEffect, useState } from 'react';
import { message} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const style = {
  cursor: 'pointer'
};

const Template = props=> {
  const { text, children } = props;

  useEffect(()=> {
  }, [text]);

  const onCopy = (test, result)=> {
    if (result) {
      message.success('已复制到剪切板~');
    } else {
      message.error('复制失败，请手动进行复制~');
    }
  }

  return (
    <CopyToClipboard text={text} onCopy={onCopy} style={style} title='点击可复制'>
      {children}
    </CopyToClipboard>
  );
};
export default Template;