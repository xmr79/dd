import moment from 'moment';
// paginationDefault
export const paginations = {
  defaultCurrent: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['5', '10', '20', '50'],
};
// staticModal
export const staticModal = {
  modalType: '',
  modalShow: false,
  modalData: {},
};
// 充值记录的最近时间
export const enumRecentRechargeTime = [
  {
    key: '3d',
    value: [
      moment(new Date())
        .add(-3, 'days')
        .startOf('day')
        .valueOf(),
      moment(new Date())
        .add(-1, 'days')
        .endOf('day')
        .valueOf(),
    ],
    name: '近3天',
  },
  {
    key: '7d',
    value: [
      moment(new Date())
        .add(-7, 'days')
        .startOf('day')
        .valueOf(),
      moment(new Date())
        .add(-1, 'days')
        .endOf('day')
        .valueOf(),
    ],
    name: '近7天',
  },
  {
    key: '15d',
    value: [
      moment(new Date())
        .add(-15, 'days')
        .startOf('day')
        .valueOf(),
      moment(new Date())
        .add(-1, 'days')
        .endOf('day')
        .valueOf(),
    ],
    name: '近15天',
  },
  {
    key: '30d',
    value: [
      moment(new Date())
        .add(-30, 'days')
        .startOf('day')
        .valueOf(),
      moment(new Date())
        .add(-1, 'days')
        .endOf('day')
        .valueOf(),
    ],
    name: '近30天',
  },
  {
    key: '6m',
    value: [
      moment(new Date())
        .add(-6, 'months')
        .startOf('month')
        .valueOf(),
      moment(new Date())
        .add(-1, 'months')
        .endOf('month')
        .valueOf(),
    ],
    name: '近半年',
  },
  {
    key: '12m',
    value: [
      moment(new Date())
        .add(-12, 'months')
        .startOf('month')
        .valueOf(),
      moment(new Date())
        .add(-1, 'months')
        .endOf('month')
        .valueOf(),
    ],
    name: '近1年',
  },
];

export const accountStatus = [
  {
    key: 'NORMAL',
    color: 'green',
    value: '使用中',
  },
  {
    key: 'STOP',
    color: 'red',
    value: '已禁用',
  },
];

export const aduitStatus = [
  {
    key: 'AUTHING',
    color: '',
    value: '待审核',
  },
  {
    key: 'AUTH_SUCCESS',
    color: 'green',
    value: '审核成功',
  },
  {
    key: 'AUTH_FAIL',
    color: 'red',
    value: '审核拒绝',
    isrefuse: true,
  },
];

export const activityStatus = [
  {
    key: 'WAIT_BEGIN',
    color: 'blue',
    value: '待开始',
  },
  {
    key: 'PROCESSING',
    color: 'green',
    value: '进行中',
  },
  {
    key: 'OVER',
    color: 'red',
    value: '已结束',
  },
];

export const sponsorType = [
  {
    key: 'PLATFORM',
    value: '平台自营',
  },
  {
    key: 'ENTERPRISE',
    value: '入驻企业',
  },
  // {
  //   key: 'EXPERT',
  //   value: '认证专家',
  // },
];

export const PLATFORM = [
  {
    key: 'ZFB',
    value: '支付宝',
  },
  {
    key: 'WX',
    value: '微信',
  },
];

export const applyWay = [
  {
    key: 'SYSTEM',
    value: '后台提交',
  },
  {
    key: 'ZFB',
    value: '支付宝',
  },
  {
    key: 'WX',
    value: '微信',
  },
];

export const payType = [
  {
    key: 'ZFB',
    value: '支付宝',
  },
  {
    key: 'WX',
    value: '微信',
  },
  {
    key: 'OFFLINE',
    value: '线下支付',
  },
];

export const ORDER_PAYTYPE = [
  {
    key: 'PAY_ZFB',
    value: '支付宝',
  },
  {
    key: 'PAY_WX',
    value: '微信',
  },
  {
    key: 'PAY_OFFLINE',
    value: '线下支付',
  },
];
export const orderStatus = [
  {
    key: 'WAIT_PAY',
    color: 'red',
    value: '待付款',
  },
  {
    key: 'WAIT_USE',
    color: 'orange',
    value: '待使用',
  },
  {
    key: 'WAIT_EVALUATION',
    color: 'cyan',
    value: '待评价',
  },
  {
    key: 'FINISHED',
    color: 'lime',
    value: '已完成',
  },
  {
    key: 'WAIT_REFUND',
    color: 'gold',
    value: '退款中',
  },
  {
    key: 'REFUNDED',
    color: 'green',
    value: '已退款',
  },
  {
    key: 'CLOSED',
    color: '',
    value: '已关闭',
  },
  {
    key: 'EXPIRED',
    color: 'red',
    value: '已过期',
  },
];

export const sexStatus = [
  {
    key: '1',
    color: '',
    value: '男',
  },
  {
    key: '2',
    color: 'red',
    value: '女',
  },
];

export const refundStatus = [
  {
    key: 'REFUNDING',
    color: '',
    value: '退款中',
  },
  {
    key: 'REFUNDED',
    color: 'green',
    value: '已退款',
  },
];
export const batchRefundStatus = [
  {
    key: '1',
    color: '',
    value: '退款中',
  },
  {
    key: '2',
    color: 'green',
    value: '已退款',
  },
];
export const userTag = [
  {
    key: 'ADMIN',
    value: '管理员',
  },
  {
    key: 'VERIFIER',
    value: '核销员',
  },
];

export const activityAuditStatus = [
  {
    key: 'WAIT_REVIEW',
    color: 'blue',
    value: '待审核',
  },
  {
    key: 'WAIT_SUBMIT',
    color: '',
    value: '待提交',
  },
  {
    key: 'SUCCEED',
    color: 'green',
    value: '审核通过',
  },
  {
    key: 'FAILED',
    color: 'red',
    value: '审核拒绝',
    isrefuse: true,
  },
];

export const BONDSTATUS = [
  {
    key: 'N',
    value: '待缴纳',
  },
  {
    key: 'Y',
    value: '已缴纳',
  },
];

export const tradeType = [
  {
    key: 'ACTIVITY_RESERVATION',
    color: '',
    value: '活动预约',
  },
  {
    key: 'ACTIVITY_REFUND',
    color: 'green',
    value: '活动退款',
  },
];

export const BOSPayType = [
  {
    key: 'WX',
    value: '微信',
  },
  {
    key: 'OFFLINE',
    value: '线下支付',
  },
];
export const userType = [
  {
    key: 'N',
    color: 'green',
    value: '使用中',
  },
  {
    key: 'S',
    color: 'red',
    value: '已禁用',
  },
  {
    key: 'Y',
    color: 'red',
    value: '已注销',
  },
];

export const COMPANYTYPE = [
  {
    key: 'ENTERPRISE',

    value: '企业单位',
  },
  {
    key: 'PUBLIC',

    value: '事业单位',
  },
];

export const IncomeExpenditureType = [
  {
    key: 'INCOME',

    value: '收入',
  },
  {
    key: 'EXPENDITURE',

    value: '支出',
  },
];

export const contentStatus = [
  {
    key: 'AUTHING',
    color: '',
    value: '审核中',
  },
  {
    key: 'WAIT_SUBMIT',
    color: '',
    value: '待提交',
  },
  {
    key: 'AUTH_SUCCESS',
    color: 'green',
    value: '已发布',
  },
  {
    key: 'AUTH_FAIL',
    color: 'red',
    value: '审核拒绝',
    isrefuse: true,
  },
];
export const SCORE = [
  {
    key: 'FIVE',
    num: 5,
    value: '五颗星',
  },
  {
    key: 'FOUR',
    num: 4,
    value: '四颗星',
  },
  {
    key: 'THREE',
    num: 3,
    value: '三颗星',
  },
  {
    key: 'TWO',
    num: 2,
    value: '二颗星',
  },
  {
    key: 'ONE',
    num: 1,
    value: '一颗星',
  },
];

export const RECOMMEND_TYPE = [
  {
    key: 'EXPERIENCE',
    value: '体验点',
  },
  {
    key: 'TOPIC',
    value: '话题',
  },
  {
    key: 'PERSON',
    value: '人物',
  },
  {
    key: 'BRAND',
    value: '品牌',
  },
];

export const RECOMMEND_STATUS = [
  {
    key: 'WAIT',
    color: '',
    value: '待处理',
  },
  {
    key: 'SUCCESS',
    color: 'green',
    value: '有效',
  },
  {
    key: 'FAIL',
    color: 'red',
    value: '无效',
    isrefuse: true,
  },
];

export const CANCELLATION_BONE_STATUS = [
  {
    key: 'NONE',
    color: '',
    value: '无退款',
  },
  {
    key: 'WAIT_CONFIRM',
    color: '',
    value: '待用户确认',
  },
  {
    key: 'WAIT_RETURN',
    color: 'blue',
    value: '待退还',
  },
  {
    key: 'SUCCESS',
    color: 'green',
    value: '退还成功',
  },
  {
    key: 'FAIL',
    color: 'green',
    value: '退还失败',
    isrefuse: true,
  },
];

export const CANCELLATION_STATUS = [
  {
    key: 'AUTHING',
    color: '',
    value: '待审核',
  },
  {
    key: 'AUTH_SUCCESS',
    color: 'green',
    value: '审核通过',
  },
  {
    key: 'AUTH_FAIL',
    color: 'red',
    value: '审核拒绝',
    isrefuse: true,
  },
  {
    key: 'REVOCATION',
    color: 'blue',
    value: '已撤销',
  },
];

export const REFUND_METHOD = [
  {
    key: 'ORIGINAL',
    value: '原路退还',
  },
  {
    key: 'ASSIGN',
    value: '指定账户',
  },
  {
    key: 'NONE',
    value: '未确认',
  },
];

export const PAGE_STATUS = [
  {
    key: 'WAIT_PUBLISH',
    color: '',
    value: '未发布',
  },
  {
    key: 'TIME_PUBLISH',
    color: 'blue',
    value: '定时发布中',
  },
  {
    key: 'PUBLISH',
    color: 'green',
    value: '已发布',
  },
];

export const CONTENT_AUDIT_REASON = [
  {
    key: '1',
    value: '包含敏感词汇',
  },
  {
    key: '2',
    value: '内容与平台调性不符',
  },
  {
    key: '3',
    value: '其他',
  },
];

export const ACTIVITY_AUDIT_REASON = [
  {
    key: '1',
    value: '包含敏感词汇',
  },
  {
    key: '2',
    value: '收费不合理',
  },
  {
    key: '3',
    value: '活动设置不合理',
  },
  {
    key: '4',
    value: '活动图片不清晰',
  },
  {
    key: '5',
    value: '活动图片不合规',
  },
  {
    key: '6',
    value: '其他',
  },
];

export const ENTERPRISE_AUDIT_REASON = [
  {
    key: '1',
    value: 'logo不清晰',
  },
  {
    key: '2',
    value: '营业执照不清晰',
  },
  {
    key: '3',
    value: '简介描述不清晰',
  },
  {
    key: '4',
    value: '其他',
  },
];

export const EXPERT_AUDIT_REASON = [
  {
    key: '1',
    value: '头像不清晰',
  },
  {
    key: '2',
    value: '身份证不清晰',
  },
  {
    key: '3',
    value: '简介描述不清晰',
  },
  {
    key: '4',
    value: '其他',
  },
];

export const AUDIT_REMINDER_TYPE = [
  {
    key: 'AUTH_COMPANY',
    value: '企业审核',
  },
  {
    key: 'AUTH_EXPERT',
    value: '专家审核',
  },
  {
    key: 'UNSUBSCRIBE',
    value: '注销申请',
  },
  {
    key: 'USER_RECOMMEND',
    value: '用户推荐',
  },
  {
    key: 'ACTIVITY_AUDIT',
    value: '活动审核',
  },
  {
    key: 'CONTENT_AUDIT',
    value: '文章审核',
  },
  {
    key: 'EARNEST_MONEY',
    value: '保证金线下缴纳',
  },
];

export const CMS_EXTENSION = [
  { key: 'INDEX', value: 'pages/Tabber/home' },
  { key: 'YIPINHANG', value: 'pages/Tabber/yph' },
  { key: 'ZHUANQU_TIYAN', value: 'pages/Tabber/cmstwo' },
];

export const BLACK_TYPE = [
  {
    key: 'ONE',
    value: '1天',
  },
  {
    key: 'THREE',
    value: '3天',
  },
  {
    key: 'SEVEN',
    value: '7天',
  },
  {
    key: 'FOURTEEN',
    value: '14天',
  },
  {
    key: 'PERMANENT',
    value: '永久',
  },
];

export const operationType = [
  { key: 'ADD', value: '添加' },
  { key: 'UPDATE', value: '修改' },
  { key: 'DELETE', value: '删除' },
  { key: 'EXAMINE', value: '审核' },
  { key: 'DISABLE', value: '禁用' },
  { key: 'ENABLE', value: '解禁' },
  { key: 'REFUND', value: '退款' },
  { key: 'OVER', value: '结束' },
];

export const businessName = [
  { key: '加入黑名单', value: '加入黑名单' },
  { key: '移除黑名单', value: '移除黑名单' },
  { key: '账号禁用', value: '账号禁用' },
  { key: '账号解禁', value: '账号解禁' },
  { key: '用户推荐', value: '用户推荐' },
  { key: '用户审核-入驻企业', value: '用户审核-入驻企业' },
  { key: '用户审核-认证专家', value: '用户审核-认证专家' },
  { key: '注销账号审核', value: '注销账号审核' },
  { key: '新建活动', value: '新建活动' },
  { key: '编辑活动', value: '编辑活动' },
  { key: '结束活动', value: '结束活动' },
  { key: '活动审核', value: '活动审核' },
  { key: '新增文章', value: '新增文章' },
  { key: '编辑文章', value: '编辑文章' },
  { key: '删除文章', value: '删除文章' },
  { key: '文章审核', value: '文章审核' },
  { key: '文章评论', value: '文章评论' },
  { key: '批量退款', value: '批量退款' },
  { key: '活动评价', value: '活动评价' },
  { key: '页面装修', value: '页面装修' },
  { key: '保证金设置', value: '保证金设置' },
];

export const journalRenderType = {
  1: '添加',
  2: '修改',
  3: '删除',
  4: '审核',
  5: '禁用',
  6: '解禁',
  7: '退款',
  8: '结束',
};

export const invoiceState = [
  {
    key: 'BILLING',
    color: 'blue',
    value: '待开票',
  },
  {
    key: 'INVOICED',
    color: 'green',
    value: '已开票',
  },
  {
    key: 'REFUSED',
    color: 'red',
    value: '审核拒绝',
    isrefuse: true,
  },
];

export const invoiceType = [
  { key: 'COMPANY', value: '企业普通发票' },
  { key: 'PERSON', value: '个人普通发票' },
];
export const CERTIFICATES_TYPE = [
  { key: 0, value: '身份证' },
  { key: 1, value: '护照' },
  { key: 2, value: '港澳居民来往内地通行证' },
  { key: 3, value: '台湾居民来往内地通行证' },
];

export const ACTIVITY_TYPE = [
  { key: 'TEAM', value: '团体活动' },
  { key: 'NORMAL', value: '普通活动' },
];

export const ACTIVITY_TEAM_STATUS = [
  {
    key: 'NO_APPOINT',
    color: 'blue',
    value: '待预约',
  },
  {
    key: 'RESERVED',
    color: 'green',
    value: '已预约',
  },
  {
    key: 'END',
    color: 'red',
    value: '已结束',
  },
];
