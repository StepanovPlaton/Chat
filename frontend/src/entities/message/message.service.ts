import HTTPService from "@/shared/services/http";
import { messageSchema, messagesSchema } from "./message.schema";

export abstract class MessageService {
  public static getTopOfHistory = () =>
    HTTPService.get(`message`, messagesSchema);

  public static sendMessage = (message: string, senderUUID: string) =>
    HTTPService.post(`message`, messageSchema, {
      body: {
        text: message,
        timeOfSend: new Date().toISOString(),
        sender: senderUUID,
      },
    });
}
