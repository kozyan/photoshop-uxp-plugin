import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, lastValueFrom, of } from 'rxjs';
import { ConfigService } from './config.service';
import { AuthPayload } from '../../models/AuthPayload';
import { AppContext } from '../../core/app.context';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

constructor(
  private appService: AppService,
  private configService: ConfigService,
  private translate: TranslateService,
  private route: ActivatedRoute,
  private router: Router,
) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.allowToActivate(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  allowToActivate(state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticatedV2(state);
  }

  private isAuthenticatedV2(state: RouterStateSnapshot): Observable<boolean> {

    return new Observable(subscribe => {

      of(true).subscribe(async () => {
        let authenticated = false;


        const plugin = this.appService.pluginInfo();

        const project = this.configService.appsettings().project;
        AppContext.init(project); //初始 project

        authenticated = plugin.authenticated;

        if (!authenticated) {
          // this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
          // TODO:
        } else {

          const langCode = plugin.language_code?.toLowerCase() || "zh-tw";

          //TIPS: 多语言默认设置
          this.translate.setDefaultLang(langCode.toLowerCase());
          this.translate.use(langCode.toLowerCase());
        }

        subscribe.next(authenticated);
      });
    });
  }
  // private isAuthenticated(state: RouterStateSnapshot): Observable<boolean> {

  //   return new Observable(subscribe => {

  //     of(true).subscribe(async () => {
  //       let authenticated = false;

  //       const project = this.configService.appsettings().project;
  //       AppContext.init(project); //初始 project


  //       let token = await lastValueFrom(this.authService.getToken());
  //       const user: AuthPayload = token.getPayload(); //na user

  //       const account = user?.account || 'na'; //set to default user

  //       AppContext.init(project, account); //完成 appcontext 初始

  //       authenticated = token.isValid();

  //       if (!authenticated) {
  //         this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
  //       } else {
  //         const user: AuthPayload = token.getPayload();

  //         // await this.permService.initUserRights(user.userId); //加载用户基本权限

  //         this.configService.loadUserSetting(user.userId, user.langId); // get user profile
  //         //TIPS: 多语言默认设置
  //         this.translate.setDefaultLang(user.langCode.toLowerCase());
  //         this.translate.use(user.langCode.toLowerCase());
  //       }

  //       subscribe.next(authenticated);
  //     });
  //   });
  // }
}
