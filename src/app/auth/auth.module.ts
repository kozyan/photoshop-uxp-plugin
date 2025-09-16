import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MnzModule } from '../components/mnz.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  AuthComponent,
  LoginComponent,
  LogoutComponent,

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MnzModule,
    AuthRoutingRoutes,
  ],
  declarations: [...COMPONENTS]
})
export class AuthModule { }
