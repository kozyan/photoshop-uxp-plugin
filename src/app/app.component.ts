import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppService } from '@service/app.service';
import { DynamicHostDirective } from 'src/directive/dynamic-host.directive';
import { AdobeService } from 'src/service/@base/adobe.service';
import { CSEvent } from 'src/types/uxp_extensions';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'photoshop-uxp-plugin';

  @ViewChild(DynamicHostDirective, { static: true }) host!: DynamicHostDirective;

  constructor(
    private resolver: ViewContainerRef,
    private adobeService: AdobeService,
    private appService: AppService){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const plugin = this.appService.pluginInfo();
    if (plugin.authenticated) {
      // GOTO main
    }else{
      // GOTO login
      // this.host.viewContainerRef.clear();
      // this.host.viewContainerRef.createComponent();
    }

  }

  doRemove = (evt: any) => {
  }

  doClick = (evt:any) => {

    // console.log(evt);
    // console.log(photoshop);
    console.log("APP:WINDOW_PHOTOSHOP::", window.photoshop);

    const parm = {
          "docCount": 3
    };
    this.adobeService.GetDocCount(parm).subscribe(x => {
      console.log("App::GetDocCount::", x);
    });

  }

  doLogin = (evt) => {

  }
}
