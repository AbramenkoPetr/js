import { TOGGLE_VISIBLE_PROFILE, APDATE_PROFILE } from "./types";

export const toggleVisibleProfile = () => {
  return { type: TOGGLE_VISIBLE_PROFILE };
};

export const apdateProfile = (profile) => {
  return { type: APDATE_PROFILE, payload: profile };
};
