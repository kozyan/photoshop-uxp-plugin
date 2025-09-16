import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path:"", component: AuthComponent,
    children: [

      {path: "auth", component: AuthComponent},
      {path: "login", component: LoginComponent},
      {path: "logout", component: LogoutComponent},
    ]
  },
];

export const AuthRoutingRoutes = RouterModule.forChild(routes);
