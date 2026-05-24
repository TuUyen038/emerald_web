import axiosInstance from "@/lib/axios";
import axios from "axios";

export const getPermissionMatrix = async () => {
  const res = await axiosInstance.get("/permissions/matrix");
  return res.data.data;
};

export const bulkUpdatePermissions = async (data: any) => {
  return axiosInstance.put("/permissions/matrix/bulk", data);
};