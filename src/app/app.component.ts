import { Component, OnInit } from '@angular/core';
// import { uxp } from "@adobe/cc-ext-uxp-types";
import uxp from 'uxp';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'photoshop-uxp-plugin';

  callback = (o) => {
    console.log("Message from " + o.pluginId + ":" + o.message);
  }

  ngOnInit(): void {
    window.require('photoshop').messaging.addSDKMessagingListener(this.callback);
    window.require('photoshop').messaging.removeSDKMessagingListener(this.callback);
  }

  doClick = (evt:any) => {

    // console.log(evt);

    // console.log(photoshop);
    console.log("APP:WINDOW_PHOTOSHOP::", window?.require('photoshop'));
    // console.log(uxp);

    let messageContent = {
        "Publisher__AfterCloseDoc": {
          "docCount": 3
        }
    };
    const payload = {Msge: JSON.stringify(messageContent)}
    window.require('photoshop').messaging.sendSDKPluginMessage("awt.xms.photoshop", payload);

  }
}
