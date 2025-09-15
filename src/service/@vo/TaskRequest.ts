
export interface ITaskRequest {
  is_reload: boolean;
  pkg_class_id: string;
  search: string;
}
export type TaskRequest = Partial<ITaskRequest>;

export interface ITaskUploadRequest {
  grp_id: string;
  subject: string;
  c_abstract: string,
  ver_remark: string;
  tfr_id: string;
  folder_id: string;
  folio_id: string;
  planitem_id: number;
  ft_id: number;
  location_id: string;
  /**
   *办理人
   *
   * @type {string}
   * @memberof ITaskUploadRequest
   */
  res_id: string;
  res_name: string;
  /**
   *办理群组
   *
   * @type {string}
   * @memberof ITaskUploadRequest
   */
  group_id: string;
  group_name: string;

  material_apply: {
    ma_id: string|undefined,
    ref_type: string|undefined,
    from_folio_item_id: string|undefined
  };

  //////////////////////////////////////
  author: string;
}

export type TaskUploadRequest = Partial<ITaskUploadRequest>;

export interface IChangeOnhandRequest {
  item_id: string;
  tfr_id: string;
  /**
   *办理人
   *
   * @type {string}
   * @memberof ITaskUploadRequest
   */
  res_id: string;
  res_name: string;
  /**
   *办理群组
   *
   * @type {string}
   * @memberof ITaskUploadRequest
   */
  group_id: string;
  group_name: string;
}

export type ChangeOnhandRequest = Partial<IChangeOnhandRequest>;
