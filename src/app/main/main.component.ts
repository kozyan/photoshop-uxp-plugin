import { Component, OnInit, WritableSignal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { PluginInfoVo } from '../../service/@vo/PluginInfoVo';
import { AppService } from '../../service/app.service';
import { UserAccountVo } from '../../service/@vo/UserAccountVo';
import { ViewService } from '@service/view.service';

export type ViewType = 'typesetting' | 'preference' | 'taskinfo' | 'materialinfo' | 'materialinfo-uploadfile';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pluginInfo: WritableSignal<PluginInfoVo>;
  userInfo: WritableSignal<UserAccountVo>;
  activeView: ViewType = 'typesetting';

  constructor(
    private appService: AppService,
    private viewService: ViewService,) {
    this.pluginInfo = appService.pluginInfo;
    this.userInfo = appService.userInfo;
  }

  ngOnInit() {
  }

  showView(view: ViewType) {
    this.activeView = view;
  }

  logout() {
    this.appService.Logout();
    // this.router.navigate(['/login']);
    this.viewService.showLoginView();
  }
}
