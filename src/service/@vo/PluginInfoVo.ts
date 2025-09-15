export interface PluginInfoVo {
  authenticated: boolean; //是否已经授权登录

  group_id?: string; //"499FFAE6-432F-4446-BED5-D05429DDB6FE"
  language_code?: string; //"zh-tw"
  language_id?: string; //"D5CA1C5F-7AB4-49FE-A8C4-828E3A88BE44"
  localPath?: string; //"K:/Temp"
  macAddr?: string; //"02:50:41:00:00:01"
  pluginPath?: string; //"C:\Program Files\Adobe\Adobe InDesign 2022\Plug-ins\"
  user_account?: string; //"commonwealth\xms7"
  version?: string; //"17.0.0.0"

  /////////////////////////////////////////////
  WebURL?: string;
  domains?: Array<{name: string, path: string}>;
  selectedDomain?: string;
}
