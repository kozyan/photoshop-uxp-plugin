import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MnzModule } from '../components/mnz.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';

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
    NzIconModule.forChild([UserOutline, LockOutline]),
  ],
  declarations: [...COMPONENTS]
})
export class AuthModule { }
