import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthUser } from "@/types/auth";
import {
  getProfile,
  login as loginRequest,
  logout as logoutRequest,
} from "@/services/auth.service";
import {
  clearAuthStorage,
  getAccessToken,
  getStoredUser,
  setStoredUser,
  setTokens,
} from "@/lib/auth-storage";
import { getPermissionMatrix } from "@/services/permission.service";

type UserPermissions = Record<string, Record<string, Record<string, boolean>>>;
type AuthContextValue = {
  user: AuthUser | null;
  permissions: UserPermissions | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, profile: AuthUser) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [permissions, setPermissions] = useState<UserPermissions | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, [user]);

  // Luồng Boot khi F5 trang
  useEffect(() => {
    const boot = async () => {
      const token = getAccessToken();
      if (!token) {
        console.log("No access token found");
        setIsLoading(false);
        return;
      }

      try {
        const [profile, matrix] = await Promise.all([
          getProfile(),
          getPermissionMatrix(),
        ]);

        setStoredUser(profile);
        setUser(profile);
        setPermissions(matrix);
      } catch (err) {
        clearAuthStorage();
        setUser(null);
        setPermissions(null);
      } finally {
        setIsLoading(false);
      }
    };

    void boot();
  }, []);

  // 🟢 SỬA HÀM LOGIN: Đảm bảo trả về Promise<AuthUser> đúng giao ước định nghĩa type
  const login = async (accessToken: string, profile: AuthUser): Promise<AuthUser> => {
    setTokens(accessToken);
    setStoredUser(profile);
    setUser(profile);

    try {
      const matrix = await getPermissionMatrix();
      setPermissions(matrix);
    } catch (err) {
      console.error("Không thể lấy ma trận quyền khi đăng nhập", err);
    }

    return profile; // 👈 Bắt buộc phải có dòng này
  };

  // 🟢 SỬA HÀM LOGOUT: Định nghĩa tường minh kiểu trả về là Promise<void>
  const logout = async (): Promise<void> => {
    try {
      await logoutRequest();
    } catch {
    } finally {
      clearAuthStorage();
      setUser(null);
      setPermissions(null);
    }
  };

  // 🟢 SỬA HÀM REFRESH: Định nghĩa tường minh kiểu trả về là Promise<void>
  const refreshProfile = async (): Promise<void> => {
    try {
      const [profile, matrix] = await Promise.all([
        getProfile(),
        getPermissionMatrix(),
      ]);
      setStoredUser(profile);
      setUser(profile);
      setPermissions(matrix);
    } catch (err) {
      console.error("Refresh profile failed", err);
    }
  };

  const value = useMemo(
    () => ({
      user,
      permissions,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      refreshProfile,
    }),
    [user, permissions, isLoading],
  );

  // Lúc này biến value đã khớp 100% với kiểu AuthContextValue, không còn lỗi nữa!
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
