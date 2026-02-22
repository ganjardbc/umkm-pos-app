import { DASHBOARD_PERMISSIONS } from '@/services/permissions.ts';
import { PREFIX_ROUTE_PATH as PRP_DASHBOARD } from '@/modules/dashboard/services/constants';

const DEFAULT_PERMISSIONS = DASHBOARD_PERMISSIONS;
const DEFAULT_FEATURE_FLAG = true;

export default [
  {
    icon: 'pi pi-objects-column',
    label: 'Dashboard',
    featureFlag: DEFAULT_FEATURE_FLAG,
    permissions: DASHBOARD_PERMISSIONS,
    route: PRP_DASHBOARD,
  },

  // Reports
  {
    icon: 'pi pi-chart-bar',
    label: 'Reports',
    featureFlag: DEFAULT_FEATURE_FLAG,
    permissions: DEFAULT_PERMISSIONS,
    route: '/reports',
  },
];
