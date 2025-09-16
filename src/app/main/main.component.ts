import { Component, OnInit, WritableSignal, computed } from '@angular/core';
import { PluginInfoVo } from '../../service/@vo/PluginInfoVo';
import { AppService } from '../../service/app.service';
import { UserAccountVo } from '../../service/@vo/UserAccountVo';

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

  constructor(private appService: AppService) {
    this.pluginInfo = appService.pluginInfo;
    this.userInfo = appService.userInfo;
  }

  ngOnInit() {
  }

  showView(view: ViewType) {
    this.activeView = view;
  }
}
