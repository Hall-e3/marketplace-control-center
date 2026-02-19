import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { User } from "@/lib/types"; // My User type
import {
  logout,
  setIsAuthenticated,
  setRole,
  setToken,
  setUserData,
} from "../redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);

  const getUser = useCallback(
    (userData: User) => {
      dispatch(setUserData(userData));
    },
    [dispatch],
  );

  const getToken = useCallback(
    (token: string) => {
      dispatch(setToken(token));
    },
    [dispatch],
  );

  const getRole = useCallback(
    (role: string) => {
      dispatch(setRole(role));
    },
    [dispatch],
  );

  const authenticate = useCallback(
    (value: boolean) => {
      dispatch(setIsAuthenticated(value));
    },
    [dispatch],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    router.push("/auth/login");
  }, [dispatch, router]);

  const isAdmin = state.role === "admin";
  const isEditor = state.role === "editor";
  const isApprover = state.role === "approver";

  const isHydrated = (state as any)._persist?.rehydrated ?? true;

  return {
    ...state,
    user: state.userInfo,
    loading: !isHydrated,
    router,
    signOut,
    getRole,
    getToken,
    getUser,
    authenticate,
    isAdmin,
    isEditor,
    isApprover,
  };
}
