export default {
  path: '/other',
  component: '../layouts/OtherLayout',
  routes: [
    { path: '/other', redirect: '/other/enterpriseInfo' },
    { path: '/other/enterpriseInfo', name: 'enterpriseInfo', component: './User/EnterpriseInfo' },
    { path: '/other/expertInfo', name: 'expertInfo', component: './User/ExpertInfo' },
    { path: '/other/enterpriseResult', name: 'enterpriseResult', component: './User/Result' },
    { path: '/other/expertResult', name: 'expertResult', component: './User/Result' },
    { path: '/other/cms', name: '', component: './Common/CmsPage' },
  ],
};
