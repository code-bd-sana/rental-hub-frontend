export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  AGENT: 'AGENT',
  LOADER: 'LOADER',
  HOST: 'HOST',
  GUEST: 'GUEST',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
