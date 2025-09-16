import { Injectable, ViewContainerRef } from '@angular/core';
import { MainComponent } from '../app/main/main.component';
import { LoginComponent } from '../app/auth/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private viewContainerRef!: ViewContainerRef;

  constructor() { }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  showMainView() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(MainComponent);
  }

  showLoginView() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(LoginComponent);
  }
}
