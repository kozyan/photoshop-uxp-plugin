import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export class CSEvent {
    type: string;
    appId: string;
    extensionId: string;
    /**
     * Event-specific data.
     */
    data?: any;
    /**
     * @param type          The name of the event type.
     * @param appId         The unique identifier of the application that generated the event.
     * @param extensionId   The unique identifier of the extension that generated the event.
     */
    constructor(type: string, appId: string, extensionId: string){
      this.type = type;
      this.appId = appId;
      this.extensionId = extensionId;
    }
}

export class AdobeCSApi {
    /**
     *自定义事件的前缀
     *
     * @memberof AdobeCSApi
     */
    event_prefix = "adobe.csapi";

    appId: string;
    extensionId: string;
    app: any;

    constructor(){
      switch (window.host) {
          case 'InDesign':
              this.app = window.indesign;
              break;
          case 'Illustrator':
              this.app = window.illustrator
              break;
          case 'Photoshop':
              this.app = window.photoshop;
              break;
      }
      this.appId = window.host;
      this.extensionId = window.uxp.entrypoints._pluginInfo.id as string;
      console.log("csapi init:", this, window.uxp);
    }

    dispatchEvent<T extends CSEvent>(event: T): void{
      this.app.messaging.sendSDKPluginMessage(this.extensionId, event);
    }
    addEventListener<T extends CSEvent>(type: string, listener: (evt: T) => void, obj?: object): void{
      this.app.messaging.addSDKMessagingListener(listener);
    }
    removeEventListener(type: string, listener: any, obj?: object): void{
      this.app.messaging.removeSDKMessagingListener(listener);
    }

  /**
   *根据事件类型来创建事件。
   *如果事件的类型为自定义则 type 要先转换为自定义类型，如：type = CustomEventType(type)
   */
  CreateEvent<T extends CSEvent>(type: string) {
    const appId = this.appId;
    const extensionId = this.extensionId;
    let event = new CSEvent(type, appId, extensionId) as T;
    return event;
  }

  /**
   *自定义事件类型
   */
  CustomEventType(type: string){
    if(type.startsWith("Annotations_")) return type;
    else if( type.startsWith('__')) return type.substring(2);
    else if(!type.startsWith(`${this.event_prefix}__`)) return `${this.event_prefix}__${type}`;
    else return type;
  }

  /**
   * 只通知，不接收
   *
   * @param {string} dispatchType 派发的事件
   * @param {*} [parm] 派发事件的传递参数
   * @memberof AdobeCSApi
   */
  Notify(dispatchType: string, parm?: any) {
    const evt: CSEvent = this.CreateEvent(dispatchType);

     if (typeof parm == "object") {
      evt.data = JSON.stringify(parm || {});
     }else{
      evt.data = parm;
     }

    this.dispatchEvent(evt);
  }

  OnSomething<T extends CSEvent>(listenType: string) {
    return new Observable<T>(subscribe => {
     const callback = (e: T) => {
       subscribe.next(e);
     };

     this.addEventListener(listenType, callback);
    });
  }

  /**
   *事件处理
   *
   * @template T extends CSEvent 返回的结果，其中 CSEvent.data 包括返回的数据
   * @param {string} dispatchType 派发的事件
   * @param {string} listenType 监听事件（获取派发事件的返回数据）
   * @param {*} [parm] 派发事件的传递参数
   * @param {boolean} [longListener] 是否持续监听
   * @return {*} 返回一个 Observable<T>
   * @memberof AdobeService
   */
  EventEmitter<T extends CSEvent>(dispatchType: string, listenType: string, parm?: any, longListener?: boolean) {
    return new Observable<T>(subscribe => {

     const evt: CSEvent = this.CreateEvent(dispatchType);

     if (typeof parm == "object") {
      evt.data = JSON.stringify(parm || {});
     }else{
      evt.data = parm;
     }

     const callback = (e: T) => {
       if(!longListener){ //非长监听，则要先移除
         this.removeEventListener(listenType, callback);
       }

       // uxp to cep event
       let {pluginId, message} = e as any;
       let event = new CSEvent(message.type, this.appId, pluginId) as T;
       event.data = message.data;

       console.log("adobe.csapi::EventEmitter",e, event);
       subscribe.next(event);
     };


     this.addEventListener(listenType, callback);

     this.dispatchEvent(evt);
    });
  }

  /**
   *自定义的事件处理
   *
   * @template T extends CSEvent 返回的结果，其中 CSEvent.data 包括返回的数据
   * @param {string} type 事件类型
   * @param {*} parm 调用参数
   * @param {boolean} [longListener] 是否为长监听
   * @return {*} 返回一个 Observable<T>
   * @memberof AdobeService
   */
  CustomEventEmitter<T extends CSEvent>(type: string, parm?: any, longListener?: boolean) {
    return new Observable<T>(subscribe => {
     type = this.CustomEventType(type); //使用自定义事件类型
     const evt: T = this.CreateEvent<T>(type);

     if (typeof parm == "object") {
      evt.data = JSON.stringify(parm || {});
     }else{
      evt.data = parm;
     }

     const listen_return_type = `${type}Complete`;

     const callback = (e: T) => {
       if(!longListener){ //非长监听，则要先移除
         this.removeEventListener(listen_return_type, callback);
       }
      //  subscribe.next(e);

      // uxp to cep event
      let {pluginId, message} = e as any;
      let event = new CSEvent(message.type, this.appId, pluginId) as T;
      event.data = message.data;

      console.log("adobe.csapi::CustomEventEmitter",e, event);
      subscribe.next(event);
     };


     this.addEventListener(listen_return_type, callback);

     this.dispatchEvent(evt);
    });
  }

  AddMenu(mnuList: Array<{id: string, label: string, enable: boolean, checked: boolean, callback:(evt: CSEvent)=>void}|null>){
    const mnuItems: Array<string> = [];
    if(mnuList.length > 0){
      mnuList.forEach(mnu => {
        if(mnu){
          mnuItems.push(`<MenuItem Id="${mnu.id}" Label="${mnu.label}" Enabled="${mnu.enable}" Checked="${mnu.checked}" />`);
        }else{
          mnuItems.push(`<MenuItem Label="---" />`);
        }
      });
    }

    const mnuMain = `<Menu>${mnuItems.join()}</Menu>`;
    // this.setPanelFlyoutMenu(mnuMain);
    // this.addEventListener('com.adobe.csxs.events.flyoutMenuClicked', (evt: CSEvent) => {
    //   const menuId = evt.data.menuId;
    //   const mnu = mnuList.find(x => x?.id === menuId);
    //   if(mnu?.callback){
    //     mnu?.callback(evt);
    //   }
    // });
  }
}
