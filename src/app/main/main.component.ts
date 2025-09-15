import { Component, OnInit, WritableSignal, computed } from '@angular/core';
import { PluginInfoVo } from '../../service/@vo/PluginInfoVo';
import { AppService } from '../../service/app.service';
import { UserAccountVo } from '../../service/@vo/UserAccountVo';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pluginInfo: WritableSignal<PluginInfoVo>;
  userInfo: WritableSignal<UserAccountVo>;

  // loginedAccount = computed<string>(() => {
  //   let ret = "";
  //   const arr = this.pluginInfo().user_account?.split("\\") || [""];
  //   ret = arr[arr?.length - 1];
  //   return ret;
  // });

  constructor(private appService: AppService) {
    this.pluginInfo = appService.pluginInfo;
    this.userInfo = appService.userInfo;
  }

  ngOnInit() {
  }

}
