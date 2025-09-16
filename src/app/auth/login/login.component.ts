import { AfterViewInit, Component, OnInit, WritableSignal, effect } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  validateForm!: UntypedFormGroup;

  pluginInfo: WritableSignal<PluginInfoVo>;
  userInfo: WritableSignal<UserAccountVo>;
  message: WritableSignal<CustomMessage>;

  constructor(
    private fb: UntypedFormBuilder,
    private appService: AppService,
    private adobeService: AdobeService,
    private configService: ConfigService,
    private notifyService: NotifyService,
    private viewService: ViewService,
  ) {
    this.pluginInfo = appService.pluginInfo;
    this.userInfo = appService.userInfo;
    this.message = notifyService.message;
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      domain: [null, []],
    });

    this.adobeService.AddMenu([]); //清空系统菜单
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      // console.log('submit', this.validateForm.value);

      // const ob = this.adobeService.GetDomainList();
      // const ret = await firstValueFrom(ob);
      // console.log(ret);

      let userAccount: string = this.validateForm.value.account || '';
      let domain: string = this.validateForm.value.domain || '';

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
        userPassword: this.validateForm.value.password,
        webURL: this.pluginInfo().WebURL
      };
      const ob = this.adobeService.VerifyUser(parm);
      const evt = await firstValueFrom(ob);
      console.log(evt);


      /////////////////////////////////////////////////////
      const uparm = {
        id: this.validateForm.value.account,
        webURL: this.pluginInfo().WebURL,
        domain: this.validateForm.value.domain || '',
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
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
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
