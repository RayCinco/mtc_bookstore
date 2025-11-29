import { apiGet } from "./laravelApis";

export async function getDashboardData() {
  return await apiGet("/dashboard_data");
}
