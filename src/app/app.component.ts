
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, Signal, ViewChild, WritableSignal, effect, signal } from '@angular/core';
import { Config, ConfigService } from '../service/@base/config.service';
import { AppContext } from '../core/app.context';
import { AdobeService } from '../service/@base/adobe.service';
import { CustomMessage, NotifyService } from '../service/notify.service';
import { PluginInfoVo } from '../service/@vo/PluginInfoVo';
import { AppService } from '../service/app.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { CSEvent } from '@core/adobe.csapi';
import { DynamicHostDirective } from 'src/directive/dynamic-host.directive';
import { ViewService } from '../service/view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DynamicHostDirective, { static: false }) host!: DynamicHostDirective;

  title = 'publisher';

  isPluginReady = signal(false);

  appsettings: WritableSignal<Config>;
  message: WritableSignal<CustomMessage>;

  unsubscribe = new Subject<void>();

  constructor(
    private appService: AppService,
    private configService: ConfigService,
    private adobeService: AdobeService,
    private notifyService: NotifyService,
    private viewService: ViewService,
    private zone: NgZone,
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

    // this.adobeService.FinalSubmit().subscribe(x => console.log(x));
    // this.adobeService.Logout().subscribe(x => console.log(x)); //注销之前登录用户

    this.adobeService.addEventListener("UpdateProgressStatus", evt => console.log(evt));
    this.adobeService.addEventListener("OpenLayoutComplete", evt => console.log(evt));
    this.adobeService.addEventListener("SnapshotComplete", evt => console.log(evt));
    this.adobeService.addEventListener("SubmitComplete", evt => console.log(evt));
    this.adobeService.addEventListener("FinalSubmitComplete", evt => console.log(evt));

    this.adobeService.addEventListener("PluginReady", evt => console.log("App::PluginReady",evt));

    this.adobeService.GetGeneralSetting().subscribe(x => {
      console.log("App::GetGeneralSetting",x);
      this.appService.settings.set(x.data);
    });

    //接收在 InDesign 窗口登出事件
    this.adobeService.onLogout()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(x => {

      console.log("APP::Logout", x);
      this.appService.pluginInfo.mutate(p => p.authenticated = false);

      // TODO:
      // this.zone.run(() => this.router.navigate(["/auth/login"]));
      this.viewService.showLoginView();
    });

    this.adobeService.onAfterNewDoc().subscribe(x => {
      console.log("after new doc", x);
      this.appService.docCount.set(x.data.docCount || 1);
    });
    this.adobeService.onAfterOpenDoc().subscribe(x => {
      console.log("after open doc", x);
      this.appService.docCount.set(x.data.docCount || 1);
    });
    this.adobeService.onAfterCloseDoc().subscribe(x => {
      console.log("after close doc", x);
      this.appService.docCount.set(x.data.docCount);
    });
    // this.adobeService.GetDocCount({docCount:0}).subscribe(x => {
    //   console.log("APP::GetDocCount", x);
    //   this.appService.docCount.set(x.data.docCount);
    // });
    this.adobeService.GetCurUserInfo({}).subscribe(x => {
      console.log("App::GetCurUserInfo", x);
    });

    //on doc change
    console.log("register on doc change");
    this.adobeService.onDocChange().subscribe(x => {
      console.log(x);
    });

  }

  ngAfterViewInit(): void {
    this.viewService.setViewContainerRef(this.host.viewContainerRef);

    // 检查 Plugin 是否加载
    this.adobeService.IsAlive().subscribe(x => {
      console.log("App::AfterViewInit::IsAlive", x);

      this.isPluginReady.set(true);
    });

    this.adobeService.ExtReady().subscribe(x => {
      const data = x.data as PluginInfoVo;
      this.appService.pluginInfo.set(data);

      this.zone.run(x => {
        this.adobeService.GetDomainList()
          .subscribe(xx => {
            const { WebURL, domains } = xx.data;
            this.appService.pluginInfo.update(info => {
              return { WebURL, domains, ...info };
            });
          });

        console.log("Publisher plugin is ready");
        // this.viewService.showLoginView();

      });
    });

    if (this.appService.pluginInfo().authenticated) {
      this.viewService.showMainView();
    } else {
      this.viewService.showLoginView();
    }
  }

  handleLogout(evt: CSEvent){
    this.appService.Logout();
  }

}
