import {
  PREFIX_ROUTE_PATH,
  PREFIX_ROUTE_NAME,
} from '@/modules/user/services/constants.ts';

import {
  PERMISSIONS,
} from '@/modules/user/services/rbac.ts';

export default [
  {
    path: PREFIX_ROUTE_PATH,
    name: PREFIX_ROUTE_NAME,
    component: () => import('@/modules/user/pages/index.vue'),
    meta: {
      title: 'User',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'User',
          route: PREFIX_ROUTE_PATH,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/create`,
    name: `${PREFIX_ROUTE_NAME}-create`,
    component: () => import('@/modules/user/pages/create.vue'),
    meta: {
      title: 'Add User',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'User',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Add User',
          route: `${PREFIX_ROUTE_PATH}/create`,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/:id/edit`,
    name: `${PREFIX_ROUTE_NAME}-edit`,
    component: () => import('@/modules/user/pages/edit.vue'),
    meta: {
      title: 'Edit User',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'User',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Edit User',
          route: `${PREFIX_ROUTE_PATH}/:id/edit`,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/:id`,
    name: `${PREFIX_ROUTE_NAME}-detail`,
    component: () => import('@/modules/user/pages/detail.vue'),
    meta: {
      title: 'User Detail',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'User',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'User Detail',
          route: `${PREFIX_ROUTE_PATH}/:id`,
          isActive: true,
        },
      ]
    }
  },
];
