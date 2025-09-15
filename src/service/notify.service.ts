import { Injectable, effect, signal } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export enum NotifyType {
  success = "success",
  error = "error",
  worning = "worning",
  info = "info",
  none = "none"
}

export interface CustomMessage {
  msg: string,
  type?: NotifyType
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  message = signal<CustomMessage>({msg:""});

  constructor(private notification: NzNotificationService) {
    effect(() => {
      if(this.message().msg){
        if(this.message().type === NotifyType.success){
          this.notification.success("", this.message().msg);
        }else if(this.message().type === NotifyType.error){
          this.notification.error("", this.message().msg);
        }else if(this.message().type === NotifyType.worning){
          this.notification.warning("", this.message().msg);
        }else{
          this.notification.info("", this.message().msg);
        }
      }
    });
  }
}
