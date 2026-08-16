import { useEffect } from 'react';

function matchPath(basePath, pathname) {
  // Make sure both paths are normalized
  const normalizedBase = basePath.replace(/\/+$/, ''); // remove trailing slash
  const normalizedPath = pathname.replace(/\/+$/, '');

  return normalizedPath === normalizedBase || normalizedPath.startsWith(normalizedBase + '/');
}

// ==============================|| MENU COLLAPSED - RECURSIVE FUNCTION ||============================== //

/**
 * Recursively traverses menu items to find and open the correct parent menu.
 * If a menu item matches the current pathname, it marks the corresponding menu as selected and opens it.
 *
 * @param {NavItemType[]} items - List of menu items.
 * @param {string} pathname - Current route pathname.
 * @param {string | undefined} menuId - ID of the menu to be set as selected.
 * @param {SetState<string | null>} setSelected - Function to update the selected menu.
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - Function to update the open state.
 */

function setParentOpenedMenu(items, pathname, menuId, setSelected, setOpen) {
  for (const item of items) {
    // Base case: match the URL
    if (item.url && matchPath(item.url, pathname)) {
      setSelected(menuId ?? null);
      setOpen(true);
      return true; // child matched
    }

    // Recurse if children exist
    if (item.children?.length) {
      const childMatched = setParentOpenedMenu(item.children, pathname, item.id, setSelected, setOpen);
      if (childMatched) {
        setOpen(true);
        setSelected(menuId ?? null);
        return true;
      }
    }
  }
  return false; // nothing matched in this branch
}

// ==============================|| MENU COLLAPSED - HOOK ||============================== //

/**
 * Hook to handle menu collapse behavior based on the current route.
 * Automatically expands the parent menu of the active route item.
 *
 * @param {NavItemType} menu - The menu object containing items.
 * @param {string} pathname - Current route pathname.
 * @param {boolean} miniMenuOpened - Flag indicating if the mini menu is open.
 * @param {SetState<string | null>} setSelected - Function to update selected menu state.
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - Function to update menu open state.
 * @param {SetState<HTMLElement>} setAnchorEl - Function to update the anchor element state.
 */

export default function useMenuCollapse(menu, pathname, miniMenuOpened, setSelected, setOpen, setAnchorEl) {
  useEffect(() => {
    setOpen(false); // Close the menu initially

    // Reset selection based on menu state
    if (!miniMenuOpened) {
      setSelected(null);
    } else {
      setAnchorEl(null);
    }

    // If menu has children, determine which should be opened
    if (menu.children?.length) {
      setParentOpenedMenu(menu.children, pathname, menu.id, setSelected, setOpen);
    }
  }, [pathname, menu.children, menu.id, miniMenuOpened, setAnchorEl, setOpen, setSelected]);
}
