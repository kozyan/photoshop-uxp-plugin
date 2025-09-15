import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CustomComponentModule } from '@app/components/custom-component.module';

@NgModule({
  imports: [
    MainComponent,
    CustomComponentModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
