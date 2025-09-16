import { NgModule, provideZoneChangeDetection, } from '@angular/core';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicHostDirective } from 'src/directive/dynamic-host.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/TranslateLoader';
import { CustomComponentModule } from './components/custom-component.module';
// import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { MnzModule } from './components/mnz.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        MnzModule,
        CustomComponentModule,
        // AuthModule,
        MainModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        })
    ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: APP_BASE_HREF, useValue: '/' },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: NZ_I18N, useValue: zh_TW },
  ],
    bootstrap: [AppComponent],
})
export class AppModule { }
