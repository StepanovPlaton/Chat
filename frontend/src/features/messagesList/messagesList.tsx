"use client";

import MessageService from "@/entities/message";
import UserService, { IUser } from "@/entities/user";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Message } from "./message";

export const MessagesList = () => {
  const { data: users, mutate: mutateUsers } = useSWR<IUser[]>("users");
  const { data: messages, mutate: mutateMessages } = useSWR(
    "messages",
    MessageService.getTopOfHistory,
    { revalidateOnFocus: false }
  );
  const { data: me } = useSWR<IUser>("me");
  const [websocket, updateWebSocket] = useState<WebSocket>();
  const bottomRef = useRef<HTMLDivElement>(null);

  const getUserColor = (userUUID: IUser["uuid"]) =>
    users?.find((user) => user.uuid === userUUID)?.color;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    const newUsers: IUser[] = [];
    messages?.forEach((message) => {
      if (
        !users?.concat(newUsers).find((user) => user.uuid === message.sender)
      ) {
        const newUser = UserService.generateUser(message.sender);
        newUsers.push(newUser);
      }
    });
    mutateUsers([...(users ?? []), ...newUsers]);
  }, [messages]);

  useEffect(() => {
    if (!websocket && messages && process.env.NEXT_PUBLIC_WS_URL) {
      const websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
      websocket.onmessage = (event) => {
        mutateMessages([...(messages ?? []), JSON.parse(event.data)], {
          revalidate: false,
        });
      };
      websocket.onclose = function () {
        setTimeout(() => updateWebSocket(undefined), 1000);
      };
      updateWebSocket(websocket);
    }
    return () => websocket?.close();
  }, [websocket, messages]);

  return (
    <div className="max-w-full h-full overflow-auto flex flex-col gap-2">
      {messages?.map((message) => (
        <div
          key={message.id}
          className="w-full flex"
          style={{
            justifyContent: message.sender === me?.uuid ? "end" : "start",
          }}
        >
          <Message
            message={message}
            color={getUserColor(message.sender)}
            align={message.sender === me?.uuid ? "right" : "left"}
          />
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};
