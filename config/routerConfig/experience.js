export default {
  path: '/experience',
  name: 'experience',
  auths: 'EXPERIENCE',
  routes: [
    {
      path: '/experience/activity',
      name: 'activity',
      auths: 'EXPERIENCE_ACTIVITY',
      routes: [
        {
          path: '/experience/activity/manage',
          name: 'manage',
          component: './Experience/Activity/Manage',
          auths: 'EXPERIENCE_ACTIVITY_MANAGE',
        },
        {
          path: '/experience/activity/team',
          name: 'team',
          component: './Experience/Activity/Team',
          auths: '',
        },
        {
          path: '/experience/activity/audit',
          name: 'audit',
          component: './Experience/Activity/Audit',
          auths: 'EXPERIENCE_ACTIVITY_AUDIT',
        },
        {
          path: '/experience/activity/sort',
          name: 'sort',
          component: './Experience/Activity/Sort',
          auths: 'EXPERIENCE_ACTIVITY_SORT',
        },
        {
          path: '/experience/activity/label',
          name: 'label',
          component: './Experience/Activity/Label',
          auths: 'EXPERIENCE_ACTIVITY_LABEL',
        },
        {
          path: '/experience/activity/manage/createActivity',
          name: 'createActivity',
          component: './Experience/Activity/Manage/Create',
        },
        {
          path: '/experience/activity/team/createTeam',
          name: 'createTeam',
          component: './Experience/Activity/Team/Create',
        },
        {
          path: '/experience/activity/team/orderDetail',
          name: 'orderDetail',
          component: './Experience/Activity/Team/OrderDetail',
        },
      ],
    },
    {
      path: '/experience/content',
      name: 'content',
      auths: 'EXPERIENCE_CONTENT',
      routes: [
        {
          path: '/experience/content/manage',
          name: 'manage',
          component: './Experience/Content/Manage',
          auths: 'EXPERIENCE_CONTENT_MANAGE',
        },
        {
          path: '/experience/content/audit',
          name: 'audit',
          component: './Experience/Content/Audit',
          auths: 'EXPERIENCE_CONTENT_AUDIT',
        },
        {
          path: '/experience/content/sort',
          name: 'sort',
          component: './Experience/Content/Sort',
          auths: 'EXPERIENCE_CONTENT_SORT',
        },
        {
          path: '/experience/content/label',
          name: 'label',
          component: './Experience/Content/Label',
          auths: 'EXPERIENCE_CONTENT_LABEL',
        },
        {
          path: '/experience/content/manage/createContent',
          name: 'createContent',
          component: './Experience/Content/Manage/Create',
          auths: 'EXPERIENCE',
        },
      ],
    },
    {
      path: '/experience/topic',
      name: 'topic',
      auths: 'EXPERIENCE',
      routes: [
        {
          path: '/experience/topic/manage',
          name: 'manage',
          component: './Experience/Topic/Manage',
          auths: 'EXPERIENCE',
        },
        {
          path: '/experience/topic/sort',
          name: 'sort',
          component: './Experience/Topic/Sort',
          auths: 'EXPERIENCE',
        },
      ],
    },
    {
      path: '/experience/comment',
      name: 'comment',
      auths: 'EXPERIENCE_COMMENT',
      routes: [
        {
          path: '/experience/comment/content',
          name: 'content',
          component: './Experience/Comment/Content',
          auths: 'EXPERIENCE_COMMENT_CONTENT',
        },
        {
          path: '/experience/comment/topic',
          name: 'topic',
          component: './Experience/Comment/Topic',
        },
      ],
    },

    {
      path: '/experience/tool',
      name: 'tool',

      routes: [
        {
          path: '/experience/tool/vote',
          name: 'vote',
          component: './Experience/Tool/Vote',
        },
      ],
    },
    {
      path: '/experience/listManage',
      name: 'listManage',
      component: './Experience/ListManage',
    },
    {
      path: '/experience/goodManage',
      name: 'goodManage',
      component: './Experience/GoodManage',
    },
  ],
};
