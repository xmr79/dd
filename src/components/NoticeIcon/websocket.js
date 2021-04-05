export default function socket(wsUrl, onMessage, code, account) {
  

  let lockReconnect = false; //避免重复连接

  let timeoutSet = null;
  let reconectNum = 0;

  let websocket;
  let timer = null;

  function reconnect() {
    if (lockReconnect) return;
    lockReconnect = true;
    if (reconectNum < 5) {
      clearTimeout(timeoutSet);
      timeoutSet = setTimeout(() => {
        createwebsocket();
        reconectNum++;
        console.log(`第${reconectNum}次重连`);
        lockReconnect = false;
      }, 5000);
    } else {
      console.log('无法连接？？？？？？？？？');
    }
  }

  function createwebsocket() {
    console.info(`创建`);

    websocket = new WebSocket(wsUrl);
    function doSend(data) {
      websocket.send(JSON.stringify(data));
    }
    function first() {
      doSend({
        msgType: 'FIRST_JOIN',
        data: {
          code,
          account,
        },
      });
    }
    websocket.onopen = function(evt) {
      console.log('连接成功');
      //   第一次连接
      first();

      //发送心跳
      timer = setInterval(() => {
        doSend({
          msgType: 'HEART_BEAT',
          data: {},
        });
      }, 15000);
    };
    websocket.onerror = function(evt) {
      console.log('error');
      //   reconnect();
    };
    websocket.onmessage = function(evt) {
      onMessage(evt);
    };
    websocket.onclose = function(evt) {
      console.log('连接失败', evt);
      clearInterval(timer);
      const { code } = evt;
      if (code !== 1005) {
        reconnect();
      }
    };
  }
  createwebsocket();
  return websocket;
}
