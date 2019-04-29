import { UserLayout, BasicLayout, RouteView, PageView } from '@/components/layouts'

export const newasyncRoterMap=(params)=>{
  console.log(`----------------------`)
  console.log(params)
let res= [ {
 path: '/',
 name: 'index',
 component: BasicLayout,
 meta: { title: '首页' },
 redirect: '/dashboard/analysis',
 children: [
   {
     path: '/dashboard',
     name: 'dashboard',
     redirect: '/dashboard/analysis',
     component: RouteView,
     meta: { title: '首页', icon: 'dashboard' },
     children: [
       {
         path: '/dashboard/analysis',
         name: 'Analysis',
         component: () => import('@/views/dashboard/Analysis'),
         meta: { title: '工作台' }
       }       
     ]   
   },
   {
    path: '/list/QW',
    name: 'QW',   
    redirect: {name:'Phonelist_QW'},
    component: PageView,
    meta: { title: '区委', icon: 'dashboard', permission: [ 'QW','edit' ] },
    children: [
      {
        path: '/list/UserPhonelist/QW',          
        name: 'Phonelist_QW',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QW' ] }
      }
    ]
  },
  {
    path: '/list/QRD',
    name: 'QRD',
    redirect: {name:'Phonelist_QRD'},
    component: PageView,
    meta: { title: '区人大常委会', icon: 'dashboard', permission: [ 'QRD' ] },
    children: [
      {
        path: '/list/UserPhonelist/QRD',
        name: 'Phonelist_QRD',
        component: () => import('@/views/list/UserPhonelist'),
        meta: { title: '通信录', permission: [ 'QRD' ] }
      }
    ]
  },
  {
    path: '/DepartmentManager',
    name: 'DepartmentManager',
    redirect: '/Department/manager',
    component: PageView,
    meta: { title: '管理', icon: 'dashboard', permission: [ 'Admin' ] },
    children: [
      {
        path: '/Department/manager',
        name: 'Department',
        component: () => import('@/views/list/Department'),
        meta: { title: '部门管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/old-permission',
        name: 'old-permission',
        component: () => import('@/views/list/oldPermissionList'),
        meta: { title: '原版权限管理', permission: [ 'Admin' ] }
      },
     
      {
        path: '/list/user-list',
        name: 'UserList',
        component: () => import('@/views/list/UserList'),
        meta: { title: '用户管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/role-list',
        name: 'RoleList',
        component: () => import('@/views/list/RoleList'),
        meta: { title: '角色管理', permission: [ 'Admin' ] }
      },
      {
        path: '/list/permission-list',
        name: 'PermissionList',
        component: () => import('@/views/list/PermissionList'),
        meta: { title: '部门类别管理', permission: [ 'Admin' ] }
      },
    ]
  },  
  ]
 }]
    return res
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '首页', icon: 'dashboard' },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '工作台' }
          }       
        ]
      },
    {
      path: '/list/QW',
      name: 'QW',   
      redirect: {name:'Phonelist_QW'},
      component: PageView,
      meta: { title: '区委', icon: 'dashboard', permission: [ 'QW' ] },
      children: [
        {
          path: '/list/UserPhonelist/QW',          
          name: 'Phonelist_QW',
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '通信录', permission: [ 'QW' ] }
        }
      ]
    },
    {
      path: '/list/QSHFZBZXT',
      name: 'QSHFZBZXT',   
      redirect: {name:'Phonelist_QSHFZBZXT'},
      component: PageView,
      meta: { title: '区社会发展与保障系统', icon: 'dashboard', permission: [ 'QSHFZBZXT' ] },
      children: [
        {
          path: '/list/UserPhonelist/QTJJ',          
          name: 'Phonelist_QTJJ',        
          component: () => import('@/views/list/UserPhonelist'),
          meta: { title: '区统计局',},       
          children: [
            {
              path: '/list/UserPhonelist/QW',          
              name: 'Phonelist_QTJJ',
              component: () => import('@/views/list/UserPhonelist'),
              meta: { title: '通信录', permission: [ 'QW' ] }
            },      
            {
              path: '/list/UserPhonelist/QW',          
              name: 'Phonelist_QTJJ',
              component: () => import('@/views/list/UserPhonelist'),
              meta: { title: '自定义通讯录', permission: [ 'QW' ] }
            },       
          ]
        }
      ]
    },
      {
        path: '/list/QRD',
        name: 'QRD',
        redirect: {name:'Phonelist_QRD'},
        component: PageView,
        meta: { title: '区人大常委会', icon: 'dashboard', permission: [ 'QRD' ] },
        children: [
          {
            path: '/list/UserPhonelist/QRD',
            name: 'Phonelist_QRD',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '通信录', permission: [ 'QRD' ] }
          }
        ]
      },   
      {
        path: '/list/QXZ_XT',
        name: 'QXZ_XT',
        redirect: {name:'Phonelist_QLSZ'},
        component: PageView,
        meta: { title: '区乡镇系统', icon: 'dashboard', permission: [ 'QXZ_XT' ] },
        children: [
          {
            path: '/list/UserPhonelist/LSZ',
            name: 'Phonelist_QLSZ',
            component: () => import('@/views/list/UserPhonelist'),
            meta: { title: '罗市镇' }
          }
        ]
      }, 
      {
        path: '/DepartmentManager',
        name: 'DepartmentManager',
        redirect: '/Department/manager',
        component: PageView,
        meta: { title: '管理', icon: 'dashboard', permission: [ 'Admin' ] },
        children: [
          {
            path: '/Department/manager',
            name: 'Department',
            component: () => import('@/views/list/Department'),
            meta: { title: '部门管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/user-list',
            name: 'UserList',
            component: () => import('@/views/list/UserList'),
            meta: { title: '用户管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/list/RoleList'),
            meta: { title: '角色管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/list/PermissionList'),
            meta: { title: '部门类别管理', permission: [ 'Admin' ] }
          },
        ]
      },  
      {
  path: '/myform',
  redirect: '/myform/basic-form',
  component: PageView,
  meta: { title: '自定义组', icon: 'form'  },//区人大permission
  children: [
    {
      path: '/myform/base-form',
      name: 'BaseForm',
      component: () => import('@/views/form/BasicForm'),
      meta: { title: '管理组' }
    },
    {
      path: '/myform/step-form',
      name: 'StepForm',
      component: () => import('@/views/form/stepForm/StepForm'),
      meta: { title: '分步表单' }
    },
    {
      path: '/myform/advanced-form',
      name: 'AdvanceForm',
      component: () => import('@/views/form/advancedForm/AdvancedForm'),
      meta: { title: '高级表单' }
      }
    ]
},
    
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/query-list',
        meta: { title: 'guanli2', icon: 'table', permission: [ 'Admin' ] },
        children: [
          {
            path: '/list/query-list',
            name: 'QueryList',
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', permission: [ 'Admin' ] }
          },
          {
            path: '/list/edit-table',
            name: 'EditList',
            component: () => import('@/views/list/TableInnerEditList'),
            meta: { title: '内联编辑表格', permission: [ 'Admin' ] }
          },
          {
            path: '/list/user-list',
            name: 'UserList',
            component: () => import('@/views/list/UserList'),
            meta: { title: '用户管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            component: () => import('@/views/list/RoleList'),
            meta: { title: '角色管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/list/PermissionList'),
            meta: { title: '权限管理', permission: [ 'Admin' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', permission: [ 'Admin' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', permission: [ 'Admin' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              },
            ]
          },
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, keepAlive: true, permission: [ 'user' ]  },
            redirect: '/account/settings/base',
            alwaysShow: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ]  }
              },
            ]
          },
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
