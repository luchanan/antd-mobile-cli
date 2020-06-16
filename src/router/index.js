import React from 'react'
import { Redirect } from 'react-router'
import App from '@/App'
import Layout from '@/views/Layout/index'
import NotFound from '@/views/Layout/404'
import {renderAsyncComponent} from '@/components/AsyncComponent'
import Control from '@/router/control'
// const _import = require('@/utils/import_' + process.env.NODE_ENV).default
const constRouters = [
  {
    component: App,
    children: [
      {
        path: '/403',
        exact: true,
        component: (props) => renderAsyncComponent(props, 'Layout/403')
      },
      {
        path: '/404',
        exact: true,
        component: NotFound
      },
      {
        path: '/login',
        exact: true,
        component: 'Login/index',
        render: (props) => <Control {...props}/>
      },
      {
        path: '/',
        exact: true,
        component: Layout,
        children: [{
          path: '',
          component: 'Home/index',
          render: (props) => <Control {...props}/>
        }]
      },
      {
        path: '/account',
        component: Layout,
        children: [{
          path: '/account/role',
          exact: true,
          component: 'Account/role',
          render: (props) => <Control {...props}/>
        }, {
          path: '/account/member/:id?',
          exact: true, // 路由完全匹配
          component: 'Account/member',
          render: (props) => <Control {...props}/>
        }, {
          path: '*',
          component: () => <Redirect to='/404'/>
        }]
      },
      {
        path: '*',
        component: () => <Redirect to='/404'/>
      }
    ]
  }
]
export default constRouters