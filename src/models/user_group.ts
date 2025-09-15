import { UserAccountVo } from "../service/@vo";

export interface user_group {
  id: string; //for user info
  group_id: string;
  group_name: string;
  edit_date: Date;
  group_remark: string;
  belong_cabinet?: string;
  user_default: string;
  belong_class: string;
  grp_type: string;
  agent_policy?: number;
  group_code: string;
  group_label: string;
  parent_group_id?: string;
  group_name_path: string;
  group_level: number;
  group_order: number;
  edit_by: string;
  folio_workspace?: number;

  //////////////////////////////////////
  users: Array<UserAccountVo>;
}
export type UserGroupVo = Partial<user_group>;
