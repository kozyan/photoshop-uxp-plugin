
import { AfterViewInit, Component, ComponentFactoryResolver, NgZone, OnDestroy, OnInit, Signal, ViewChild, ViewContainerRef, WritableSignal, effect } from '@angular/core';
import { Config, ConfigService } from '../service/@base/config.service';
import { AppContext } from '../core/app.context';
import { AdobeService } from '../service/@base/adobe.service';
import { CustomMessage, NotifyService, NotifyType } from '../service/notify.service';
import { PluginInfoVo } from '../service/@vo/PluginInfoVo';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { CSEvent } from '@core/adobe.csapi';
import { DynamicHostDirective } from 'src/directive/dynamic-host.directive';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DynamicHostDirective, { static: false }) host!: DynamicHostDirective;

  title = 'publisher';

  appsettings: WritableSignal<Config>;
  message: WritableSignal<CustomMessage>;

  unsubscribe = new Subject<void>();

  constructor(
    private appService: AppService,
    private configService: ConfigService,
    private adobeService: AdobeService,
    private notifyService: NotifyService,
    private router: Router,
    private ngZone: NgZone,
  ){
    this.appsettings = configService.appsettings;
    this.message = notifyService.message;

    this.appsettings.mutate(x => x.project = "phxs:publisher");
    this.appService.Restore(); //还原前登录用户环境

    effect(() => {
      AppContext.init(this.appsettings().project);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {

    // // this.adobeService.FinalSubmit().subscribe(x => console.log(x));
    // // this.adobeService.Logout().subscribe(x => console.log(x)); //注销之前登录用户

    // this.adobeService.addEventListener("UpdateProgressStatus", evt => console.log(evt));
    // this.adobeService.addEventListener("OpenLayoutComplete", evt => console.log(evt));
    // this.adobeService.addEventListener("SnapshotComplete", evt => console.log(evt));
    // this.adobeService.addEventListener("SubmitComplete", evt => console.log(evt));
    // this.adobeService.addEventListener("FinalSubmitComplete", evt => console.log(evt));

    // this.adobeService.addEventListener("PluginReady", evt => console.log(evt));

    // // this.adobeService.GetGeneralSetting().subscribe(x => {
    // //   console.log(x);
    // //   this.appService.settings.set(x.data);
    // // });

    // //接收在 InDesign 窗口登出事件
    // this.adobeService.onLogout()
    // .pipe(takeUntil(this.unsubscribe))
    // .subscribe(x => {

    //   console.log("APP::Logout", x);
    //   this.appService.pluginInfo.mutate(p => p.authenticated = false);

    //   // TODO:
    //   // this.ngZone.run(() => this.router.navigate(["/auth/login"]));
    // });

    // this.adobeService.onAfterNewDoc().subscribe(x => {
    //   console.log("after new doc", x);
    //   this.appService.docCount.set(x.data.docCount || 1);
    // });
    // this.adobeService.onAfterOpenDoc().subscribe(x => {
    //   console.log("after open doc", x);
    //   this.appService.docCount.set(x.data.docCount || 1);
    // });
    // this.adobeService.onAfterCloseDoc().subscribe(x => {
    //   console.log("after close doc", x);
    //   this.appService.docCount.set(x.data.docCount);
    // });
    // this.adobeService.GetDocCount({docCount:0}).subscribe(x => {
    //   console.log("APP::GetDocCount", x);
    //   this.appService.docCount.set(x.data.docCount);
    // });

    // //on doc change
    // console.log("register on doc change");
    // this.adobeService.onDocChange().subscribe(x => {
    //   console.log(x);
    // });

    // if(this.appService.pluginInfo().authenticated){//如果缓存中已经授权，在跳到子模块之前要通知插件登录信息

    //   // console.log("authenticated");

    //   // const userInfo = this.appService.userInfo();
    //   // this.adobeService.LoginPluginComplete(userInfo);

    //   // this.adobeService.AddMenu([
    //   //   {id: "logout", label:`登出(${userInfo.user_account})`, enable:true, checked:false, callback: (evt) => this.handleLogout(evt)},
    //   //   null
    //   // ]);

    //   //如果已经登录，则要求重新登录
    //   // this.ngZone.run(() => this.router.navigate(["/auth/login"]));

    //   //显示 main 页面
    //   this.host.viewContainerRef.clear();
    //   this.host.viewContainerRef.createComponent(MainComponent);

    // } else {
    //   console.log("APP::Init::Ext ready");

    //   this.adobeService.ExtReady().subscribe(async x => {
    //     const data = x.data as PluginInfoVo;
    //     console.log(x);

    //     this.appService.pluginInfo.set(data);

    //     this.adobeService.GetDomainList()
    //     .subscribe(xx => {
    //       console.log(xx);
    //       const {WebURL, domains} = xx.data;

    //       this.appService.pluginInfo.update(info => {
    //         return {WebURL, domains, ...info};
    //       });
    //     });

    //     // this.message.set({msg:`Publisher plugin is ready`, type: NotifyType.success});
    //     console.log("Publisher plugin is ready");

    //     //显示 main 页面
    //     this.host.viewContainerRef.clear();
    //     this.host.viewContainerRef.createComponent(MainComponent);
    //   });
    // }
  }

  ngAfterViewInit(): void {
    //显示 main 页面
    this.host?.viewContainerRef?.createComponent(MainComponent);
  }

  handleLogout(evt: CSEvent){
    this.appService.Logout();
  }

}
