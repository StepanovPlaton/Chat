"use client";

import MessageService from "@/entities/message";
import UserService from "@/entities/user";
import { useState } from "react";
import useSWR from "swr";

export const SendMessage = () => {
  const [message, updateMessage] = useState<string>("");
  const { data: me } = useSWR(`me`, UserService.generateMe);

  return (
    <div className="w-full h-full flex items-center gap-4">
      <input
        type="text"
        className={
          "w-full h-full px-4 py-1 rounded-lg" +
          " focus:outline-1 outline-fg4 focus:shadow-md"
        }
        placeholder="Напиши сообщение..."
        value={message}
        onChange={(e) => updateMessage(e.target.value)}
      />
      <button
        className={
          "h-full px-4 rounded-lg bg-ac2 disabled:bg-bg3" +
          " cursor-pointer hover:shadow-md text-fg0 disabled:text-fg4"
        }
        disabled={!message || !me}
        onClick={() => {
          if (!!me) {
            MessageService.sendMessage(message, me.uuid);
            updateMessage("");
          }
        }}
      >
        Отправить
      </button>
    </div>
  );
};
