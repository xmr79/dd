export default {
  path: '/order',
  name: 'order',
  auths: 'ORDER',
  routes: [
    {
      path: '/order/query',
      name: 'query',
      auths: 'ORDER_QUERY',
      routes: [
        {
          path: '/order/query/list',
          name: 'list',
          component: './Order/Query/List',
          auths: 'ORDER_QUERY_LIST',
        },
      ],
    },
    {
      path: '/order/handle',
      name: 'handle',
      auths: 'ORDER_HANDLE',
      routes: [
        {
          path: '/order/handle/refund',
          name: 'refund',
          component: './Order/Handle/Refund',
          auths: 'ORDER_HANDLE_REFUND',
        },
        {
          path: '/order/handle/batchRefund',
          name: 'batchRefund',
          component: './Order/Handle/BatchRefund',
          auths: 'ORDER_HANDLE_BATCHREFUND',
        },
      ],
    },
    {
      path: '/order/evaluationManage',
      name: 'evaluationManage',
      auths: 'ORDER_EVALUATIONMANAGE',
      routes: [
        {
          path: '/order/evaluationManage/activityEvaluation',
          name: 'activityEvaluation',
          component: './Order/EvaluationManage/ActivityEvaluation',
          auths: 'ORDER_EVALUATIONMANAGE_ACTIVITYEVALUATION',
        },
      ],
    },
    {
      path: '/order/assetsManage',
      name: 'assetsManage',
      auths: 'ORDER_ASSETSMANAGE',
      routes: [
        {
          path: '/order/assetsManage/capitalList',
          name: 'capitalList',
          component: './Order/AssetsManage/CapitalList',
          auths: 'ORDER_ASSETSMANAGE_CAPITALLIST',
        },
        {
          path: '/order/assetsManage/platformBill',
          name: 'platformBill',
          component: './Order/AssetsManage/PlatformBill',
          auths: 'ORDER_ASSETSMANAGE_PLATFORMBILL',
        },
        {
          path: '/order/assetsManage/commission',
          name: 'commission',
          component: './Order/AssetsManage/Commission',
          auths: 'ORDER_ASSETSMANAGE_COMMISSION',
        },
        {
          path: '/order/assetsManage/commission/detail',
          name: 'commission.detail',
          component: './Order/AssetsManage/Commission/Detail',
          
        },
        {
          path: '/order/assetsManage/bill',
          name: 'bill',
          component: './Order/AssetsManage/Bill',
          auths: 'ORDER_ASSETSMANAGE_BILL',
        },
      ],
    },
    {
      path: '/order/capital',
      name: 'handle',
      auths: 'ORDER_CAPITAL',
      routes: [
        {
          path: '/order/capital/offlinePayment',
          name: 'offlinePayment',
          component: './Order/Capital/OfflinePayment',
          auths: 'ORDER_CAPITAL_offlinePayment',
        },
        {
          path: '/order/capital/invoice',
          name: 'invoice',
          component: './Order/Capital/Invoice',
          auths: 'ORDER_CAPITAL_INVOICE',
        },
        {
          path: '/order/capital/refundApplication',
          name: 'refundApplication',
          component: './Order/Capital/RefundApplication',
          auths: 'ORDER_CAPITAL_REFUND',
        },
      ],
    },
  ],
};
