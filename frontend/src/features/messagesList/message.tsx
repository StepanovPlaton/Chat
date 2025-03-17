import { IMessage } from "@/entities/message";
import { IUser } from "@/entities/user";

export const Message = ({
  message,
  color,
  align = "right",
}: {
  message: IMessage;
  color: IUser["color"] | undefined;
  align?: "left" | "right";
}) => {
  return (
    <div
      key={message.id}
      style={{
        background: `var(--color-col${color})`,
        borderRadius: `var(--radius-xl)`,
        [align === "right"
          ? "borderBottomRightRadius"
          : "borderBottomLeftRadius"]: 0,
      }}
      className={`max-w-20 p-2`}
    >
      {message.text}
    </div>
  );
};
