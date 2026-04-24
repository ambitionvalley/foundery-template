export const loginSchema = {
  email: "",
  password: "",
} as const;

export const signupSchema = {
  email: "",
  password: "",
  name: "",
} as const;

export const forgotPasswordSchema = {
  email: "",
} as const;
