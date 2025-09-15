import { GeneralSettingVo, GroupVo, StepVo, TaskVo, UserAccountVo } from '@service/@vo';


export interface LayoutSubmitState {
  open: boolean;
  layout_id?: number;
  step?: StepVo;
  task?: TaskVo;
  user?: UserAccountVo;
  group?: GroupVo;
}

export interface LayoutSubmitRequest {
  saved?: boolean;
  pdf_lores: boolean;
  pdf_hires: boolean;
  packaging: boolean;
  background: boolean;
}

