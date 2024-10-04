import { z } from "zod";


export const loginSchema = {
  username: {
    type: "string",
    required_error: "Email is required",
  },
  password: {
    type: "string",
    required_error: "Password is required",
    min: {
      value: 8,
      message: "Password should be at least 8 characters long",
    },
  },
};