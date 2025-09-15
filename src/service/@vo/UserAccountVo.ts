import { user_account } from "../../models/user_account";
import { UserGroupVo } from "../../models/user_group";

export interface IUserAccountVo extends user_account {
  groups: UserGroupVo[];
}
export type UserAccountVo = Partial<IUserAccountVo>;
