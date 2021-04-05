export default {
  'POST /admin/list': {
    status: 1,
    data: {
      page: 0,
      size: 10,
      totalItem: 22,
      totalPage: 3,
      data: [
        {
          id: 44,
          tenantId: 1,
          username: 'xrj001',
          mobile: '13700000000',
          realName: 'aaaa',
          parentAccount: 'NO_PARENT',
          status: 'NORMAL',
          tag: 'NORMAL',
          roleList: [
            {
              id: 1,
              tenantId: 1,
              name: '管理员',
              desc: '默认管理员',
              useCount: 13,
              tag: 'DEFAULT',
              createTime: 1592538937000,
              updateTime: 1597297721000,
              permissionList: [],
            },
          ],
          permissionList: [],
          archive: 'N',
          createAccount: 'lqs',
          createTime: 1596102138000,
          updateTime: 1596102138000,
        },
      ],
      empty: false,
    },
  },
  'POST /role/list': {
    status: 1,
    data: {
      page: 0,
      size: 10,
      totalItem: 11,
      totalPage: 2,
      data: [
        {
          id: 1,
          tenantId: 1,
          name: '管理员',
          desc: '默认管理员',
          useCount: 13,
          tag: 'DEFAULT',
          createTime: 1592538937000,
          updateTime: 1597297721000,
          permissionList: [],
        },
        {
          id: 2,
          tenantId: 1,
          name: '主管',
          desc: '默认',
          useCount: 3,
          tag: 'DEFAULT',
          createTime: 1593316438000,
          updateTime: 1593657067000,
          permissionList: [],
        },
        {
          id: 3,
          tenantId: 1,
          name: '业务员',
          desc: '默认',
          useCount: 4,
          tag: 'DEFAULT',
          createTime: 1593316438000,
          updateTime: 1597297688000,
          permissionList: [],
        },
        {
          id: 7,
          tenantId: 1,
          name: '1',
          desc: '111',
          useCount: 0,
          createTime: 1593498296000,
          updateTime: 1593498302000,
          permissionList: [],
        },
        {
          id: 8,
          tenantId: 1,
          name: '测试数据权限',
          desc: '测试数据权限',
          useCount: 3,
          createTime: 1593508661000,
          updateTime: 1593592996000,
          permissionList: [],
        },
        {
          id: 9,
          tenantId: 1,
          name: '测试',
          desc: '测试',
          useCount: 0,
          tag: 'NORMAL',
          createTime: 1593573787000,
          updateTime: 1595920171000,
          permissionList: [],
        },
        {
          id: 10,
          tenantId: 1,
          name: '蓝胖子测试权限',
          useCount: 2,
          tag: 'NORMAL',
          createTime: 1593593095000,
          updateTime: 1593657067000,
          permissionList: [],
        },
        {
          id: 11,
          tenantId: 1,
          name: '测试123222222',
          desc: '测试赛',
          useCount: 1,
          tag: 'NORMAL',
          createTime: 1593593665000,
          updateTime: 1595920171000,
          permissionList: [],
        },
        {
          id: 12,
          tenantId: 1,
          name: '角色管理221',
          useCount: 0,
          tag: 'NORMAL',
          createTime: 1594709603000,
          updateTime: 1595920135000,
          permissionList: [],
        },
        {
          id: 13,
          tenantId: 1,
          name: 'wjw',
          desc:
            '都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是都是',
          useCount: 0,
          tag: 'NORMAL',
          createTime: 1595922062000,
          updateTime: 1596693766000,
          permissionList: [],
        },
      ],
      empty: false,
    },
  },
  'GET /role/listAllPermission': {
    status: 1,
    data: [
      {
        id: 190,
        tenantId: 1,
        parentId: 0,
        name: '概况',
        url: '/home',
        icon: 'home',
        sortNo: 0,
        code: 'HOME',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1593308779000,
        subPermissionList: [],
      },
      {
        id: 191,
        tenantId: 1,
        parentId: 0,
        name: '商城管理',
        url: '/shop',
        icon: 'shop',
        sortNo: 1,
        code: 'COMMODITY',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1593308779000,
        subPermissionList: [
          {
            id: 192,
            tenantId: 1,
            parentId: 191,
            name: '商品管理',
            url: '/shop/product',
            sortNo: 0,
            code: 'COMMODITY_LIST',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308779000,
            subPermissionList: [
              {
                id: 193,
                tenantId: 1,
                parentId: 192,
                name: '查看',
                sortNo: 1,
                code: 'COMMODITY_LIST_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308768000,
                subPermissionList: [],
              },
              {
                id: 194,
                tenantId: 1,
                parentId: 192,
                name: '新增',
                sortNo: 2,
                code: 'COMMODITY_LIST_ADD',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308779000,
                subPermissionList: [],
              },
              {
                id: 195,
                tenantId: 1,
                parentId: 192,
                name: '编辑',
                sortNo: 3,
                code: 'COMMODITY_LIST_EDIT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308779000,
                subPermissionList: [],
              },
              {
                id: 196,
                tenantId: 1,
                parentId: 192,
                name: '上架',
                sortNo: 4,
                code: 'COMMODITY_LIST_UP',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 197,
                tenantId: 1,
                parentId: 192,
                name: '下架',
                sortNo: 5,
                code: 'COMMODITY_LIST_DOWN',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 198,
                tenantId: 1,
                parentId: 192,
                name: '删除',
                sortNo: 6,
                code: 'COMMODITY_LIST_DELETE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 199,
            tenantId: 1,
            parentId: 191,
            name: '商品类目',
            url: '/shop/category',
            sortNo: 1,
            code: 'COMMODITY_CATEGORY',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308780000,
            subPermissionList: [
              {
                id: 200,
                tenantId: 1,
                parentId: 199,
                name: '查看',
                sortNo: 0,
                code: 'COMMODITY_CATEGORY_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308768000,
                subPermissionList: [],
              },
              {
                id: 201,
                tenantId: 1,
                parentId: 199,
                name: '新增',
                sortNo: 1,
                code: 'COMMODITY_CATEGORY_ADD',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 202,
                tenantId: 1,
                parentId: 199,
                name: '编辑',
                sortNo: 2,
                code: 'COMMODITY_CATEGORY_EDIT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 203,
                tenantId: 1,
                parentId: 199,
                name: '删除',
                sortNo: 3,
                code: 'COMMODITY_CATEGORY_DELETE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 204,
                tenantId: 1,
                parentId: 199,
                name: '商品类目-修改首页分类',
                sortNo: 4,
                code: 'COMMODITY_CATEGORY_HOME_EDIT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308783000,
                subPermissionList: [],
              },
            ],
          },
        ],
      },
      {
        id: 205,
        tenantId: 1,
        parentId: 0,
        name: '订单管理',
        url: '/orderManagement',
        icon: 'file-search',
        sortNo: 2,
        code: 'ORDER_MANAGEMENT',
        type: 'MENU',
        createTime: 1595406639000,
        updateTime: 1595406639000,
        subPermissionList: [
          {
            id: 206,
            tenantId: 1,
            parentId: 205,
            name: '订单查询',
            url: '/orderManagement/orderList',
            sortNo: 1,
            code: 'ORDER_MANAGEMENT_ORDER_LIST',
            type: 'MENU',
            createTime: 1595406639000,
            updateTime: 1595407735000,
            subPermissionList: [],
          },
        ],
      },
      {
        id: 207,
        tenantId: 1,
        parentId: 0,
        name: '入仓商品',
        url: '/warehouse',
        icon: 'import',
        sortNo: 3,
        code: 'WAREHOUSE',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407535000,
        subPermissionList: [
          {
            id: 208,
            tenantId: 1,
            parentId: 207,
            name: '入仓需求',
            url: '/warehouse/storage',
            sortNo: 1,
            code: 'WAREHOUSE_REQUEST',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308780000,
            subPermissionList: [
              {
                id: 209,
                tenantId: 1,
                parentId: 208,
                name: '查看',
                sortNo: 0,
                code: 'WAREHOUSE_REQUEST_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308768000,
                subPermissionList: [],
              },
              {
                id: 210,
                tenantId: 1,
                parentId: 208,
                name: '确认需求',
                sortNo: 1,
                code: 'WAREHOUSE_REQUEST_CONFIRM',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
              {
                id: 211,
                tenantId: 1,
                parentId: 208,
                name: '拒绝需求',
                sortNo: 2,
                code: 'WAREHOUSE_CATEGORY_REJECT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308780000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 212,
            tenantId: 1,
            parentId: 207,
            name: '入仓管理',
            url: '/warehouse/warehouse',
            sortNo: 2,
            code: 'WAREHOUSE_MANAGE',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308780000,
            subPermissionList: [
              {
                id: 213,
                tenantId: 1,
                parentId: 212,
                name: '添加入仓库商品',
                sortNo: 0,
                code: 'WAREHOUSE_MANAGE_ADD_COMMODITY',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 214,
                tenantId: 1,
                parentId: 212,
                name: '入仓记录-页面查看',
                sortNo: 1,
                code: 'WAREHOUSE_RECORD_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 215,
                tenantId: 1,
                parentId: 212,
                name: '入仓记录-查看详情',
                sortNo: 2,
                code: 'WAREHOUSE_RECORD__DETAIL',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 216,
                tenantId: 1,
                parentId: 212,
                name: '入仓记录-设置场租费',
                sortNo: 3,
                code: 'WAREHOUSE_RECORD_SET_FEE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 217,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-页面查看',
                sortNo: 4,
                code: 'WAREHOUSE_COMMODITY_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 218,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-编辑',
                sortNo: 5,
                code: 'WAREHOUSE_COMMODITY_EDIT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 219,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-设置操作费',
                sortNo: 6,
                code: 'WAREHOUSE_COMMODITY_SET_FEE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 220,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-删除',
                sortNo: 7,
                code: 'WAREHOUSE_COMMODITY_DELETE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 221,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-下架',
                sortNo: 8,
                code: 'WAREHOUSE_COMMODITY_DOWN',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 222,
                tenantId: 1,
                parentId: 212,
                name: '商品列表-重新上架',
                sortNo: 9,
                code: 'WAREHOUSE_COMMODITY_UP',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
            ],
          },
        ],
      },
      {
        id: 223,
        tenantId: 1,
        parentId: 0,
        name: '财务管理',
        url: '/capital',
        icon: 'pay-circle',
        sortNo: 4,
        code: 'FUNDS',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407536000,
        subPermissionList: [
          {
            id: 224,
            tenantId: 1,
            parentId: 223,
            name: '代理商提现',
            url: '/capital/apply',
            sortNo: 0,
            code: 'FUNDS_AGENT_WITHDRAW',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308781000,
            subPermissionList: [
              {
                id: 225,
                tenantId: 1,
                parentId: 224,
                name: '提现申请-查看',
                sortNo: 0,
                code: 'FUNDS_AGENT_WITHDRAW_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 226,
                tenantId: 1,
                parentId: 224,
                name: '提现申请-确认打款',
                sortNo: 1,
                code: 'FUNDS_AGENT_WITHDRAW_CONFIRM',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308781000,
                subPermissionList: [],
              },
              {
                id: 227,
                tenantId: 1,
                parentId: 224,
                name: '提现申请-导出',
                sortNo: 2,
                code: 'FUNDS_AGENT_WITHDRAW_EXPORT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308782000,
                subPermissionList: [],
              },
              {
                id: 228,
                tenantId: 1,
                parentId: 224,
                name: '打款记录-查看',
                sortNo: 3,
                code: 'FUNDS_AGENT_WITHDRAW_RECORD_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308782000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 229,
            tenantId: 1,
            parentId: 223,
            name: '分站提现',
            url: '/capital/siteApply',
            sortNo: 1,
            code: 'CAPITAL_SITEAPPLY',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356826000,
            subPermissionList: [
              {
                id: 230,
                tenantId: 1,
                parentId: 229,
                name: '分站提现-确认打款',
                sortNo: 1,
                code: 'CAPITAL_SITEAPPLY_CONFIRM',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356909000,
                subPermissionList: [],
              },
            ],
          },
        ],
      },
      {
        id: 231,
        tenantId: 1,
        parentId: 0,
        name: '分站管理',
        url: '/substation',
        icon: 'apartment',
        sortNo: 5,
        code: 'SUBSTATION',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407538000,
        subPermissionList: [
          {
            id: 232,
            tenantId: 1,
            parentId: 231,
            name: '分站新增',
            url: '/substation/add',
            sortNo: 0,
            code: 'SUBSTATION_ADD',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308782000,
            subPermissionList: [],
          },
          {
            id: 233,
            tenantId: 1,
            parentId: 231,
            name: '分站列表',
            url: '/substation/list',
            sortNo: 1,
            code: 'SUBSTATION_LIST',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308782000,
            subPermissionList: [
              {
                id: 234,
                tenantId: 1,
                parentId: 233,
                name: '查看',
                sortNo: 0,
                code: 'SUBSTATION_SHOW',
                type: 'BTN',
                createTime: 1593504189000,
                updateTime: 1593504339000,
                subPermissionList: [],
              },
              {
                id: 235,
                tenantId: 1,
                parentId: 233,
                name: '设置成本价',
                sortNo: 0,
                code: 'SUBSTATION_SET_PRICE',
                type: 'BTN',
                createTime: 1594377270000,
                updateTime: 1594377557000,
                subPermissionList: [],
              },
              {
                id: 236,
                tenantId: 1,
                parentId: 233,
                name: '查看详情',
                sortNo: 0,
                code: 'SUBSTATION_LIST_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308769000,
                subPermissionList: [],
              },
              {
                id: 237,
                tenantId: 1,
                parentId: 233,
                name: '分配账号',
                sortNo: 0,
                code: 'SUBSTATION_ASSGIN_ACCOUNT',
                type: 'BTN',
                createTime: 1593504172000,
                updateTime: 1593504339000,
                subPermissionList: [],
              },
              {
                id: 238,
                tenantId: 1,
                parentId: 233,
                name: '编辑',
                sortNo: 1,
                code: 'SUBSTATION_LIST_EDIT',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308782000,
                subPermissionList: [],
              },
              {
                id: 239,
                tenantId: 1,
                parentId: 233,
                name: '进入bos后台',
                sortNo: 2,
                code: 'SUBSTATION_LIST_LINK_BOS',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308782000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 440,
            tenantId: 1,
            parentId: 231,
            name: 'SEO设置',
            url: '/substation/seoSetting',
            sortNo: 2,
            code: 'SUBSTATION_SEO_SETTING',
            type: 'MENU',
            createTime: 1596685442000,
            updateTime: 1596685659000,
            subPermissionList: [],
          },
        ],
      },
      {
        id: 240,
        tenantId: 1,
        parentId: 0,
        name: '数据统计',
        url: '/statistics',
        icon: 'line-chart',
        sortNo: 6,
        code: 'STATISTICS',
        type: 'MENU',
        createTime: 1594356826000,
        updateTime: 1595407545000,
        subPermissionList: [
          {
            id: 241,
            tenantId: 1,
            parentId: 240,
            name: '营收统计',
            url: '/statistics/revenue',
            sortNo: 0,
            code: 'STATISTICS_REVENUE',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356910000,
            subPermissionList: [
              {
                id: 242,
                tenantId: 1,
                parentId: 241,
                name: '营收统计-详情',
                sortNo: 0,
                code: 'STATISTICS_REVENUE_DETAIL',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356910000,
                subPermissionList: [],
              },
              {
                id: 243,
                tenantId: 1,
                parentId: 241,
                name: '营收统计-导出',
                sortNo: 1,
                code: 'STATISTICS_REVENUE_EXPORT',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356909000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 244,
            tenantId: 1,
            parentId: 240,
            name: '站点统计',
            url: '/statistics/siteStatistics',
            sortNo: 1,
            code: 'STATISTICS_SITESTATISTICS',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356910000,
            subPermissionList: [
              {
                id: 245,
                tenantId: 1,
                parentId: 244,
                name: '站点统计-下载数据',
                sortNo: 1,
                code: 'STATISTICS_SITESTATISTICS_EXPORT',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356910000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 246,
            tenantId: 1,
            parentId: 240,
            name: '商品统计',
            url: '/statistics/goodStatistics',
            sortNo: 2,
            code: 'STATISTICS_GOODSTATISTICS',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356909000,
            subPermissionList: [
              {
                id: 247,
                tenantId: 1,
                parentId: 246,
                name: '商品统计-下载数据',
                sortNo: 1,
                code: 'STATISTICS_GOODSTATISTICS_EXPORT',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356909000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 248,
            tenantId: 1,
            parentId: 240,
            name: '交易账单',
            url: '/statistics/tradeBill',
            sortNo: 3,
            code: 'STATISTICS_TRADEBILL',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356910000,
            subPermissionList: [
              {
                id: 249,
                tenantId: 1,
                parentId: 248,
                name: '交易账单-下载数据',
                sortNo: 1,
                code: 'STATISTICS_TRADEBILL_EXPORT',
                type: 'BTN',
                createTime: 1594356826000,
                updateTime: 1594356909000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 250,
            tenantId: 1,
            parentId: 240,
            name: '客户分析',
            url: '/statistics/customerAnalysis',
            sortNo: 4,
            code: 'STATISTICS_CUSTOMERANALYSIS',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356909000,
            subPermissionList: [],
          },
          {
            id: 251,
            tenantId: 1,
            parentId: 240,
            name: '代理分析',
            url: '/statistics/agentAnalysis',
            sortNo: 5,
            code: 'STATISTICS_AGENTANALYSIS',
            type: 'MENU',
            createTime: 1594356826000,
            updateTime: 1594356909000,
            subPermissionList: [],
          },
        ],
      },
      {
        id: 252,
        tenantId: 1,
        parentId: 0,
        name: '反馈管理',
        url: '/feedback',
        icon: 'mail',
        sortNo: 7,
        code: 'FEEDBACK',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407539000,
        subPermissionList: [
          {
            id: 253,
            tenantId: 1,
            parentId: 252,
            name: '底单查询',
            url: '/feedback/orderNos',
            sortNo: 0,
            code: 'FEEDBACK_SEARCH',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308782000,
            subPermissionList: [],
          },
          {
            id: 254,
            tenantId: 1,
            parentId: 252,
            name: '采购建议',
            url: '/feedback/suggest',
            sortNo: 1,
            code: 'FEEDBACK_SUGGESTION',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308782000,
            subPermissionList: [],
          },
          {
            id: 255,
            tenantId: 1,
            parentId: 252,
            name: '工单管理',
            url: '/feedback/number',
            sortNo: 2,
            code: 'FEEDBACK_ORDER_MANAGE',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308782000,
            subPermissionList: [],
          },
        ],
      },
      {
        id: 256,
        tenantId: 1,
        parentId: 0,
        name: '系统管理',
        url: '/system',
        icon: 'desktop',
        sortNo: 8,
        code: 'SYSTEM',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407541000,
        subPermissionList: [
          {
            id: 257,
            tenantId: 1,
            parentId: 256,
            name: '账号列表',
            url: '/system/account',
            sortNo: 0,
            code: 'SYSTEM_ADMIN',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593567614000,
            subPermissionList: [
              {
                id: 258,
                tenantId: 1,
                parentId: 257,
                name: '查看',
                sortNo: 0,
                code: 'SYSTEM_ADMIN_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593567646000,
                subPermissionList: [],
              },
              {
                id: 259,
                tenantId: 1,
                parentId: 257,
                name: '新增',
                sortNo: 1,
                code: 'SYSTEM_ADMIN_ADD',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593567620000,
                subPermissionList: [],
              },
              {
                id: 260,
                tenantId: 1,
                parentId: 257,
                name: '编辑',
                sortNo: 2,
                code: 'SYSTEM_ADMIN_UPDATE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593567634000,
                subPermissionList: [],
              },
              {
                id: 261,
                tenantId: 1,
                parentId: 257,
                name: '禁用/启用',
                sortNo: 3,
                code: 'SYSTEM_ADMIN_UPDATE_STATUS',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593567626000,
                subPermissionList: [],
              },
              {
                id: 262,
                tenantId: 1,
                parentId: 257,
                name: '删除',
                sortNo: 4,
                code: 'SYSTEM_ADMIN_DELETE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593567636000,
                subPermissionList: [],
              },
            ],
          },
          {
            id: 263,
            tenantId: 1,
            parentId: 256,
            name: '角色管理',
            url: '/system/roles',
            sortNo: 1,
            code: 'SYSTEM_ROLE',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308783000,
            subPermissionList: [
              {
                id: 264,
                tenantId: 1,
                parentId: 263,
                name: '查看',
                sortNo: 0,
                code: 'SYSTEM_ROLE_SHOW',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308770000,
                subPermissionList: [],
              },
              {
                id: 265,
                tenantId: 1,
                parentId: 263,
                name: '新增',
                sortNo: 1,
                code: 'SYSTEM_ROLE_ADD',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308783000,
                subPermissionList: [],
              },
              {
                id: 266,
                tenantId: 1,
                parentId: 263,
                name: '编辑',
                sortNo: 2,
                code: 'SYSTEM_ROLE_UPDATE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593593741000,
                subPermissionList: [],
              },
              {
                id: 267,
                tenantId: 1,
                parentId: 263,
                name: '删除',
                sortNo: 3,
                code: 'SYSTEM_ROLE_DELETE',
                type: 'BTN',
                createTime: 1591605039000,
                updateTime: 1593308783000,
                subPermissionList: [],
              },
            ],
          },
        ],
      },
      {
        id: 268,
        tenantId: 1,
        parentId: 0,
        name: '平台公告',
        url: '/notice',
        icon: 'book',
        sortNo: 9,
        code: 'NOTIFY',
        type: 'MENU',
        createTime: 1591605039000,
        updateTime: 1595407543000,
        subPermissionList: [
          {
            id: 269,
            tenantId: 1,
            parentId: 268,
            name: '产品动态-删除',
            sortNo: 0,
            code: 'NOTIFY_DELETE',
            type: 'BTN',
            createTime: 1592546091000,
            updateTime: 1593308784000,
            subPermissionList: [],
          },
          {
            id: 270,
            tenantId: 1,
            parentId: 268,
            name: '平台公告-发布',
            sortNo: 0,
            code: 'NOTIFY_ADD',
            type: 'MENU',
            createTime: 1591605039000,
            updateTime: 1593308783000,
            subPermissionList: [],
          },
          {
            id: 271,
            tenantId: 1,
            parentId: 268,
            name: '产品动态-修改',
            sortNo: 0,
            code: 'NOTIFY_EDIT',
            type: 'BTN',
            createTime: 1592546071000,
            updateTime: 1593308783000,
            subPermissionList: [],
          },
        ],
      },
    ],
  },
  'POST /role/get': {
    status: 1,
    data: {
      id: 12,
      tenantId: 1,
      name: '角色管理221',
      useCount: 0,
      tag: 'NORMAL',
      createTime: 1594709603000,
      updateTime: 1595920135000,
      permissionList: [],
    },
  },
};
