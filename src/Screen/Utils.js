//  const URL = "https://mgeps-uat-pune.etenders.in"; // Pune UAT
const URL = "https://mgeps-uat.philgeps.gov.ph"; // Live UAT
const GLOBAL_LINK = URL + "/api/BuyerUsers";
export const LOGIN_TYPE_URL = GLOBAL_LINK + "/loginType";
export const LOGIN_URL = GLOBAL_LINK + "/getToken";
export const DASHBOARD_URL = GLOBAL_LINK + "/dashboard";
export const NOTIFICATION_COUNT_URL = URL + "/api/Calendars/getCountMobileNotification";
export const READ_NOTIFICATION_URL = GLOBAL_LINK + "/readNotifcationApi";
export const CONTACT_US = GLOBAL_LINK + "/contactUs";
export const BID_EVENT_CAL_URL = URL + "/api/Calendars/getOpportunityCountOnDate";
export const FAQ_URL = URL + "/CmsHomePages/view_faq";
export const VIEW_ORGANIZATION_URL = URL + "/api/BuyerUsers/viewOrganization";
export const TERMS_CONDITION_URL = URL + "/api/BuyerUsers/termsCondition";
export const USER_PROFILE_URL = URL + "/api/BuyerUsers/userProfile";

export const STORAGE_KEY = "@user_data";