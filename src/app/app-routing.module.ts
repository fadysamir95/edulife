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
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    title: 'Home',
  },
  {
    path: 'diplomas',
    loadChildren: () =>
      import('./modules/diplomas/diplomas.module').then(
        (m) => m.DiplomasModule,
      ),
    title: 'Diplomas',
  },

  {
    path: 'articles',
    loadChildren: () =>
      import('./modules/articles/articles.module').then(
        (m) => m.ArticlesModule,
      ),
    title: 'Articles',
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
    title: 'About US',
  },
  {
    path: 'landingPage',
    loadChildren: () =>
      import('./modules/new/new.module').then((m) => m.NewModule),
    title: 'New',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
