import { UserAccountVo } from "./UserAccountVo";

export interface StepVo {
  selected?: boolean;

  model_func_name?: string;
  model_name?: string;
  step?: string;
  step_name?: string;
  tfr_id?: string;

  ////////////////////////////////////////
  confirmed_tfr_id?: string;
  edit_by?: string;
  edit_time?: Date;
  progress_state?: number;
  user_account?: string;
  user_name?: string;

  ////////////////////////////////////////
  groupList?: Array<GroupVo>;
  userList?: Array<UserAccountVo>;
}

export interface GroupVo {
  group_id: string;
  group_name: string;

  userList: Array<UserAccountVo>;
}

export interface IFolioItemVo {
  author?: string;
  f_id?: string;
  file_extend?: string;
  folio_id?: string;
  ftId?: number;
  group_id?: string;
  group_name?: string;
  grpId?: string;
  item_code?: string;
  item_id?: string;
  item_path?: string;
  item_type?: string;
  location_id?: string;
  master_flow?: string;
  raw_filename?: string;
  real_filename?: string;
  ref_group_id?: string;
  ref_uid?: string;
  res_id?: string;
  res_name?: string;
  subject?: string;
  tfr_id?: string;
  title?: string;
  type_id?: string;
  version?: number;
  planitem_id: number;

  selected?: boolean;
  s_version?: string;
  edit_time?: Date;
  ver_remark?: string;
  ng_subpath_full?: string;
  ni_subject?: string;
}
export type FolioItemVo = Partial<IFolioItemVo>;

export interface IApplyItemInfoVo {
  aii_id: string;
  ma_id: number;
  ref_category: string;
  ref_uid: string;
  aii_user_name: string;
  aii_source: string;
  aii_source_code: string;
  aii_filename: string;
  aii_caption: string;
  aii_translated_caption: string;
  aii_remark: string;

  ///////////////////////////////
  item_id: string;
}
export type ApplyItemInfoVo = Partial<IApplyItemInfoVo>;

export interface ITaskFolioResourceVo{
  ft_id: number;
  step: number;
  step_name: string;
  tfr_id: string;
}
export type TaskFolioResourceVo = Partial<ITaskFolioResourceVo>;

export interface ITaskPlanItemVo {
  enum_code: string;
  enum_desp: string;
  planitem_id: string;
}
export type TaskPlanItemVo = Partial<ITaskPlanItemVo>;

export interface IMaterialApplyVo {
  apply_description: string;
  apply_item_info?: Array<ApplyItemInfoVo>;
  apply_type: string;
  approve_id: string;
  approve_time: string;
  create_by: string;
  create_by_name: string;
  f_id: string;
  from_folio_item_id: string;
  group_id: string;
  ma_id: string;
  ma_status: string;
  ma_subject: string;
  ref_id: string;
  ref_type: string;
  remarks: string;
  user_id: string;
  user_name: string;

  plan_apply_qty: number;
  plan_end: string;
  assigner: string;
  assignee: string;
}
export type MaterialApplyVo = Partial<IMaterialApplyVo>;

export interface ITaskVo {
  selected?: boolean;
  /**
   *当前是否以编辑开版
   *
   * @type {boolean}
   * @memberof TaskVo
   */
  editing?: boolean;

  progress_state?: number;
  //grp_name_path?: string;
  filename?: string;
  ftId?: number;
  //grp_id?: string;
  layout_id?: number;
  name?: string;
  next_step: Array<StepVo>;
  next_tfr_id?: string;
  pre_step: Array<StepVo>;
  review_mode?: string;
  submit_version?: string;
  items?: Array<StepVo>;

  /////////////////////////////////////////////
  ma_id?: string;
  material_apply?: Array<MaterialApplyVo>;
  /////////////////////////////////////////////
  folder_id?: string;
  folio_id: string;
  location_id: string;
  child?: Array<TaskVo>;
  folio_item?: Array<FolioItemVo>;
  grp_id?: string;
  grp_name?: string;
  grp_name_path?: string;
  grp_state?: string;
  grp_type?: string;
  item_id?: string;
  parent_grp_id?: string;
  subpath_full?: string;
  task_folio_resources: Array<TaskFolioResourceVo>;
  task_planitem: Array<TaskPlanItemVo>;

  tfr_id: string;
  res_id: string;
}
export type TaskVo = Partial<ITaskVo>;
