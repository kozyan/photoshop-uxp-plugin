
export interface Entity<T>{$: T}

export interface MetadataVo {
  metadata: MetaVo
}
export interface MetaVo { $: {layout_id: number}; self: SelfVo }
export interface SelfVo { direct: DirectVo }
export interface DirectVo { data: Array<DataItemVo> }
export interface AttrVo {
  checked: boolean;
  column_desp: string;
  column_field: string;
  column_id: string;
  editable: boolean;
  isLayout: boolean;
}
export interface LangVo { language_code: string, value: string }
export interface DataItemVo {
  $: AttrVo;
  value_data: Array<Entity<LangVo>>;
}
