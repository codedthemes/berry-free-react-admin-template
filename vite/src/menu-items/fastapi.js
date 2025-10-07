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
    }
  ]
};

export default fastapi;