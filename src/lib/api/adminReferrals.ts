// src/lib/api/adminReferrals.ts
import { request } from "./request";

/** Shape is flexible because backend may evolve */
export type ReferralSettings = {
  referralPercentage?: number;
  signupBonus?: number;
  minWithdrawal?: number;
  rules?: string;
  [k: string]: any;
};

const AdminReferralsAPI = {
  /** GET /api/v1/admin/referrals/settings */
  getSettings: () =>
    request<ReferralSettings>({
      method: "GET",
      url: "/admin/referrals/settings",
    }),

  /** PUT /api/v1/admin/referrals/settings */
  updateSettings: (payload: ReferralSettings) =>
    request<ReferralSettings>({
      method: "PUT",
      url: "/admin/referrals/settings",
      data: payload,
    }),
};

export default AdminReferralsAPI;
