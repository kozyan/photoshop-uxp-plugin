import { GeneralSettingVo } from "./GeneralSettingVo";

export interface PublisherVo {
  nar_pkg: string;
  nar_item: string;
  nar_group: string;
  layout: string;
  folio: string;
  folioItem: string;
  nar_itemList: Array<any>;
  nar_groupList: Array<any>;
  layoutList: Array<any>;
  __DocCount: number;
  folioItemList: Array<any>;
  log_datetime: Date;
  layoutReadOnly: boolean;
  generalSetting: GeneralSettingVo;
}
