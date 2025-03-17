import { object, string, number, InferType, array } from "yup";

export const messageSchema = object({
  id: number().required().positive().integer(),
  text: string().required(),
  timeOfSend: string().required(),
  sender: string().required(),
});
export const messagesSchema = array(messageSchema);

export type IMessage = InferType<typeof messageSchema>;
