import { object, string, number, InferType } from "yup";

export const userSchema = object({
  uuid: string().uuid().required(),
  color: number().min(1).max(8).required(),
});

export type IUser = InferType<typeof userSchema>;
