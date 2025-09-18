import { Injectable } from '@angular/core';

// declare const require: any;
// const uxp = require('uxp');
// const shell = uxp.shell;
const dialogs = window.uxp.dialogs;

@Injectable({
  providedIn: 'root'
})
export class UxpNotifyService {

  constructor() { }

  success(title: string, content: string): void {
    dialogs.showAlert({
      title: title || '成功',
      message: content,
      buttons: ['确定']
    });
  }

  error(title: string, content: string): void {
    dialogs.showAlert({
      title: title || '错误',
      message: content,
      buttons: ['确定']
    });
  }

  warning(title: string, content: string): void {
    dialogs.showAlert({
      title: title || '警告',
      message: content,
      buttons: ['确定']
    });
  }

  info(title: string, content: string): void {
    dialogs.showAlert({
      title: title || '信息',
      message: content,
      buttons: ['确定']
    });
  }
}
