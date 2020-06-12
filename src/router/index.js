import React from 'react'
import { Redirect } from 'react-router'
import App from '@/App'
import Layout from '@/views/Layout/index'
import NotFound from '@/views/Layout/404'
const _import = require('@/utils/import_' + process.env.NODE_ENV).default
const constRouters = [
  {
    component: App,
    children: [
      {
        path: '/404',
        exact: true,
        component: NotFound
      },
      {
        path: '/login',
        exact: true,
        component: _import('Login/index')
      },
      {
        path: '/',
        exact: true,
        component: Layout,
        children: [{
          path: '',
          component: _import('Home/index')
        }]
      },
      {
        path: '/account',
        component: Layout,
        children: [{
          path: '/account/role',
          exact: true,
          component: _import('Account/role')
        }, {
          path: '/account/member/:id?',
          exact: true, // 路由完全匹配
          component: _import('Account/member')
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