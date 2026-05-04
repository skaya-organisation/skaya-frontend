// src/utils/constants.ts

export const USERS_GITHUB_ORGANISATION =
  process.env.PUBLIC_USERS_GITHUB_ORGANISATION || "";

export const GITHUB_REPO =
  process.env.PUBLIC_GITHUB_REPO || "";

export const backendServer =
  process.env.PUBLIC_BACKEND_SERVER || "";

export const gh_token =
  process.env.PUBLIC_GH_TOKEN || "";

export const MAX_PROMPTS =
  Number(process.env.PUBLIC_MAX_PROMPTS ?? 5);

export const PUBLISHABLE_KEY =
  process.env.PUBLIC_PUBLISHABLE_KEY || "";

export const CATEGORY_OPTIONS = [
  'Portfolio',
  'E-commerce',
  'Blog',
  'Business',
  'Landing Page',
];
export const THEME_OPTIONS = ["Skaya's Theme", 'Custom'];
