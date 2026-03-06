import {
  PREFIX_ROUTE_PATH,
  PREFIX_ROUTE_NAME,
} from '@/modules/product/services/constants.ts';

import {
  PERMISSIONS,
} from '@/modules/product/services/rbac.ts';

export default [
  {
    path: PREFIX_ROUTE_PATH,
    name: PREFIX_ROUTE_NAME,
    component: () => import('@/modules/product/pages/index.vue'),
    meta: {
      title: 'Product',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Product',
          route: PREFIX_ROUTE_PATH,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/create`,
    name: `${PREFIX_ROUTE_NAME}-create`,
    component: () => import('@/modules/product/pages/create.vue'),
    meta: {
      title: 'Product',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Product',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Add',
          route: `${PREFIX_ROUTE_PATH}/create`,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/edit/:id`,
    name: `${PREFIX_ROUTE_NAME}-edit`,
    component: () => import('@/modules/product/pages/edit.vue'),
    meta: {
      title: 'Product',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Product',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Edit',
          route: `${PREFIX_ROUTE_PATH}/edit`,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/detail/:id`,
    name: `${PREFIX_ROUTE_NAME}-detail`,
    component: () => import('@/modules/product/pages/detail.vue'),
    meta: {
      title: 'Product',
      layout: 'default',
      permission: PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Product',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Detail',
          route: `${PREFIX_ROUTE_PATH}/detail`,
          isActive: true,
        },
      ]
    }
  },
];
