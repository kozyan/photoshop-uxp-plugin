import { NgModule, provideZoneChangeDetection, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
    providers: [provideZoneChangeDetection({ eventCoalescing: true })],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
