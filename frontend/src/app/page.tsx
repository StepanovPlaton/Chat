import ChatWindow from "@/widgets/chat-window";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat - Asynchronous chat on WebSockets written on Next+Nest",
};

export default async function Root() {
  return (
    <main className="w-full h-full flex items-center justify-center p-8">
      <ChatWindow />
    </main>
  );
}
