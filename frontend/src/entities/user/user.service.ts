import { v1 as uuidV1 } from "uuid";
import { IUser } from "./user.schema";

export abstract class UserService {
  private static pickedColors: IUser["color"][] = [];

  public static generateMe = (): IUser => ({
    uuid: uuidV1(),
    color: 8,
  });

  public static generateUser = (uuid: IUser["uuid"]): IUser => {
    const newColor = Array.from(Array(7).keys())
      .map((i) => i + 1)
      .reduce(
        (p, c) => (!p && !this.pickedColors.includes(c) ? c : p),
        undefined as number | undefined
      );
    this.pickedColors.push(newColor ?? 1);
    return {
      uuid: uuid,
      color: newColor ?? 1,
    };
  };
}
