
export interface LayoutVo{
  selected?: boolean;

  fullName?: string;
  isFolder?: boolean;
  label?: string;

  /////////////////////////////////
  /**
   *文件扩展名 progress_state > 0 => =.indd
   *
   * @type {string}
   * @memberof LayoutVo
   */
  extension?: string;
}
