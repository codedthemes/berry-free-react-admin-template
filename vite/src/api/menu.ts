import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// Project-imports
import { fetcher } from '../utils/axios';

// types
import { MenuProps } from 'types/menu';
import { NavItemType } from 'types';

const initialState: MenuProps = {
  isDashboardDrawerOpened: false
};

const endpoints = {
  key: 'api/menu',
  master: 'master',
  widget: '/widget' // server URL
};

export function useGetMenu() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.widget, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menu: data?.widget as NavItemType,
      menuLoading: isLoading,
      menuError: error,
      menuValidating: isValidating,
      menuEmpty: !isLoading && !data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data as MenuProps,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: any) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
