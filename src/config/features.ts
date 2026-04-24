export const features = {
  billing: false,
  analytics: false,
  apiKeys: false,
  teamManagement: false,
  notifications: false,
} as const;

export type FeatureFlag = keyof typeof features;
