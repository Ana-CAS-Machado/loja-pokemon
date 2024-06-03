import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { authsoldier } from './soldier/autg.soldier';

const routes: Routes = [
  {
    path: 'equipments',
    component: HomeComponent,
    canActivate: [authsoldier],
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [],
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
