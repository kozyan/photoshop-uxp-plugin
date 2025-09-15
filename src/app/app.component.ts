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

  ngOnInit(): void {
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
}
