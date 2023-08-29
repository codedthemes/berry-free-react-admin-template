import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Inquiries & History',
    path: '/user/history',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Donor Bank',
    path: '/user/search',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Donor Locations',
    path: '/user/locations',
    icon: (
      <SvgIcon fontSize="small">
        <MapPinIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Settings',
    path: '/user/profile',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Invite',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   ),
  // },
];
