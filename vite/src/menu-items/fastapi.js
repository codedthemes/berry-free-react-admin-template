import { IconApi } from '@tabler/icons-react';

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
    }
  ]
};

export default fastapi;