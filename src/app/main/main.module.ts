import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CustomComponentModule } from '@app/components/custom-component.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  imports: [
    CustomComponentModule,
    NzLayoutModule
  ],
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule { }
