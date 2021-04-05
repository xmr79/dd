import { Icon, Button, Radio, Modal, Form, Spin } from 'antd';
import { connect } from 'umi';
import styles from './index.less';

const WxPayModel = props => {
  const { dataModal, dispatch, loading } = props;
  const {
    modalType,
    modalShow,
    modalData: { url, order },
  } = dataModal;
  const handleCancel = () => {
    dispatch({
      type: 'global/changeState',
      payload: {
        dataModal: {
          modalType: '',
          modalShow: false,
          modalData: {},
        },
      },
    });
  };
  const handleOk = () => {
    dispatch({
      type: 'common/getOrderStatus',
      payload: {
        payType: 'WX',
        orderNo: order,
        url,
      },
    });
  };
  return (
    <>
      <Modal
        title="微信支付"
        visible={modalType === 'MODAL_WX' && modalShow}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            关闭
          </Button>,
          <Button key="success" type="primary" onClick={handleOk}>
            确认支付完成
          </Button>,
        ]}
      >
        <div className={styles.con}>
          {url && (
            <Spin spinning={false}>
              <img src={`data:image/jpg;base64,${url}`}></img>
            </Spin>
          )}
          <p>微信扫一扫支付</p>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ global, loading }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(WxPayModel);
