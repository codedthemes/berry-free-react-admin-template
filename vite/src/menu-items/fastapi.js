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
    }
  ]
};

export default fastapi;