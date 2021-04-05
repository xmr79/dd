export default {
  'POST /activity/list': {
    status: 1,
    data: {
      page: 0,
      size: 10,
      totalItem: 22,
      totalPage: 3,
      data: [
        {
          id: 1,
          status: '3',
          refuseCause: '失败原因',
        },
      ],
      empty: false,
    },
  },
  'POST /activitysort/list': {
    status: 1,
    data: {
      page: 0,
      size: 10,
      totalItem: 22,
      totalPage: 3,
      data: [
        {
          id: 1,
          name: '分类1',
        },
        {
          id: 2,
          name: '分类2',
        },
        {
          id: 3,
          name: '分类3',
        },
        {
          id: 4,
          name: '分类4',
        },
      ],
      empty: false,
    },
  },
};
