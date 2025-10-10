import { use } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig() {
  const context = use(ConfigContext);

  if (!context) throw new Error('useSConfig must be use inside ConfigProvider');

  return context;
}
