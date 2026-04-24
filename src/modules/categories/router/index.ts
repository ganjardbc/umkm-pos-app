import {
  PREFIX_ROUTE_PATH,
  PREFIX_ROUTE_NAME,
} from '@/modules/categories/services/constants.ts';

import {
  READ,
  CREATE,
  UPDATE,
} from '@/modules/categories/services/rbac.ts';

export default [
  {
    path: PREFIX_ROUTE_PATH,
    name: PREFIX_ROUTE_NAME,
    component: () => import('@/modules/categories/pages/index.vue'),
    meta: {
      title: 'Categories',
      layout: 'default',
      permission: [READ],
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Categories',
          route: PREFIX_ROUTE_PATH,
          isActive: true,
        },
      ]
    }
  },
  {
    path: `${PREFIX_ROUTE_PATH}/create`,
    name: `${PREFIX_ROUTE_NAME}-create`,
    component: () => import('@/modules/categories/pages/create.vue'),
    meta: {
      title: 'Categories',
      layout: 'default',
      permission: [CREATE],
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Categories',
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
    component: () => import('@/modules/categories/pages/edit.vue'),
    meta: {
      title: 'Categories',
      layout: 'default',
      permission: [UPDATE],
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Categories',
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
    component: () => import('@/modules/categories/pages/detail.vue'),
    meta: {
      title: 'Categories',
      layout: 'default',
      permission: [CREATE],
      breadcrumbs: [
        {
          label: 'Home',
          route: '/landing',
          isActive: false,
        },
        {
          label: 'Categories',
          route: PREFIX_ROUTE_PATH,
          isActive: false,
        },
        {
          label: 'Detail',
          route: `${PREFIX_ROUTE_PATH}/create`,
          isActive: true,
        },
      ]
    }
  },
];
