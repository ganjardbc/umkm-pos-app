import {
  PREFIX_ROUTE_PATH,
  PREFIX_ROUTE_NAME
} from '@/modules/settings/services/constants';

export default [
  {
    path: PREFIX_ROUTE_PATH,
    name: PREFIX_ROUTE_NAME,
    component: () => import('@/modules/settings/pages/index.vue'),
    meta: {
      title: 'Settings',
      layout: 'default',
      breadcrumbs: [
        {
          label: 'Home',
          route: PREFIX_ROUTE_PATH
        },
      ]
    }
  },
];
