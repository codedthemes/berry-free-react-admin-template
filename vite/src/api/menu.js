// 引入 useSWR 和 mutate 函式來管理數據的抓取和更新
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// 定義一個初始狀態物件，包含菜單的各種狀態
const initialState = {
  openedItem: 'dashboard', // 當前選中的菜單項目
  openedComponent: 'buttons', // 當前選中的組件
  openedHorizontalItem: null, // 當前選中的水平菜單項目
  isDashboardDrawerOpened: false, // 是否打開儀表板抽屜
  isComponentDrawerOpened: true // 是否打開組件抽屜
};

// 定義 API 端點
export const endpoints = {
  key: 'api/menu', // 用於識別菜單資料的鍵
  master: 'master', // master 部分的資料
  dashboard: '/dashboard' // server URL // 伺服器的 URL 地址，指向儀表板
};

// 自定義 hook 用來獲取菜單資料
export function useGetMenuMaster() {
  // 使用 SWR 來抓取資料，並且使用 initialState 作為預設資料
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    // 不重新驗證資料當資料陳舊（stale）時
    revalidateIfStale: false,
    // 當頁面聚焦時不重新驗證
    revalidateOnFocus: false,
    // 當重新連線時不重新驗證
    revalidateOnReconnect: false
  });

  // 使用 useMemo 來記錄 memoized 的資料，避免不必要的重新渲染
  const memoizedValue = useMemo(
    () => ({
      menuMaster: data, // 返回菜單資料
      menuMasterLoading: isLoading // 返回資料加載狀態
    }),
    [data, isLoading] // 當 data 或 isLoading 改變時更新 memoizedValue
  );

  return memoizedValue; // 返回 memoized 的值
}

// 更新儀表板抽屜狀態的處理函式
export function handlerDrawerOpen(isDashboardDrawerOpened) {
  // to update local state based on key

  // 更新本地狀態，並且不觸發重新加載資料
  // mutate(key, data, shouldRevalidate)
  // key（必需）：對應某個快取的唯一鍵。
  // data（可選）：新的數據或更新數據的函式。
  // shouldRevalidate（可選）：布爾值，是否觸發重新驗證（預設為 true）。
  mutate(
    endpoints.key + endpoints.master, // 使用相同的鍵來識別更新的資料
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened }; // 更新狀態
    },
    false // 不會觸發重新抓取資料
  );
}

// 更新當前選中的菜單項目
export function handlerActiveItem(openedItem) {
  // to update local state based on key

  // 更新本地狀態，並且不觸發重新加載資料
  mutate(
    endpoints.key + endpoints.master, // 使用相同的鍵來識別更新的資料
    (currentMenuMaster) => {
      return { ...currentMenuMaster, openedItem }; // 更新選中的菜單項目
    },
    false // 不會觸發重新抓取資料
  );
}
