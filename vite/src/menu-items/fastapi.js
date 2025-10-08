import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { IconApi, IconUser, IconHome, IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconApi, IconUser, IconHome, IconDashboard };

const fastapi = {
  id: 'fastapi',
  title: 'FastAPI',
  type: 'group',
  children: [
    {
      id: 'fastapi-demo',
      title: 'FastAPI Demo',
      type: 'item',
      url: '/fastapi-demo',
      icon: IconApi,
      breadcrumbs: false
    },
    {
      id: 'fastapi-demo-post',
      title: 'FastAPI Demo POST',
      type: 'item',
      url: '/fastapi-demo-post',
      icon: IconApi,
      breadcrumbs: false
    },
    {
      id: 'hello-page',
      title: 'Hello Message',
      type: 'item',
      url: '/hello',
      icon: IconApi
    },
    {
      id: 'users-page',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: IconApi
    },
    {
        id: 'samples-page',
        title: 'Samples',
        type: 'item',
        url: '/samples',
        icon: icons.IconList // or a suitable icon you have
    },
    {
        id: 'login-page',
        title: 'Login',
        type: 'item',
        url: '/login',
        icon: LoginIcon,
        breadcrumbs: false
    },
    {
        id: 'register-page',
        title: 'Register',
        type: 'item',
        url: '/register',
        icon: PersonAddIcon,
        breadcrumbs: false
    }
  ]
};

export default fastapi;