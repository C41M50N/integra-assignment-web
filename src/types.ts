import { z } from "zod";

export type User = {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  user_status: UserStatus;
  department?: string;
};

export type UserStatus = "I" | "A" | "T";
export const UserStatusMap: Record<UserStatus, string> = {
  'I': "Inactive",
  'A': "Active",
  'T': "Terminated"
} as const;

export const UserSchema = z.object({
  id: z.number(),
  user_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  user_status: z.enum(['I', 'A', 'T']),
  department: z.string()
});

export const CreateUserSchema = UserSchema.omit({ id: true, email: true, user_name: true, user_status: true });
export const EditUserSchema = UserSchema.omit({ user_name: true });

