export default {
  path: '/system',
  icon: 'desktop',
  name: 'system',
  auths: 'SYSTEM',
  routes: [
    { path: '/system/sourceHouse', name: 'sourceHouse', component: './System/SourceHouse' },
    {
      path: '/system/manage',
      name: 'manage',
      auths: 'SYSTEM_MANAGE',
      routes: [
        {
          path: '/system/manage/account',
          name: 'account',
          component: './System/Account',
          auths: 'SYSTEM_MANAGE_ACCOUNT',
        },
        {
          path: '/system/manage/roles',
          name: 'roles',
          component: './System/Roles',
          auths: 'SYSTEM_MANAGE_ROLES',
        },
        {
          path: '/system/manage/roles/roleCreate',
          name: 'roles.roleCreate',
          component: './System/Roles/AddRoles',
          hideInMenu: true,
        },
        {
          path: '/system/manage/personSet',
          name: 'personSet',
          component: './System/PersonSet',
          auths: 'SYSTEM_MANAGE_PERSONSET',
        },
      ],
    },
    {
      path: '/system/pageDecoration',
      name: 'pageDecoration',
      auths: 'SYSTEM_PAGEDECORATION',
      routes: [
        {
          path: '/system/pageDecoration/customPage',
          name: 'customPage',
          component: './System/PageDecoration/CustomPage',
          auths: 'SYSTEM_PAGEDECORATION_CUSTOMPAGE',
        },
        {
          path: '/system/pageDecoration/customPage/pageConfig',
          name: 'customPage.pageConfig',
          component: './System/PageDecoration/CustomPage/PageConfig',
        },
        {
          path: '/system/pageDecoration/yphPage',
          name: 'yphPage',
          component: './System/PageDecoration/YPHPage',
        },
        {
          path: '/system/pageDecoration/indexEdit',
          name: 'indexEdit',
          component: './System/PageDecoration/IndexEdit',
        },
      ],
    },
    {
      path: '/system/searchPage',
      name: 'searchPage',
      component: './System/SearchPage',
      auths: 'SYSTEM_SEARCH_PAGE'
    },
    {
      path: '/system/auditReminder',
      name: 'auditReminder',
      component: './System/AuditReminder',
      auths: 'SYSTEM_AUDIT_REMINDER',
    },
    {
      path: '/system/tutor',
      name: 'tutor',
      component: './System/Tutor',
      auths: 'SYSTEM_TUTOR',
    },

    {
      path: '/system/bond',
      name: 'bond',
      component: './System/Bond',
      auths: 'SYSTEM_BOND',
    },

    {
      path: '/system/personalCenter',
      name: 'personalCenter',
      component: './System/PersonalCenter',
      auths: 'SYSTEM_PERSONALCENTER',
    },
    {
      path: '/system/personalCenter/accountLogout',
      name: 'personalCenter.accountLogout',
      component: './System/PersonalCenter/AaccountLogout',
    },
    {
      path: '/system/operationLog',
      name: 'operationLog',
      component: './System/operationLog',
      auths: 'OPERATIONLOG'
    },
  ],
};
