export default {
  path: '/customer',
  name: 'customer',
  auths: 'CUSTOMER',
  routes: [
    {
      path: '/customer/manage',
      name: 'manage',
      auths: 'CUSTOMER_MANAGE',
      routes: [
        {
          path: '/customer/manage/ordinary',
          name: 'ordinary',
          component: './Customer/Manage/Ordinary',
          auths: 'CUSTOMER_MANAGE_ORDINARY',
        },
        {
          path: '/customer/manage/enterprise',
          name: 'enterprise',
          component: './Customer/Manage/Enterprise',
          auths: 'CUSTOMER_MANAGE_EXTERPRISE',
        },
        {
          path: '/customer/manage/expert',
          name: 'expert',
          component: './Customer/Manage/Expert',
          auths: 'CUSTOMER_MANAGE_EXPERT',
        },
        {
          path: '/customer/manage/enterprise/detail',
          name: 'enterprise.detail',
          component: './Customer/Manage/Enterprise/Detail',
        },
        {
          path: '/customer/manage/expert/detail',
          name: 'expert.detail',
          component: './Customer/Manage/Expert/Detail',
        },
      ],
    },
    {
      path: '/customer/recommend',
      name: 'recommend',
      component: './Customer/Recommend',
      auths: 'CUSTOMER_RECOMMEND',
    },
    {
      path: '/customer/audit',
      name: 'audit',
      auths: 'CUSTOMER_AUDIT',
      routes: [
        {
          path: '/customer/audit/enterpriseAudit',
          name: 'enterpriseAudit',
          component: './Customer/Audit/EnterpriseAudit',
          auths: 'CUSTOMER_AUDIT_EXTERPRISEAUDIT',
        },
        {
          path: '/customer/audit/expertAudit',
          name: 'expertAudit',
          component: './Customer/Audit/ExpertAudit',
          auths: 'CUSTOMER_AUDIT_EXPERTAUDIT',
        },
      ],
    },
    {
      path: '/customer/sortManage',
      name: 'sortManage',
      auths: 'CUSTOMER_SORTMANAGE',
      routes: [
        {
          path: '/customer/sortManage/enterpriseSort',
          name: 'enterpriseSort',
          component: './Customer/SortManage/EnterpriseSort',
          auths: 'CUSTOMER_SORTMANAGE_EXTERPRISEAUDIT',
        },
        {
          path: '/customer/sortManage/expertSort',
          name: 'expertSort',
          component: './Customer/SortManage/ExpertSort',
          auths: 'CUSTOMER_SORTMANAGE_EXPERTAUDIT',
        },
      ],
    },
    {
      path: '/customer/cancellation',
      name: 'cancellation',
      component: './Customer/Cancellation',
      auths: 'CUSTOMER_CANCELLATION',
    },
  ],
};