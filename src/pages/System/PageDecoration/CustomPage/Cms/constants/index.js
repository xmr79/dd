import CmsPanelSearch from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelSearch';
import CmsPanelHeader from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelHeader';
import CmsPanelBanner from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelBanner';
import CmsPanelNav from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelNav';
import CmsPanelTitle from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelTitle';
import CmsPanelPictures from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelPictures';
import CmsPanelContents from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelContents';
import CmsPanelTutor from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelTutor';
import CmsPanelSpacing from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelSpacing';
import CmsPanelEditors from '@/pages/System/PageDecoration/CustomPage/Cms/CmsPanelEditors';

export const mapCmsComponents = {
  HEADER: {
    type: 'HEADER',
    title: '头部背景图',
    component: CmsPanelHeader,
    dataModel: {
      // 数据模型
      mode: 1, // 默认显示背景图,0表示不显示
      imgUrl:
        'https://pphz-test.oss-cn-hangzhou.aliyuncs.com/img/e232513311974eb8bc70833faa308b97.png',
    },
  },
  SEARCH: {
    type: 'SEARCH', // 组件类型
    title: '搜索', // 组件名称
    component: CmsPanelSearch, // 组件
    dataModel: {
      // 数据模型
      mode: 'ACTIVITY',
    },
  },

  BANNER: {
    type: 'BANNER',
    title: '轮播广告位',
    component: CmsPanelBanner,
    dataModel: {
      // 数据模型
      mode: 1,
      shadow: false,
      height: 440,
      showHandle: true,
      listLenLimit: 10,
      list: [
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkOthers: {},
        },
      ],
    },
  },
  PICTURES: {
    type: 'PICTURES',
    title: '图片广告位',
    component: CmsPanelPictures,
    dataModel: {
      // 数据模型
      mode: 1, // 1[样式1], 2[样式2], 3[样式3]
      listLenLimit: 0,
      // showHandle: true,
      list: [
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkOthers: {},
        },
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkOthers: {},
        },
      ],
    },
  },
  NAV: {
    type: 'NAV',
    title: '导航',
    component: CmsPanelNav,
    dataModel: {
      // 数据模型
      mode: 1, // 1[flex均分], 2[单个item宽度固定], 3[九宫格]
      showHandle: true,
      listLenLimit: 10,
      list: [
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkName: undefined,
          linkOthers: {},
        },
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkOthers: {},
        },
        {
          imgUrl: undefined,
          linkType: undefined,
          linkId: undefined,
          linkShow: undefined,
          linkOthers: {},
        },
      ],
    },
  },
  TITLE: {
    type: 'TITLE',
    title: '标题',
    component: CmsPanelTitle,
    dataModel: {
      // 数据模型
      mode: 0, // 0[标题部分用文本], 1[标题部分用图片]
      isMore: false, // false[不显示'查看全部']，true[显示'查看全部']
      showHandle: false,
      imgUrl: undefined,
      linkType: undefined,
      linkId: undefined,
      linkShow: undefined,
      linkName: undefined,
      linkOthers: {},
    },
  },

  CONTENTS: {
    type: 'CONTENTS',
    title: '内容列表',
    component: CmsPanelContents,
    dataModel: {
      // 数据模型
      mode: 0, // 0[普通列表], 1[瀑布流]
      showHandle: true,
      listLenLimit: 9999,
      list: [
        // {
        //   imgUrl: undefined,
        //   linkType: undefined,
        //   linkId: undefined,
        //   linkShow: undefined,
        //   linkOthers: {},
        // },
        // {
        //   imgUrl: undefined,
        //   linkType: undefined,
        //   linkId: undefined,
        //   linkShow: undefined,
        //   linkOthers: {},
        // },
      ],
    },
  },
  TUTOR: {
    type: 'TUTOR',
    title: '导师列表',
    component: CmsPanelTutor,
    dataModel: {
      // 数据模型
      mode: 'MANUAL', // MANUAL[手动], AUTO[自动]
      showHandle: true,
      len: 10, // 显示个数上限
      listLenLimit: 10,
      list: [
        // {
        //   imgUrl: undefined,
        //   linkType: undefined,
        //   linkId: undefined,
        //   linkShow: undefined,
        //   linkOthers: {},
        // },
        // {
        //   imgUrl: undefined,
        //   linkType: undefined,
        //   linkId: undefined,
        //   linkShow: undefined,
        //   linkOthers: {},
        // },
      ],
    },
  },
  SPACING: {
    type: 'SPACING',
    title: '间距',
    component: CmsPanelSpacing,
    dataModel: {
      // 数据模型
      height: 20,
      color: '#999',
    },
  },
  EDITORS: {
    type: 'EDITORS',
    title: '富文本',
    component: CmsPanelEditors,
    dataModel: {},
  },
};

export const modeCmsPanelSearch = [
  {
    key: 'ACTIVITY',
    value: '活动',
  },
  {
    key: 'ARTICLE',
    value: '文章',
  },
  {
    key: 'ORGAN',
    value: '企业',
  },
  {
    key: 'EXPERT',
    value: '专家',
  },
];

export const staticLayouts = {
  wrapperCol: { span: 14 },
  labelCol: { span: 3 },
};

export const enumLinkType = [
  {
    key: 'ACTIVITY',
    value: '活动列表',
  },
  {
    key: 'ACTIVITY_DETAIL',
    value: '活动详情',
    title: '活动标题',
    titleKey: 'title',
    othersKey: ['title', 'imgUrl', 'id', 'minStartDate', 'maxStartDate'],
  },
  {
    key: 'ARTICLE',
    value: '内容列表', 
  },
  {
    key: 'ARTICLE_DETAIL',
    value: '内容详情',
    title: '文章标题',
    titleKey: 'title',
    othersKey: ['id', 'title', 'imgUrl', 'createTime', 'editTime'],
  },
  {
    key: 'TOPIC',
    value: '话题列表',
    disabled: true,
  },
  {
    key: 'TOPIC_DETAIL',
    value: '话题详情',
    disabled: true,
  },
  {
    key: 'ORGAN',
    value: '企业列表',
  },
  {
    key: 'ORGAN_DETAIL',
    value: '企业主页',
    title: '企业名称',
    titleKey: 'authName',
    othersKey: ['id', 'authName', 'avatarUrl'],
  },
  {
    key: 'EXPERT',
    value: '专家列表',
  },
  {
    key: 'EXPERT_DETAIL',
    value: '专家主页',
    title: '姓名',
    titleKey: 'authName',
    othersKey: ['id', 'authName', 'avatarUrl'],
  },
  {
    key: 'CMS',
    value: 'CMS页面',
    title: '页面名称',
    titleKey: 'name',
    othersKey: ['name'],
    linkIdKey: 'code',
    othersKey: ['id', 'code'],
  },
  {
    key: 'COLLECTION',
    value: '意见征集',
  },
  {
    key: 'TUTOR',
    value: '导师列表',
    title: '导师姓名',
    titleKey: 'name',
    othersKey: ['id', 'name', 'avatar', 'introduction', 'domainIntroduction', 'userAuthInfoId'],
  },
];
