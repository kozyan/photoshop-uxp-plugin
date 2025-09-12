import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'photoshop-uxp-plugin';

  callback = (o) => {
    console.log("Message from " + o.pluginId + ":" + o.message, o);
  }

  ngOnInit(): void {
    window.photoshop.messaging.addSDKMessagingListener(this.callback);
    // window.photoshop.messaging.removeSDKMessagingListener(this.callback);
  }

  doClick = (evt:any) => {

    // console.log(evt);

    // console.log(photoshop);
    console.log("APP:WINDOW_PHOTOSHOP::", window.photoshop);
    // console.log(uxp);

    const data = {
        method: "Publisher__GetDocCount",
        params: {
          "docCount": 3
        }
    };
    const payload = {Msge: JSON.stringify(data)}
    window.photoshop.messaging.sendSDKPluginMessage("awt.xms.photoshop", data);

  }
}
