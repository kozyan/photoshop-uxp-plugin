import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'photoshop-uxp-plugin';

  doClick = (evt:any) => {

    console.log(evt);
  }
}
