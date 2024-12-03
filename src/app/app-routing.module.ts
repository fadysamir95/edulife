import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'diplomas',
    loadChildren: () => import('./modules/diplomas/diplomas.module').then(m => m.DiplomasModule),
  },

  {
    path: 'tot',
    loadChildren: () => import('./modules/tot/tot.module').then(m => m.TotModule),
  },
  {
    path: 'articles',
    loadChildren: () => import('./modules/articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],  exports: [RouterModule],
})
export class AppRoutingModule {}
