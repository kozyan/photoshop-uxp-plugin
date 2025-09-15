import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  currentView = new BehaviorSubject<string>('home');

  constructor() { }

  setView(view: string) {
    this.currentView.next(view);
  }
}
