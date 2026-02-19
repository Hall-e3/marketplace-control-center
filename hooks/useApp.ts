import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { AppState } from "../redux/features/app/appSlice";
import {
  toggleSidebar as toggleSidebarAction,
  setSidebarOpen as setSidebarOpenAction,
  setTheme as setThemeAction,
  setLoading as setLoadingAction,
} from "../redux/features/app/appSlice";

export function useApp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const app = useSelector((state: RootState) => state.app);

  const toggleSidebar = useCallback(() => {
    dispatch(toggleSidebarAction());
  }, [dispatch]);

  const setSidebarOpen = useCallback(
    (open: boolean) => {
      dispatch(setSidebarOpenAction(open));
    },
    [dispatch],
  );

  const setTheme = useCallback(
    (theme: AppState["theme"]) => {
      dispatch(setThemeAction(theme));
    },
    [dispatch],
  );

  const setAppLoading = useCallback(
    (loading: boolean) => {
      dispatch(setLoadingAction(loading));
    },
    [dispatch],
  );

  const navigate = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },
    [router],
  );

  const toggleMenu = useCallback(
    (value: boolean) => {
      dispatch(setSidebarOpenAction(value));
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch(setSidebarOpenAction(false));
    dispatch(setLoadingAction(false));
  }, [dispatch]);

  return {
    ...app,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setAppLoading,
    navigate,
    toggleMenu,
    reset,
  };
}
