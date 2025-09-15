import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AppContext } from '../../core/app.context';
import { Observable, lastValueFrom, of } from 'rxjs';
import { UserProfile } from '../../models/UserProfile';


export interface Config {
  project: string;
  baseUrl?: string;
  baseEndpoint?: string;
  apiBaseUrl?: string;
}

export interface claim{
  account: string;
  userId: string;
  mailTo: string;
  name: string;
  langId: string;
  langCode: string;
}

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private url = "content/appsettings.json";

  key = "superSecretKey@345";
  issuer = "awt";
  audience = "awt";

  appsettings = signal<Config>({ project: ''});
  usersettings = signal<UserProfile>({});

  constructor(private httpClient: HttpClient) {}

  getToken(){
    // var token = sign({name:"jintian"}, this.key);
    // return token;
  }

  async loadAppSettings() {
    const ob = this.httpClient.get<Config>(this.url);
    const appsettings = await lastValueFrom(ob);

    console.log("appsettings", appsettings);
    this.appsettings.set(appsettings);
  }

  /**
   * 加载用户设定
   *
   * @param {string} userId
   * @param {string} [langId]
   * @memberof ConfigService
   */
  async loadUserSetting(userId: string, langId?: string) {
      const ob = this.httpClient.get(`/api/users/profile/${userId}`);
      const settings = await lastValueFrom(ob);
      this.usersettings.set(settings);
  }
}
