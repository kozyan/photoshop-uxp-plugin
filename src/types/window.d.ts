/**
 *  add by yjt on 20250912
 *  1.为 load.js 增加 typescript 的定义
 */
import {Encoding, FS, Util} from "./uxp_extensions";
// import {CSEvent, CSInterface} from "csinterface";
import * as uxp from '@adobe/cc-ext-uxp-types';

declare global {

    interface csdk_messaging {
        addSDKMessagingListener(callback: Function): void
        removeSDKMessagingListener(callback: Function): void
    }

    interface Window {
        uxp: uxp,
        fs: FS,
        os: any,
        host: string,
        messaging: csdk_messaging,
        indesign: any,
        illustrator: any,
        photoshop: any
    }
}
