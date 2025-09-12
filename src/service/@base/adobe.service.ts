import { Injectable } from '@angular/core';
import { AdobeCSApi } from '../../core/adobe.csapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdobeService extends AdobeCSApi {

  /**
   * NOTE: 重要，这个 appId 标识接收事件的 app
   *
   */
  override event_prefix = "Publisher";

  /**
   * extension is ready to notify plugin
   *
   * @memberof AdobeService
   */
  ExtReady = () => this.EventEmitter(`${this.event_prefix}__creationComplete`, `${this.event_prefix}__InvokeLogin`);
  /**
   * plugin is ready to notify extension
   *
   * @memberof AdobeService
   */
  PluginReady = () => this.EventEmitter(`${this.event_prefix}__InvokeLoginForm`, `${this.event_prefix}__PluginReady`);
  /**
   * 通知 plugin 记录用户信息
   *
   * @param {*} parm {user_id, user_account, user_name}
   * @memberof AdobeService
   */
  LoginPluginComplete = (parm: any) => this.Notify(`${this.event_prefix}__LoginComplete`, parm);
  ModifyLayoutInfo = (parm: any) => this.Notify(`${this.event_prefix}__ModifyLayoutInfo`, parm);
  SaveLayoutMetadata = (strXml: string) => this.Notify(`${this.event_prefix}__SaveLayoutMetadata`, strXml);
  // OpenLayout = (parm: any) => this.Notify(`${this.event_prefix}__OpenLayout`, parm);
  SendMail = (parm: any) => this.Notify(`${this.event_prefix}__SendMail`, parm);

  GetCurUserInfo = (parm: any) => this.EventEmitter(`${this.event_prefix}__GetCurUserInfo`, `${this.event_prefix}__GetCurUserInfoResult`, parm);
  GetUserInfo = (parm: any) => this.EventEmitter(`${this.event_prefix}__GetUserInfo`, `${this.event_prefix}__GetUserInfoResult`, parm);
  DisplayWarningInfo = (parm: any) => this.EventEmitter(`${this.event_prefix}__DisplayWarningInfo`, `${this.event_prefix}__DisplayWarningInfoResult`, parm);

  /** On something ******************************************************************/

  onAfterNewDoc = () => this.OnSomething(`${this.event_prefix}__AfterNewDoc`);
  onAfterOpenDoc = () => this.OnSomething(`${this.event_prefix}__AfterOpenDoc`);
  onAfterCloseDoc = () => this.OnSomething(`${this.event_prefix}__AfterCloseDoc`);
  onDocChange = () => this.OnSomething(`${this.event_prefix}__DocChange`);
  onLogout = () => this.OnSomething(`${this.event_prefix}__LogoutComplete`);

  /** End on something **************************************************************/

  GetDomainList = (parm?: any) => this.CustomEventEmitter('GetDomainList', parm);
  VerifyUser = (parm: any) => this.CustomEventEmitter('VerifyUser', parm);
  UpdateGeneralSetting = (parm: any) => this.CustomEventEmitter('UpdateGeneralSetting', parm);
  GetGeneralSetting = (parm?: any) => this.CustomEventEmitter('GetGeneralSetting', parm);
  UpdateSystemParameters = (parm: any) => this.CustomEventEmitter('UpdateSystemParameters', parm);
  GetSystemParameters = (parm?: any) => this.CustomEventEmitter('GetSystemParameters', parm);

  GetTaskList = (parm?: any) => this.CustomEventEmitter('GetTaskList', parm);
  OpenFolioItem = (parm?: any) => this.CustomEventEmitter('OpenFolioItem', parm);
  UpdateFolioItemVersion = (parm?: any) => this.CustomEventEmitter('UpdateFolioItemVersion', parm);
  DeleteFolioItem = (parm?: any) => this.CustomEventEmitter('DeleteFolioItem', parm);
  GetFolioItems = (parm?: any) => this.CustomEventEmitter('GetFolioItems', parm);
  Upload = (parm?: any) => this.CustomEventEmitter('Upload', parm);
  GetTaskFolioResDtl = (parm?: any) => this.CustomEventEmitter('Get_task_folio_res_dtl', parm);
  UpdateMaterialApply = (parm?: any) => this.CustomEventEmitter('Update_material_apply', parm);
  DeleteApplyItemInfo= (parm?: any) => this.CustomEventEmitter('Delete_apply_item_info', parm);
  GetNarPkgClass = (parm?: any) => this.CustomEventEmitter('get_nar_pkg_class', parm);

  //以下为过时的方法
  GetLayoutList = (parm?: any) => this.CustomEventEmitter('GetLayoutList', parm);
  Snapshot = (parm: any) => this.CustomEventEmitter('Snapshot', parm);
  DisplayLayoutInfo = (parm?: any) => this.CustomEventEmitter('DisplayLayoutInfo', parm);
  GetLayoutFolwRecord = (parm?: any) => this.CustomEventEmitter('GetLayoutFolwRecord', parm);
  ClearLayoutInfo = (parm: any) => this.CustomEventEmitter('ClearLayoutInfo', parm);
  Package = (parm: any) => this.CustomEventEmitter('Package', parm);
  DisplayErrorInfo = (parm: any) => this.CustomEventEmitter('DisplayErrorInfo', parm);
  FileExists = (parm: any) => this.CustomEventEmitter('FileExists', parm);
  BrowseTemplate = (parm: any) => this.CustomEventEmitter('BrowseTemplate', parm);
  BrowseOldVersion = (parm: any) => this.CustomEventEmitter('BrowseOldVersion', parm);
  // ModifyLayoutInfo = (parm: any) => this.CustomEventEmitter('ModifyLayoutInfo', parm);
  OpenLayout = (parm: any) => this.CustomEventEmitter('OpenLayout', parm);
  GetPDFStyleList = (parm: any) => this.CustomEventEmitter('GetPDFStyleList', parm);
  GetPanelInfo = (parm: any) => this.CustomEventEmitter('GetPanelInfo', parm);
  Submit = (parm: any) => this.CustomEventEmitter('Submit', parm);
  FinalSubmit = () => this.CustomEventEmitter('FinalSubmit');
  GetDocCount = (parm: any) => this.CustomEventEmitter('GetDocCount', parm);
  Logout = (parm?: any) => this.CustomEventEmitter('Logout', parm);
  GetMailUsers = (parm: any) => this.CustomEventEmitter('GetMailUsers', parm);
  SetMetadataMenuItem = (parm: any) => this.CustomEventEmitter('SetMetadataMenuItem', parm);
  ExportPDF = (parm: any) => this.CustomEventEmitter('ExportPDF', parm);
  UpdateLogDateTime = (parm: any) => this.CustomEventEmitter('UpdateLogDateTime', parm);
  GetLayoutState = (parm: any) => this.CustomEventEmitter('GetLayoutState', parm);
  FolderExists = (parm: any) => this.CustomEventEmitter('FolderExists', parm);
  GetOpenFile = (parm: any) => this.CustomEventEmitter('GetOpenFile', parm);
  ChangeOnHand = (parm: any) => this.CustomEventEmitter('ChangeOnHand', parm);
}
