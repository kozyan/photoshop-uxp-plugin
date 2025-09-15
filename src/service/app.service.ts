import { Injectable, NgZone, WritableSignal, effect, signal } from '@angular/core';
import { AppContext } from '../core/app.context';
import { FolioItemVo, GeneralSettingVo, PluginInfoVo, PreferenceVo, TaskRequest, TaskVo, UserAccountVo } from './@vo';
import { AdobeService } from './@base/adobe.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ActivityRequest } from './@vo/ActivityRequest';
import { LayoutSubmitRequest } from '@service/@vo/LayoutSubmitResponse';
import { NarPkgClassVo } from './@vo/NarPkgClassVo';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  protected next: number = 0;

  docCount = signal(0);
  settings = signal<GeneralSettingVo>({});

  /**
   *插件信息
   *
   * @memberof AppService
   */
  pluginInfo = signal<PluginInfoVo>({authenticated:false});
  /**
   *用户信息
   *
   * @memberof AppService
   */
  userInfo = signal<UserAccountVo>({});
  /**
   *用户偏好
   *
   * @memberof AppService
   */
  preference = signal<PreferenceVo>({});

  /**
   *我的任务
   *
   * @memberof AppService
   */
  tasks = signal<TaskVo[]>([]);
  /**
   *最新的活动
   *
   * @memberof AppService
   */
  activities = signal<TaskVo[]>([]);

  activity_request = signal<ActivityRequest>({},{equal: (a,b) => a.layout_id === b.layout_id});
  // selected_task = signal<TaskVo>({pre_step:[], next_step:[]},{equal: (a,b) => a.grp_id === b.grp_id} );
  selected_task = signal<TaskVo>({pre_step:[], next_step:[]});

  task_request = signal<TaskRequest>({});

  /**
   *navigator history
   *
   * @memberof AppService
   */
  history = signal<string[]>([]);

  pkg_list = signal<NarPkgClassVo[]>([]);

  selected_FolioItem = signal<FolioItemVo>({});


  layout_submit_request = signal<LayoutSubmitRequest>({
    pdf_hires: false,
    pdf_lores: false,
    packaging: false,
    background: false
  });

  constructor(
    private adobeService: AdobeService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    effect(() => {
      AppContext.setProjectCache("publisher:plugin", this.pluginInfo());
      AppContext.setProjectCache("publisher:user", this.userInfo());
      AppContext.setProjectCache("publisher:preference", this.preference());
      AppContext.setProjectCache("publisher:tasks", this.tasks());
      AppContext.setProjectCache("publisher:activities", this.activities());
      AppContext.setProjectCache("publisher:layout_submit_request", this.layout_submit_request());
    });
  }

  Restore(){
    const pi = AppContext.getProjectCache<PluginInfoVo>("publisher:plugin") || {authenticated:false};
    this.pluginInfo.set(pi);

    const usr = AppContext.getProjectCache<UserAccountVo>("publisher:user") || {};
    this.userInfo.set(usr);

    // console.log("Restore()", this.userInfo());

    const pref = AppContext.getProjectCache<PreferenceVo>("publisher:preference") || {};
    this.preference.set(pref);

    const tasks = AppContext.getProjectCache<TaskVo[]>("publisher:tasks") || [];
    this.tasks.set(tasks);

    const activities = AppContext.getProjectCache<TaskVo[]>("publisher:activities") || [];
    this.activities.set(activities);

    const layout_submit_request = AppContext.getProjectCache<LayoutSubmitRequest>("publisher:layout_submit_request") || {
      pdf_hires: false,
      pdf_lores: false,
      packaging: false,
      background: false
    };
    this.layout_submit_request.set(layout_submit_request);
  }

  Clear(){
    this.pluginInfo.set({authenticated: false});
    this.userInfo.set({});
    this.preference.set({});
    this.tasks.set([]);
    this.activities.set([]);
  }

  Logout(){

    this.adobeService.Logout().subscribe(x => {
      this.pluginInfo.update(p => ({ ...p, authenticated: false }));
    });

    return true;
  }

  /**
   * 特别的刷新 extension 的方法
   *
   * @memberof AppService
   */
  Refresh(){
    // const extId = this.adobeService.getExtensionID();
    // const [ext] = this.adobeService.getExtensions([extId]);

    // const height = ext?.height || 650;
    // const width = ext?.width || 425;

    // 错误修复：原始实现仅增加宽度，导致面板无限增长。
    // 新的实现通过在正负值之间交替一个小的随机偏移量来调整宽度，
    // 以此触发UI刷新，而不会被用户察觉。

    // 获取一个新的随机偏移量大小 (1-5, 冲突时为6), 确保与上一次的偏移量大小不同。
    const offsetMagnitude = this.getRandomInt(1, 6, Math.abs(this.next));

    // 交替偏移量的符号。如果上次为正，则这次为负，反之亦然。
    // 这确保了面板宽度在原始宽度附近波动。
    const sign = this.next > 0 ? -1 : 1;

    this.next = offsetMagnitude * sign;

    // const w = width + this.next;
    // const h = height;

    // this.adobeService.resizeContent(w, h);
  }

  /**
   *获取从 min 到 max-1 的随机数。如果产生的随机数与之前传入的相等，则返回 max
   *
   * @param {number} min 最小整数
   * @param {number} max 最大整数
   * @param {number} prev 原整数
   * @return {*}
   * @memberof AppService
   */
  getRandomInt(min: number, max: number, prev: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const newv = Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值

    return newv !== prev ? newv : max;
  }

  ClearPageUrl(){
    this.history.set([]);
  }
  CurPageUrl(url?: string){
    if(url){
      if(!this.history().includes(url)){
        this.history.update(x => {
          x.push(url!);
          return x;
        });
      }
    }else{
      const arr: Array<string> = this.history();
      url = arr[arr.length-1];
    }
    return url;
  }
  PrePageUrl(){
    const arr: Array<string> = this.history();
    const url = arr[arr.length-2];
    return url;
  }
  /**
   *只是路径模拟
   *
   * @memberof AppService
   */
  GoPrePage(){
    const pg = this.PrePageUrl();
    if(pg){
      this.history().pop();
      return pg;
    }
    return "";
  }
}
