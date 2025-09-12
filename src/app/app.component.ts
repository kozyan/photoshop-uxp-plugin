import { Component, OnInit } from '@angular/core';
import { AdobeService } from 'src/service/@base/adobe.service';
import { CSEvent } from 'src/types/uxp_extensions';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'photoshop-uxp-plugin';

  constructor(private adobeService: AdobeService){

  }

  callback = (o) => {
    console.log("Message from " + o.pluginId + ":" + o.message, o);
  }

  callback2 = (o) => {
    console.log("Message2 from " + o.pluginId + ":" + o.message, o);
  }

  ngOnInit(): void {
    // window.photoshop.messaging.addSDKMessagingListener(this.callback);
    // window.photoshop.messaging.addSDKMessagingListener(this.callback2);
    // window.photoshop.messaging.removeSDKMessagingListener(this.callback);

    // this.adobeService.addEventListener("Publisher__GetDocCount", this.callback);
  }

  doRemove = (evt: any) => {
    // window.photoshop.messaging.removeSDKMessagingListener(this.callback);
  }
  doClick = (evt:any) => {

    // console.log(evt);

    // console.log(photoshop);
    console.log("APP:WINDOW_PHOTOSHOP::", window.photoshop);
    // console.log(uxp);

    // const data = {
    //     method: "Publisher__GetDocCount",
    //     params: {
    //       "docCount": 3
    //     }
    // };
    // const payload = {Msge: JSON.stringify(data)}
    // window.photoshop.messaging.sendSDKPluginMessage("awt.xms.photoshop", data);

    const parm = {
          "docCount": 3
    };
    // const e = {
    //   appId: "ps",
    //   extensionId: "awt.xms.photoshop",
    //   type: "Publisher__GetDocCount",
    //   data: JSON.stringify(parm)
    // };
    // this.adobeService.dispatchEvent(e);

    this.adobeService.GetDocCount(parm).subscribe(x => {
      console.log("App::GetDocCount::", x);
    });

  }
}
