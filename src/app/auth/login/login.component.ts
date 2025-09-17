import { AfterViewInit, Component, OnInit, WritableSignal, effect } from '@angular/core';
import { CustomComponentModule } from '../../components/custom-component.module';
import { AdobeService } from '../../../service/@base/adobe.service';

import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { AppService } from '../../../service/app.service';
import { PluginInfoVo } from '../../../service/@vo/PluginInfoVo';
import { ConfigService } from '../../../service/@base/config.service';
import { CustomMessage, NotifyService, NotifyType } from '../../../service/notify.service';
import { UserAccountVo } from '../../../service/@vo/UserAccountVo';
import { CSEvent } from '@core/adobe.csapi';
import { ViewService } from 'src/service/view.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  account!: string;
  password!: string;
  domain!: string;

  pluginInfo: WritableSignal<PluginInfoVo>;
  userInfo: WritableSignal<UserAccountVo>;
  message: WritableSignal<CustomMessage>;

  constructor(
    private appService: AppService,
    private adobeService: AdobeService,
    private configService: ConfigService,
    private notifyService: NotifyService,
    private viewService: ViewService,
  ) {
    this.pluginInfo = appService.pluginInfo;
    this.userInfo = appService.userInfo;
    this.message = notifyService.message;

    this.account = this.userInfo().user_account || this.pluginInfo().user_account;
    this.domain = this.pluginInfo().selectedDomain;
  }

  ngOnInit() {
    this.adobeService.AddMenu([]); //清空系统菜单
  }

  async submitForm(): Promise<void> {
    if (this.account && this.password) {
      let userAccount: string = this.account || '';
      let domain: string = this.domain || '';

      if(domain){
        const namepath = userAccount.split('\\');
        if(namepath.length > 1){
          userAccount = `${domain}\\${namepath[namepath.length-1]}`;
        }else{
          userAccount = `${domain}\\${userAccount}`;
        }
      }

      let parm = {
        userAccount,
        userPassword: this.password,
        webURL: this.pluginInfo().WebURL
      };
      const ob = this.adobeService.VerifyUser(parm);
      const evt = await firstValueFrom(ob);
      console.log(evt);


      /////////////////////////////////////////////////////
      const uparm = {
        id: this.account,
        webURL: this.pluginInfo().WebURL,
        domain: this.domain || '',
        isAgent: '0'
      };
      const user_result = await firstValueFrom(this.adobeService.GetUserInfo(uparm));
      const userInfo = user_result.data as UserAccountVo;
      console.log(userInfo);

      //通知 plugin 记录用户信息
      this.adobeService.LoginPluginComplete(userInfo);

      if(evt.data?.content === "OK"){
        this.appService.pluginInfo.mutate(p => p.authenticated = true);
        this.appService.userInfo.set(userInfo);

        // this.appService.Save();


        this.adobeService.AddMenu([
          {id: "logout", label:`登出(${userInfo.user_account})`, enable:true, checked:false, callback:(evt) => this.handleLogout(evt) },
          null
        ]);

        this.viewService.showMainView();
      }else{
        this.message.set({msg:"登入失敗：帳號或密碼錯誤", type: NotifyType.error});
      }


    } else {
      this.message.set({msg:"請輸入帳號和密碼", type: NotifyType.error});
    }
  }

  handleLogout(evt: CSEvent){
    console.log("LoginComponent::HandleLogout", evt);

    if(this.appService.pluginInfo().authenticated){
      this.appService.Logout();
    }
  }

  change_domain = () => {

  };

}
