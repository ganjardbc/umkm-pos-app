import {
  PREFIX_ROUTE_PATH,
  PREFIX_ROUTE_NAME
} from '@/modules/dashboard/services/constants';
import {
  DASHBOARD_PERMISSIONS,
} from '@/services/permissions.ts';

export default [
  {
    path: PREFIX_ROUTE_PATH,
    name: `${PREFIX_ROUTE_NAME}`,
    component: () => import('@/modules/dashboard/pages/index.vue'),
    meta: {
      title: 'Dashboard',
      layout: 'default',
      permission: DASHBOARD_PERMISSIONS,
      breadcrumbs: [
        {
          label: 'Home',
          route: '/',
        },
        {
          label: 'Dashboard',
          route: PREFIX_ROUTE_PATH,
          isActive: true,
        },
      ]
    }
  }
];
