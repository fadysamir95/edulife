import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { DiplomasComponent } from './modules/diplomas/diplomas.component';
import { MastersComponent } from './modules/masters/masters.component';
import { TotComponent } from './modules/tot/tot.component';
import { AuthComponent } from './modules/auth/auth.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { AboutComponent } from './modules/about/about.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'diplomas',
    component: DiplomasComponent
  },
  {
    path:'masters',
    component: MastersComponent
  },
  {
    path:'tot',
    component: TotComponent
  },
  {
    path:'auth',
    component: AuthComponent
  },
  {
    path:'articles',
    component: ArticlesComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }