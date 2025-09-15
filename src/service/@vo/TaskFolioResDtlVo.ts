import { UserGroupVo } from "../../models/user_group";
import { UserAccountVo } from "./UserAccountVo";

export interface ITaskFolioResDtlVo {
  dtl_message_to: string;
  group: UserGroupVo;
  hr_id: number;
  hr_name: string;
  user: UserAccountVo;
  user_list: Array<UserAccountVo>;
  group_list: Array<UserGroupVo>;
}
export type TaskFolioResDtlVo = Partial<ITaskFolioResDtlVo>;
