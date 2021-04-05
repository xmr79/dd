/**
 * Auther: APIS
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
const AuthBlock = props => {
  const { auth, userAuths, children } = props;

  if (userAuths.includes(auth) || !auth) {
    return <>{children}</>;
  } else {
    return null;
  }
};
export default connect(({ user }) => {
  return {
    userAuths: user.userAuths,
  };
})(AuthBlock);
