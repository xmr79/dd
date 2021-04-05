/**
 * Auther: APIS 
 */
import React, { useEffect, useState } from 'react';

const FileExport = props=> {
  const { url, dispatch } = props;

  useEffect(()=> {
    const linkExport = document.getElementById('J_HandleExport');
    if (url && linkExport) {
      linkExport.click();
      setTimeout(()=> {
        dispatch({type: 'global/changeState', payload: { urlFileExport: '' }});
      }, 100);
    }
  }, [url]);

  return <a href={url} download id="J_HandleExport"></a>
};
export default FileExport;