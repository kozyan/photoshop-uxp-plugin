import { NgModule } from '@angular/core';
import { CustomComponentModule } from '../components/custom-component.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
   CustomComponentModule,
  ],
  declarations: [MainComponent]
})
export class MainModule { }
