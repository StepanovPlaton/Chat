import ColorSchemeSwitch from "@/features/colorSchemeSwitch";
import MessagesList from "@/features/messagesList";
import SendMessage from "@/features/sendMessage";

export const ChatWindow = () => {
  return (
    <div
      className={
        "w-lg h-full md:size-120 bg-bg1 p-4 rounded-lg " +
        "drop-shadow-2xl flex flex-col gap-4 justify-between"
      }
    >
      <MessagesList />
      <div
        className={
          "w-full size-14 bg-bg2 p-2 rounded-lg drop-shadow-md " +
          "flex flex-row gap-4 items-center justify-between"
        }
      >
        <ColorSchemeSwitch />
        <SendMessage />
      </div>
    </div>
  );
};
